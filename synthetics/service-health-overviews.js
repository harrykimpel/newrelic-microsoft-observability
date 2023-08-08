/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-api-tests
 * for details.
 */

var assert = require('assert');
const request = require("request");
const { promisify } = require("util");
const promisifyRequestGet = promisify(request.get);
const promisifyRequestPost = promisify(request.post);

/**
 * VARIABLE DEFINITIONS
 */
var MSFT_GRAPH_ACCESS_TOKEN = $secure.MSFT_GRAPH_ACCESS_TOKEN;
var NEW_RELIC_ACCOUNT_ID = $secure.NEW_RELIC_ACCOUNT_ID;
var NEW_RELIC_INSIGHTS_INSERT_KEY = $secure.NEW_RELIC_INSIGHTS_INSERT_KEY;
var NEW_RELIC_EVENT_TYPE = 'M365ServiceOverview';


/**
 * Function to post events to the New Relic Events API
 * @param {*} body 
 * @returns {Promise<request.Response>}
 */
async function insertInsightsEvent(body) {
    return await promisifyRequestPost({
        uri: 'https://insights-collector.newrelic.com/v1/accounts/' + NEW_RELIC_ACCOUNT_ID + '/events',
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
        console.log("insertInsightsEvent() non-200 return code: " + insightsResponse.statusCode);
    }
    else {
        console.log('Script executed successfully');
    }
}

/**
 * TO-DO: add function to retrieve access token from Microsoft Graph
 * link to docs: https://learn.microsoft.com/en-us/graph/auth-v2-user?tabs=http#3-request-an-access-token
 */

var options = {
    headers: {
        'Authorization': 'Bearer ' + MSFT_GRAPH_ACCESS_TOKEN,
        'Host': 'graph.microsoft.com'
    }
}

/**
 * Retrieve the serviceHealth resources from the healthOverviews navigation property.
 * This operation provides the health report of all subscribed services for a tenant.
 */
$http.get('https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/healthOverviews', options,
    // Callback
    function (err, response, body) {
        assert.equal(response.statusCode, 200, 'Expected a 200 OK response');

        var responseStr = response.body;
        var jsonResponse = JSON.parse(responseStr);
        //console.log('Response: ' + JSON.stringify(jsonResponse.value));   
        var jsonResponseValue = jsonResponse.value;

        jsonResponseValue.forEach((item, index) => {
            item.eventType = NEW_RELIC_EVENT_TYPE;
        });
        recordData(jsonResponseValue);
    }
);