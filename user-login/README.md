# User login monitoring

## Background

A typical request from customers often is: “I want to be able to understand how the user experience looks for my internal users.” The information that typically is of interest includes the following:

- Availability of the M365 websites (for example, login.microsoftonline.com).
- Latency of the connection to M365 websites.
- A report that shows the latency and the availability over time (for example, the last 30 days).

## Installation

The user login monitoring is implemented as a [New Relic Synthetics Scripted Browser](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/scripting-monitors/introduction-scripted-browser-monitors/) script.

The script that can be copied and pasted into the New Relic UI is available [here](/user-login/user-login.js).

This repo also includes a sample New Relic dashboard that you can use to visualize the data in a meaningful way. The JSON representation of the dashboard is available [here](/user-login/user-login-dashboard.json).

![user login dashboard](/user-login/user-login-dashboard.png)
