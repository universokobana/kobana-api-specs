---
title: "Authentication"
description: "Get started quickly and make your first API request."
---

Get started quickly and make your first API request.

We offer three authentication methods to access the Kobana Banking Gateway API:

| Method | Use Case |
| --- | --- |
| [Access Token](/api/overview/authentication/access-token) | Access your own account. |
| [Authorization Code Flow](/api/overview/authentication/authorization-flow) | Get permissions to access third-party accounts. |
| [Client Credentials Flow](/api/overview/authentication/client-credentials-flow) | Get a token from an OAuth application. |

## Security

SAVE YOUR CREDENTIALS SECURELY!

You should be careful about how you store the credentials you obtain securely.

If someone obtains the access_token with permissions, they will be able to access your private information and that of your clients.

Never save your credentials in your source code or in your database unless they are encrypted.

Separating credentials from your source code and database are excellent practices to adopt.
