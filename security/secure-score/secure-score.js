/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-api-tests
 * for details.
 */

var assert = require('assert');
const { promisify } = require("util");
const promisifyRequestGet = promisify($http.get);
const promisifyRequestPost = promisify($http.post);

/**
 * VARIABLE DEFINITIONS
 */
var NEW_RELIC_ACCOUNT_ID = $secure.NEW_RELIC_ACCOUNT_ID;
var NEW_RELIC_INSIGHTS_INSERT_KEY = $secure.NEW_RELIC_INSIGHTS_INSERT_KEY;
var NEW_RELIC_EVENT_TYPE = 'M365SecureScore';
var NEW_RELIC_EVENT_TYPE_CONTROL_SCORES = 'M365SecureScoreControlScores';
var MSFT_TENANT_ID = $secure.MSFT_TENANT_ID;
var MSFT_CLIENT_ID = $secure.MSFT_CLIENT_ID;
var MSFT_CLIENT_SECRET = $secure.MSFT_CLIENT_SECRET;

/**
 * Function to post events to the New Relic Events API
 * @param {*} body 
 * @returns {Promise<request.Response>}
 */
async function insertInsightsEvent(body) {
    const URL = `https://insights-collector.newrelic.com/v1/accounts/${NEW_RELIC_ACCOUNT_ID}/events`
    return await promisifyRequestPost({
        uri: URL,
        body: body,
        headers: {
            'X-Insert-Key': NEW_RELIC_INSIGHTS_INSERT_KEY,
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Function to record data in NRDB.
 * @param events
 * @returns {Promise<void>}
 */
async function recordData(events) {
    //console.log(events);
    let body = JSON.stringify(events, null, 2);
    const insightsResponse = await insertInsightsEvent(body);
    if (insightsResponse.statusCode !== 200) {
        console.log(`insertInsightsEvent() non-200 return code: ${insightsResponse.statusCode}`);
    }
    else {
        console.log('Script executed successfully');
    }
}

var urlAuthBody = '';
urlAuthBody += `client_id=${MSFT_CLIENT_ID}`;
urlAuthBody += `&client_secret=${MSFT_CLIENT_SECRET}`;
urlAuthBody += '&response_type=token';
urlAuthBody += '&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default';
urlAuthBody += '&grant_type=client_credentials';

var options = {
    body: urlAuthBody,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

var urlAuth = `https://login.microsoftonline.com/${MSFT_TENANT_ID}/oauth2/v2.0/token?`;

$http.post(urlAuth, options,
    // Callback
    function (err, response, body) {
        assert.equal(response.statusCode, 200, 'Expected a 200 OK response');

        var responseStr = response.body;
        var jsonResponse = JSON.parse(responseStr);

        var options = {
            headers: {
                'Authorization': `Bearer ${jsonResponse.access_token}`,
                'Host': 'graph.microsoft.com'
            }
        }

        $http.get('https://graph.microsoft.com/v1.0/security/secureScores', options,
            // Callback
            async function (err, response, body) {
                assert.equal(response.statusCode, 200, 'Expected a 200 OK response');

                var responseStr = response.body;
                var jsonResponse = JSON.parse(responseStr);
                //console.log('Response: ' + JSON.stringify(jsonResponse.value));

                // the first item in the list contains the computed score for the last calendar day, 
                // so we will use that as the score to report in New Relic. 
                // The rest of the items in the list are historical scores for each calendar day and will be ignored for now.
                var jsonResponseValue = jsonResponse.value[0];

                jsonResponseValue.eventType = NEW_RELIC_EVENT_TYPE;
                jsonResponseValue.location = $env.LOCATION;

                await recordData(jsonResponseValue);

                controlScores = jsonResponseValue.controlScores;
                controlScores.forEach((item, index) => {
                    item.eventType = NEW_RELIC_EVENT_TYPE_CONTROL_SCORES;
                    item.location = $env.LOCATION;
                });

                await recordData(controlScores);
            }
        )
    }
);