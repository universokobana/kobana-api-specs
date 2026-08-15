---
title: "Introduction"
description: "You are a dev, have fun! ✨"
---

You are a dev, have fun! ✨

## Format

The API accepts only `JSON` format, so all requests use content type `application/json`.

| Field Type | Format |
| --- | --- |
| **DateTime** | [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) Format <br />Examples <br />Date: 2022-01-24 <br />Date and Time: 2022-01-24 10:07Z |

## Conventions

We use the following conventions in this documentation:

| Convention | Description |
| --- | --- |
| **:variable** | Indicates the name of a variable that needs to be replaced in a URL. |
| **#\{variable\}** | Indicates the name of a variable that needs to be replaced with values from your account. |
| **...** | Indicates the content of a request response, which has been truncated for readability of the documentation. |
| $KOBANA\_TOKEN | Indicates the Access Token and is in this format to facilitate testing on the command line. Assuming your token is "zjuio96wkixkzy6z98sy", you can run the command below and then copy and paste the commands from this documentation into the terminal. <br />`export KOBANA_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx` |

## Return Codes

The API returns HTTP response codes. These are the most relevant information:

| Code | Description |  |
| --- | --- | --- |
| ✅ | **200 OK** | The call was successful and the response body has content. |
| ✅ | **201 Created** | The resource was successfully created. |
| ✅ | **204 No Content** | The call was successful but the response body has no content |
| ❌ | **400 Bad Request** | The request is invalid, generally malformed content. |
| ❌ | **401 Unauthorized** | The user and password or access token are invalid. |
| ❌ | **403 Forbidden** | Access to the API is blocked or the user is blocked. |
| ❌ | **404 Not Found** | The accessed address does not exist. |
| ❌ | **422 Unprocessable Entity** | The request is valid, but the data passed is not valid. |
| ❌ | **429 Too Many Requests** | The user has exceeded the request limit. |
| ❌ | **500 Internal Server Error** | There was an internal server error while processing the request. Check the [server status](https://status.kobana.com.br) . |

If you want to learn more about error returns and specific error codes, visit the [Errors](/api/overview/errors) page.

## Request ID

Each API request has an associated request identifier. You can find this value in the `Request-Id` header of each API response.

This information is useful for debugging errors and providing more security in all operations. You can consult requests and their IDs in the system dashboard.

Request logs are available for a period of 30 days.

If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution.

## Security

Kobana's API uses 2048-bit SSL certificates.

Every request made through the API must use the HTTPS protocol as it will be passing authentication information in the request header.

Requests made on port 80 will be automatically redirected to port 443. This measure ensures that no request made to the API is outside the secure protocol.

All requests made to Kobana's servers will be encrypted.

Thus, applications that connect to our API need to be ready to communicate through the `TLSv1.2` or `TLSv1.3` protocols using one of the following ciphers:

TLS\_AES\_128\_GCM\_SHA256

TLS\_AES\_256\_GCM\_SHA384

TLS\_CHACHA20\_POLY1305\_SHA256

ECDHE-RSA-AES128-GCM-SHA256

ECDHE-RSA-AES128-SHA256

ECDHE-RSA-AES256-GCM-SHA384

ECDHE-RSA-CHACHA20-POLY1305

ECDHE-RSA-AES256-SHA384

For security reasons, we do not support connections via `TLSv1` and `TLSv1.1` protocols.

## HTTP Cache

You should use HTTP cache headers to reduce the

load on our servers (and increase the speed of your application!).

Most of the returns from requests will include an `ETag`

or `Last-Modified` header. When you request a resource for the first time,

store this value and send it back to us in subsequent requests

in the `If-None-Match` and `If-Modified-Since` headers. If the resource has not

changed, you will receive a response with the `304 Not Modified` header,

which saves time and bandwidth, by

avoiding sending you data you already have.

[More information about HTTP Cache](http://www.mnot.net/cache_docs/)

## Error Handling

If our servers are having problems, your request will receive an error return with status 5xx.

Error 500 means the application is completely unavailable,

but you may also receive other errors

from the 500 family in specific cases, such as `502 Bad Gateway`,

`503 Service Unavailable` or `504 Gateway Timeout`.

It is your responsibility to identify the error and handle these

cases, making the application try to send

the request again after a few minutes.

We have a page that reports the status of Kobana's servers at

[https://status.kobana.com.br/](https://status.kobana.com.br/)
