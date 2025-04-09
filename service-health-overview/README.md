# Service Health monitoring

## Background

In M365, a SaaS service, adding New Relic agents for monitoring isn't possible. To collect health metrics, organizations can rely on native Microsoft tools and APIs. Utilize features like the Service Health Dashboard, auditing, reporting, and the Microsoft Graph API to track and analyze M365 performance, security, and user activity, ensuring a reliable digital workplace without third-party monitoring agents.

## Prerequisites

In order for the Synthetic script to run, you need to create the following `Secure credentials` in New Relic Synthetic Monitoring section:

- NEW_RELIC_ACCOUNT_ID: New Relic account ID
- NEW_RELIC_INSIGHTS_INSERT_KEY: New Relic Insights insert key
- NEW_RELIC_EVENT_TYPE: name of custom event in New Relic
- MSFT_TENANT_ID: Microsoft Entra ID tenant ID
- MSFT_CLIENT_ID: Microsoft Entra ID app registration application (client) id
- MSFT_CLIENT_SECRET: Microsoft Entra ID app registration secret

### Microsoft Azure App Registration details

For the authentication to Microsoft Online and the later call to Microsoft Graph API, you need to have an [Azure Entra ID App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps#using-the-admin-consent-endpoint) configured with the following permissions:

- User.Read
- ServiceHealth.Read.All

In the **Certificates and Secrets** section, you can then create a new client secret. Its secret value has to be configured in **MSFT_CLIENT_SECRET**.

## Installation

The service health monitoring is implemented as a [New Relic Synthetics Scripted API](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/scripting-monitors/write-synthetic-api-tests/) script.

The script that can be copied and pasted into the New Relic UI is available [here](/service-health-overview/service-health-overview.js).

This repo also includes a sample New Relic dashboard that you can use to visualize the data in a meaningful way. The JSON representation of the dashboard is available [here](/service-health-overview/service-health-overview-dashboard.json).

![service health overview dashboard](/service-health-overview/service-health-overview-dashboard.png)

## Dashboard

In order to get the dashboard imported into New Relic, please follow the steps below:

1. Copy the [dashboard JSON representation](/service-health-overview/service-health-overview-dashboard.json)
2. Replace the NR_ACCOUNT_ID in JSON with your actual New Relic account ID (you can typically find it in the URL as `account` parameter or in the `API Keys` section of your account)
3. Navigate to the `Dashboards` section within New Relic
4. Click on `Import dashboard` on the top right corner of the screen
5. Paste in the entire dashboard JSON
6. Click `Import dashboard`
