# Service Health monitoring

## Background

In M365, a SaaS service, adding New Relic agents for monitoring isn't possible. To collect health metrics, organizations can rely on native Microsoft tools and APIs. Utilize features like the Service Health Dashboard, auditing, reporting, and the Microsoft Graph API to track and analyze M365 performance, security, and user activity, ensuring a reliable digital workplace without third-party monitoring agents.

## Installation

The service health monitoring is implemented as a [New Relic Synthetics Scripted API](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/scripting-monitors/write-synthetic-api-tests/) script.

The script that can be copied and pasted into the New Relic UI is available [here](/service-health-overview/service-health-overview.js).

This repo also includes a sample New Relic dashboard that you can use to visualize the data in a meaningful way. The JSON representation of the dashboard is available [here](/service-health-overview/service-health-overview-dashboard.json).

![service health overview dashboard](/service-health-overview/service-health-overview-dashboard.png)
