# Exchange Webservices Managed API

## Background

The Exchange Web Services (EWS) Managed API provides a managed interface for developing .NET client applications that use EWS. By using the EWS Managed API, you can access almost all the information stored in an Microsoft 365, Exchange Online, or Exchange Server mailbox. However, this API is in sustaining mode, the recommended access pattern for Microsoft 365 and Exchange online data is Microsoft Graph.

## Prerequisites

- .NET 7 runtime: <https://dotnet.microsoft.com/en-us/download/dotnet/7.0>

## Installation

The EWS Managed API monitoring is implemented as an [on-host integrations](https://docs.newrelic.com/docs/infrastructure/host-integrations/get-started/introduction-host-integrations/) for the [New Relic Infrastructure](https://docs.newrelic.com/docs/infrastructure/infrastructure-monitoring/get-started/get-started-infrastructure-monitoring/) agent.

This integration can run on any server with New Relic Infrastructure agent installed. In order to get this deployed, please follow the steps below:

1. Install New Relic Infrastructure agent (easiest is to follow the [Guided Install](<https://docs.newrelic.com/docs/infrastructure/host-integrations/installation/new-relic-guided-install-overview/>))

2. Copy the configuration file [/exchange/ews-managed-api/integrations.d/ews-managed-api.yml](/exchange/ews-managed-api/integrations.d/ews-managed-api.yml), the batch script [/exchange/ews-managed-api/integrations.d/CheckEWSManagedAPI.bat](/exchange/ews-managed-api/integrations.d/CheckEWSManagedAPI.bat) as well as the entire folder [/exchange/ews-managed-api/integrations.d/ews-managed-api/](/exchange/ews-managed-api/integrations.d/ews-managed-api/) into the agents integration folder (default locations: - Linux: /etc/newrelic-infra/integrations.d/, - Windows: C:\Program Files\New Relic\newrelic-infra\integrations.d).

3. Restart the Infrastructure agent service
