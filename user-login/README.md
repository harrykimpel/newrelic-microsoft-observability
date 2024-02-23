# User login monitoring

## Background

A typical request from customers often is: “I want to be able to understand how the user experience looks for my internal users.” The information that typically is of interest includes the following:

- Availability of the M365 websites (for example, login.microsoftonline.com).
- Latency of the connection to M365 websites.
- A report that shows the latency and the availability over time (for example, the last 30 days).

## Prerequisites

In order for the Synthetic script to run, you need to create the following `Secure credentials` in New Relic Synthetic Monitoring section:

- MSFT_USERNAME: the email address of the user to login to portal.office.com
- MSFT_USER_PASSWORD: the password of the user to login to portal.office.com
- MSFT_USERNAME_MFA_SECRET: the secret of the MFA authenticator app

## Installation

The user login monitoring is implemented as a [New Relic Synthetics Scripted Browser](https://docs.newrelic.com/docs/synthetics/synthetic-monitoring/scripting-monitors/introduction-scripted-browser-monitors/) script.

The script that can be copied and pasted into the New Relic UI is available [here](/user-login/user-login.js).

This repo also includes a sample New Relic dashboard that you can use to visualize the data in a meaningful way. The JSON representation of the dashboard is available [here](/user-login/user-login-dashboard.json).

![user login dashboard](/user-login/user-login-dashboard.png)

## Setting up the MFA authenticator app

When setting up MFA for the test user of this Synthetic script, you will be asked to scan the QR code for example from your mobile device. Choosing the `Can't scan the QR code` option during the setup process will provide you with a secret obtained while setting up 2FA/MFA for your user. Capture this key and store it in the Secure Credential `MSFT_USERNAME_MFA_SECRET` for use during monitor execution.
