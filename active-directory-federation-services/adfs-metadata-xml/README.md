# AD FS metadata XML monitoring

## Background

To be able to configure SAML SSO using ADFS as Identity Provider you need a metadata.xml from your ADFS server.
The Federation Metadata file contains information about the ADFS server's certificates. If the Federation Metadata endpoint (e.g. /FederationMetadata/2007-06/FederationMetadata.xml) is enabled in ADFS, an identity provider can periodically (e.g. once a day) look for changes in the configuration, like a new signing certificate added to prepare for a rollover.

## Installation

The Active Directory Federation Services (AD FS) monitoring is implemented as an [on-host integrations](https://docs.newrelic.com/docs/infrastructure/host-integrations/get-started/introduction-host-integrations/) for the [New Relic Infrastructure](https://docs.newrelic.com/docs/infrastructure/infrastructure-monitoring/get-started/get-started-infrastructure-monitoring/) agent.

This integration will typically run on the same server that hosts the AD FS role. In order to get this deployed, please follow the steps below:

1. Install New Relic Infrastructure agent (easiest is to follow the [Guided Install](https://docs.newrelic.com/docs/infrastructure/host-integrations/installation/new-relic-guided-install-overview/))

2. Copy the configuration file [/active-directory-federation-services/adfs-metadata-xml/integrations.d/adfs-metadata-xml.yml](/active-directory-federation-services/adfs-metadata-xml/integrations.d/adfs-metadata-xml.yml) and the PowerShell script [/active-directory-federation-services/adfs-certificates/integrations.d/GetExpiringCertificates.ps1](/active-directory-federation-services/adfs-certificates/integrations.d/GetExpiringCertificates.ps1) into the agents integration folder (default locations: - Linux: /etc/newrelic-infra/integrations.d/, - Windows: C:\Program Files\New Relic\newrelic-infra\integrations.d).

3. Restart the Infrastructure agent service

## New Relic dashboard

Once the integration is up and running, you can visualize the data using the [sample dashboard](/active-directory-federation-services/adfs-metadata-xml/integrations.d/adfs-metadata-xml-dashboard.json) provided.

![adfs-metadata-xml-dashboard](/active-directory-federation-services/adfs-metadata-xml/integrations.d/adfs-metadata-xml-dashboard.png)
