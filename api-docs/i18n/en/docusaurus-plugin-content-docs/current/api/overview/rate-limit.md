---
title: "Request Limits"
---

When a client exceeds the limit associated with them, subsequent requests are blocked.

The server can respond with information about the limits used and the waiting time required to send a new request.

This information is attached to the response headers.

| Header | Example | Description |
| --- | --- | --- |
| ratelimit-limit | 60 | The request limit for the client. |
| ratelimit-name | throttle\_authenticated\_web | Name of the throttle used. |
| ratelimit-remaining | 0 | Number of requests available. |
| ratelimit-reset | 1609844400 | [Unix time](https://en.wikipedia.org/wiki/Unix_time) - when the count will be reset. |
| retry-after | 30 | Time in seconds until the count is reset. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) . |

There are two types of request limits on the Kobana API, `GET` and `POST` request limits.

In both cases the count is made per **hour**.

A maximum of:

60 requests per hour `GET`

1000 requests per hour `POST`

If your operation needs a greater number of requests, contact our support or sales team.

The number of requests made by the user is reset in the first minute of each hour.

With each request made, the server returns the `ratelimit-limit` and `ratelimit-remaining` headers with the number of allowed requests and the number of remaining requests for that hour.

Example of Successful Response

```http
Date: Fri, 05 Nov 2010 12:00:00 GMT
Content-Type: application/json; charset=utf-8
ratelimit-limit: 1000
ratelimit-remaining: 486
```

If you reach the maximum number of requests within an hour, the server returns `HTTP 429 Too Many Requests` status.

In this case, you must wait the number of seconds returned in the `retry-after` header before making the next request.

Example of Response when blocked:

```http
HTTP/1.1 429 Too Many Requests
Date: Fri, 05 Nov 2010 12:00:00 GMT
Content-Type: application/json; charset=utf-8
ratelimit-limit: 1000
ratelimit-remaining: 0
ratelimit-reset: 3600
ratelimit-name: throttle_authenticated_web
retry-after: 3600
...

{error: "POST request limit per hour exceeded for this user."}
```

References:

[https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html](https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html)
