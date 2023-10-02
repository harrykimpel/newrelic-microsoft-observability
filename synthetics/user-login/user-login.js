/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

var assert = require('assert');
var DefaultTimeout = 30000;

const logger = function ({ timeout: e = 18e4, stepLogging: t = !1, insightsKey: n = "" }) { const r = Date.now(); var s = 0, o = "", i = 0, a = 0; function l({ step: e = 0, msg: t = "", duration: r = 0, eventType: s = "SyntheticsCustom", custom: o = {} }) { if (void 0 === n || "" == n) return; var i = { method: "POST", headers: { "X-Insert-Key": n, "Content-Type": "application/json" }, data: { eventType: s, step: e, message: t, duration: r, JOB_ID: $env.JOB_ID, MONITOR_ID: $env.MONITOR_ID, ACCOUNT_ID: $env.ACCOUNT_ID, LOCATION: $env.LOCATION, PROXY_HOST: $env.PROXY_HOST, PROXY_PORT: $env.PROXY_PORT }, dataType: "text" }; const a = `https://insights-collector.newrelic.com/v1/accounts/${$env.ACCOUNT_ID}/events`; i.data = Object.assign({}, i.data, o), urlRequest(a, i) } function c(e, t, n = "") { e > a && 0 != a && _({ testCase: n }); let i = `Step ${e}: ${t} STARTED at ${s = Date.now() - r}ms. testCase=${n}`; console.log(i), o = t, a = e } function _({ testCase: i = "" }) { var c = Date.now() - r, _ = c - s; if (console.log(`Step ${a}: ${o} FINISHED. It took ${_}ms to complete. testCase=${i}`), t && n.length > 0 ? l({ step: a, msg: o, duration: _, custom: { testCase: i } }) : t && $util.insights.set(`Step ${a}: ${o}`, _), e > 0 && c > e) throw new Error("Script timed out. " + c + "ms is longer than script timeout threshold of " + e + "ms.") } return { logStep: function (e) { c(i++, e) }, log: c, getStep: function () { return i }, end: _, endTestCase: function (e = "") { var i = Date.now() - r - s; console.log(`Step ${a}: ${o} FINISHED. It took ${i}ms to complete.`), t && n.length > 0 ? l({ step: a, msg: o, duration: i, custom: { testCase: e } }) : t && $util.insights.set(`Step ${a}: ${o}`, i), $util.insights.set("testCase", e), $util.insights.set("testCaseStatus", "Pass"), t && n.length > 0 && l({ eventType: "SyntheticsTests", custom: { testCase: e, testCaseStatus: "Pass" } }) }, error: function (e, r = "") { console.log(`Error in Step ${a}: ${o}`), $util.insights.set("errorStep", "" + a), $util.insights.set("errorMsg", e.message), $util.insights.set("errorLineNumber", e.lineNumber), $util.insights.set("testCase", r), $util.insights.set("testCaseStatus", "fail"), t && n.length > 0 && l({ eventType: "SyntheticsTests", custom: { testCase: r, testCaseStatus: "Fail" } }) }, postInsights: l } }({})

$webDriver.getCapabilities().then(function () { })
    // Test Case: M365  
    .then(function () {
        return Promise.resolve(true)

            .then(function () { return logger.log(1, "Open URL https://portal.office.com", "M365"), $webDriver.get("https://portal.office.com").then(e => e) })
            .then(function () { return logger.log(2, "Type username", "M365"), $browser.waitForAndFindElement($selenium.By.id("i0116"), DefaultTimeout).then(e => (e.sendKeys($secure.MSFT_USERNAME), Promise.resolve(!0))) })
            .then(function () { return logger.log(3, "Click By.id(\"idSIButton9\")", "M365"), $browser.waitForAndFindElement($selenium.By.id("idSIButton9"), DefaultTimeout).then(e => (e.click(), Promise.resolve(!0))) })
            .then(function () { return logger.log(4, "Sleep a little", "M365"), $browser.sleep(1000) })
            .then(function () { return logger.log(5, "Type password", "M365"), $browser.waitForAndFindElement($selenium.By.id("i0118"), DefaultTimeout).then(e => (e.sendKeys($secure.MSFT_USER_PASSWORD), Promise.resolve(!0))) })
            .then(function () { return logger.log(6, "Click By.id(\"idSIButton9\")", "M365"), $browser.waitForAndFindElement($selenium.By.id("idSIButton9"), DefaultTimeout).then(e => (e.click(), Promise.resolve(!0))) })
            .then(function () { return logger.log(7, "Click By.css(\"span\")", "M365"), $browser.waitForAndFindElement($selenium.By.css("span"), DefaultTimeout).then(e => (e.click(), Promise.resolve(!0))) })
            .then(function () { return logger.log(8, "Click By.id(\"idBtn_Back\")", "M365"), $browser.waitForAndFindElement($selenium.By.id("idBtn_Back"), DefaultTimeout).then(e => (e.click(), Promise.resolve(!0))) })
            .then(function () { return logger.log(9, "Click By.id(\"officeHome__content\")", "M365"), $browser.waitForAndFindElement($selenium.By.id("officeHome__content"), DefaultTimeout).then(e => (e.click(), Promise.resolve(!0))) })
            .then(function () {
                logger.endTestCase("M365");
            }, function (err) {
                logger.error(err, "M365");
                throw (err);
            });
    })