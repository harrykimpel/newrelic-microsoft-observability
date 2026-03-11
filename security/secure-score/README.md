# Security - Secure Score monitoring

## Background

Represents a tenant's secure score per day of scoring data, at the tenant and control level. By default, 90 days of data is held. This data is sorted by createdDateTime, from latest to earliest. This allows you to page responses by using $top=n, where n = the number of days of data that you want to retrieve.

## Prerequisites

In order for the Synthetic script to run, you need to create the following `Secure credentials` in New Relic Synthetic Monitoring section:

- NEW_RELIC_ACCOUNT_ID: New Relic account ID
- NEW_RELIC_INSIGHTS_INSERT_KEY: New Relic Insights insert key
- NEW_RELIC_EVENT_TYPE: name of custom event in New Relic, should be `M365SecureScore` (note: if you change the name here, you also have to change the references in the [sample dashboard](/security/secure-score/secure-score-dashboard.json))
- MSFT_TENANT_ID: Microsoft Entra ID tenant ID
- MSFT_CLIENT_ID: Microsoft Entra ID app registration application (client) id
- MSFT_CLIENT_SECRET: Microsoft Entra ID app registration client secret

### Microsoft Azure App Registration details

For the authentication to Microsoft Online and the later call to Microsoft Graph API, you need to have an [Azure Entra ID App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps#using-the-admin-consent-endpoint) configured with the following permissions:

- `SecurityEvents.ReadWrite.All` (application permission)

In the **Certificates and Secrets** section, you can then create a new client secret. Its secret value has to be configured in **MSFT_CLIENT_SECRET**.

## Installation

The service health monitoring is implemented as a [New Relic Synthetics Scripted API](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/scripting-monitors/write-synthetic-api-tests/) script.

The script that can be copied and pasted into the New Relic UI is available [here](/security/secure-score/secure-score.js).

This repo also includes a sample New Relic dashboard that you can use to visualize the data in a meaningful way. The JSON representation of the dashboard is available [here](/security/secure-score/secure-score-dashboard.json).

![secure score dashboard](/security/secure-score/secure-score.png)

## Dashboard

In order to get the dashboard imported into New Relic, please follow the steps below:

1. Copy the [dashboard JSON representation](/security/secure-score/secure-score-dashboard.json)
2. Replace the NEW_RELIC_ACCOUNT_ID in JSON with your actual New Relic account ID (you can typically find it in the URL as `account` parameter or in the `API Keys` section of your account)
3. Navigate to the `Dashboards` section within New Relic
4. Click on `Import dashboard` on the top right corner of the screen
5. Paste in the entire dashboard JSON
6. Click `Import dashboard`
