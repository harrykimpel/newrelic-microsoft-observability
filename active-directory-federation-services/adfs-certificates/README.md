# AD FS certificate monitoring

## Background

For production AD FS farms a publicly trusted SSL certificate is recommended. This is usually obtained by submitting a certificate signing request (CSR) to a third party, public certificate provider.

## Installation

The Active Directory Federation Services (AD FS) monitoring is implemented as an [on-host integrations](https://docs.newrelic.com/docs/infrastructure/host-integrations/get-started/introduction-host-integrations/) for the [New Relic Infrastructure](https://docs.newrelic.com/docs/infrastructure/infrastructure-monitoring/get-started/get-started-infrastructure-monitoring/) agent.

This integration will typically run on the same server that hosts the AD FS role. In order to get this deployed, please follow the steps below:

1. Install New Relic Infrastructure agent (easiest is to follow the [Guided Install](https://docs.newrelic.com/docs/infrastructure/host-integrations/installation/new-relic-guided-install-overview/))

2. Copy the configuration file [/active-directory-federation-services/adfs-certificates/integrations.d/adfs-cert.yml](/active-directory-federation-services/adfs-certificates/integrations.d/adfs-cert.yml) and the PowerShell script [/active-directory-federation-services/adfs-metadata-xml/integrations.d/GetMetadataXML.ps1](/active-directory-federation-services/adfs-metadata-xml/integrations.d/GetMetadataXML.ps1) into the agents integration folder (default locations: - Linux: /etc/newrelic-infra/integrations.d/, - Windows: C:\Program Files\New Relic\newrelic-infra\integrations.d).

3. Restart the Infrastructure agent service
