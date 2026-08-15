---
title: "Permissions"
---

When authenticating the user with OAuth2, you can specify what data the token will have access to by choosing one or more access scopes.

### Scopes

Here is the list of all scopes you can request:

| Scope Slug | Description |
| --- | --- |
| login | Authenticate with the user |
| all | Full access to all available resources |
| read | Can read data, cannot execute operations |
| write | Can execute operations related to released resources |
| email | View email address |
| phone | View the phone number used in registration |
| profile | View basic profile data (name and photo) |
| profile.legal | View legal data (legal name and CPF) |
| profile.gender | View gender |
| profile.preferences | View preferences (languages and time zone) |
| acbr.accounts | Manage accounting accounts and tax integrations |
| admin.subaccounts | Manage sub-accounts of the main account |
| admin.users | Manage users and permissions |
| automation.email\_accounts | Manage email accounts for automation |
| automation.email\_deliveries | View and manage email deliveries |
| automation.sms\_accounts | Manage SMS accounts |
| automation.sms\_deliveries | View and manage SMS deliveries |
| automation.webhook\_deliveries | View and manage webhook deliveries |
| automation.webhooks | Manage webhooks and automated notifications |
| billing.transactions | View billing and invoicing transactions |
| charge.automatic\_pix.accounts | Manage automatic Pix accounts |
| charge.automatic\_pix.locations | Manage automatic Pix locations |
| charge.automatic\_pix.pix | Manage automatic Pix charges |
| charge.automatic\_pix.recurrences | Manage automatic Pix recurrences |
| charge.automatic\_pix.requests | Manage automatic Pix requests |
| charge.bank\_billet\_accounts | Manage bank billet accounts |
| charge.bank\_billet\_payments | View and register bank billet payments |
| charge.bank\_billet\_registrations | Manage bank billet registrations in banks |
| charge.bank\_billets | Manage bank billets |
| charge.customer\_subscriptions | Manage customer subscriptions |
| charge.installments | Manage installments |
| charge.payments | View and manage received payments |
| charge.pix | Manage Pix charges |
| charge.pix\_accounts | Manage Pix accounts |
| data.bank\_billet\_queries | Query bank billet information |
| core.providers | Manage system providers (banks and integrations) |
| crm.customers | Manage customers and commercial information |
| crm.people | Manage people and contacts |
| financial.accounts | Manage financial accounts |
| financial.balances | View balances and financial movements |
| financial.providers | Manage financial providers and bank integrations |
| financial.statement\_transactions | View transactions and financial statements |
| integration.certificates | Manage digital certificates for integrations |
| integration.commands | Query account commands |
| integration.connections | Manage connections with banks and providers |
| integration.discharges | Manage bank return files (discharges) |
| integration.edi\_boxes | Manage EDI mailboxes for file exchange |
| integration.remittances | Manage bank remittance files |
| mailbox.entries | Manage mailboxes for receiving files |
| mailbox.files | View and manage files in mailboxes |
| partner.bank\_contracts | Manage bank contracts with partners |
| payment.accounts | Manage payment accounts |
| payment.bank\_billets | Make bank billet payments |
| payment.batches | Manage payment batches |
| payment.darfs | Make DARF payments (federal taxes) |
| payment.payments | Manage all types of payments through the API |
| payment.pix | Make payments via Pix |
| payment.taxes | Make tax and fee payments |
| payment.dda\_accounts | Manage DDA accounts (Direct Debit Authorization) |
| payment.dda.bank\_billets | View and manage DDA billets available for payment |
| payment.utilities | Make utility bill payments (water, electricity, etc) |
| security.access\_tokens | Manage access tokens and authentication |
| system.events | View system events and logs |
| system.imports | Manage data imports |
| system.reports | Generate and view system reports |
| transfer.accounts | Manage transfer accounts |
| transfer.batches | Manage transfer batches |
| transfer.internal | Perform internal transfers between accounts |
| transfer.pix | Perform transfers via Pix |
| transfer.ted | Perform TED transfers (Transferência Eletrônica Disponível) |
| transfer.transfers | Manage all types of transfers (Pix, TED, Internal) via unified endpoint |

### OAuth2

For OAuth2, permissions are accessed through the `scope` parameter in your OAuth2 request.

For example, your application may need to log in as the user to generate bank billets, but will not need to know the user's bank data.

The default permission is `login` if you do not specify a scope.

#### Permission groups

You can request permissions individually or in groups.

Group permissions should be separated with a `+` character in the URL.

Below is an example of a request URL with the `scope` parameter at the end:

```html
[https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile](https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile)
```
