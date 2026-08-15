---
title: "Webhooks"
---

Webhooks allow external systems to receive notifications of all events occurring in the system.

When an event happens, the system sends an `HTTP POST` request to the webhook configured URL with information related to the event.

Webhooks are also called `Callbacks` or `Reverse API`.

### How it Works

When an event is triggered within Kobana, notifications are generated for each webhook configured to receive that event.

These notifications automatically generate a request that is made to the webhook configured URL. Kobana maintains a record of all generated requests as well as the request information (Request) and the external server response (Response).

When receiving the notification, you respond to us confirming receipt.

#### Request

In addition to the normal headers of an `HTTP POST` request, the following headers are sent:

| Header | Description |
| --- | --- |
| **X-Kobana-Event** | [Event code](/api/overview/webhooks/events) that generated this notification. |
| **X-Kobana-Delivery-Id** | Unique notification ID in [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| **X-Kobana-Environment** | Environment from which the notification was sent (`production` or `sandbox`). |
| **X-Kobana-Signature** | [Security signature](/api/overview/webhooks/security), for you to verify that the call really came from Kobana servers. |
| ~~X-BoletoSimples-Event~~ (DEPRECATED) | [Event code](/api/overview/webhooks/events) that generated this notification. |
| ~~X-BoletoSimples-Delivery-Id~~ (DEPRECATED) | Unique notification ID in [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format. |
| ~~X-BoletoSimples-Environment~~ (DEPRECATED) | Environment from which the notification was sent (`production` or `sandbox`). |
| ~~X-Hub-Signature~~ (DEPRECATED) | [Security signature](/api/overview/webhooks/security), for you to verify that the call really came from Kobana servers. |

Due to different ways of handling headers by servers, browsers and libraries of various languages, we cannot guarantee that headers will always arrive in CamelCase and therefore be prepared to receive in case-insensitive format as per [RFC7230](https://www.rfc-editor.org/rfc/rfc7230#section-3.2).

```bash
POST /15a0nqn1 HTTP/1.1

Host: requestb.in
X-Kobana-Delivery-Id: 94d4eab5-787a-4209-8282-5bc1398575ab
X-Kobana-Signature: sha256=0ac0bc270389d3836a86f0141c7657f58e05076805c852c584e700389df09c0e
X-Kobana-Event: ping
X-Kobana-Environment: sandbox
Total-Route-Time: 0
X-Request-Id: 8ed758bd-3351-4724-aaa6-2ad550c3f0c7
User-Agent: Kobana-Robot (sandbox)
Content-Type: application/json
Via: 1.1 vegur
Content-Length: 77
Connect-Time: 1
Connection: close

{
  "ping": "pong",
  "event_code": "ping",
  "webhook": {
    "id": 11,
    "url": "https://requestb.in"
  }
}
```

#### Considerations

Some considerations regarding Webhooks:

- Webhooks may be sent out of order;
- The same webhook may be sent multiple times, including manually, and you should be prepared for this (especially for payment events, to avoid duplication);
- We guarantee that the webhook will be sent at least once;
- Kobana may add new events at any time and this will not be considered a breaking change;
- Kobana may add new attributes to the webhook payload at any time and this will not be considered a breaking change;
- Kobana **CANNOT** remove an attribute from the webhook payload without prior notice;
- You should use SSL/TLS on URLs configured in the webhook. Your server must respond with the complete certificate chain including intermediaries. You can check your URL on tools like [Qualys SSL labs](https://www.ssllabs.com/ssltest/);
- All webhooks sent can be viewed in the webhook send history panel ([Except outside the retention period](/legal/retencao-de-dados));

:::danger[Attention]

**DO NOT** process the webhook payload at the moment of receipt.

Receipt should always be responded to **immediately** with status code **200**.

You must save the payload sent by us in a database, Redis, Kafka, RabbitMQ or any other service your application uses. Responding with **200** immediately after. This entire process should ideally take milliseconds.

Only after the affirmative response to receipt should the payload be processed.

:::

Saving the payload is also important so you have your history stored for future queries.

We have a [data retention policy](/legal/retencao-de-dados) and over time, we will remove events and sends related to it as they fall outside our retention period.

#### Response (STATUS CODES)

- Webhooks should be responded to **immediately** with status code `200 OK`.
- Do not respond with other codes such as 422, 404, etc., as this indicates that you are processing the payload before responding to us, which is a bad practice.
- Webhooks with invalid security signature should return `498 Token Invalid`.
- Webhooks with unknown/unexpected events by you should be ignored and may return `204 No Content`.

All other information returned in the response header or content will be ignored, but are stored.

We store the response headers and content. For this reason it is important that **no confidential information** is returned in webhook notification requests.

#### Failures and Retries

:::danger[Attention]

Our webhook sending platform will wait only **5 seconds** for a response from your server.

The send will be canceled after this time, marked as a failure and return a timeout error.

:::

Kobana will retry webhook delivery if your server returns the following errors and only these:

- 500 - Indicates that your server is unstable at the moment;
- Timeouts - Indicates that your server did not respond in the expected time (maximum 5 seconds);
- SSL/TLS errors - Indicates that your server certificate is not valid;

We will attempt resend up to 7 times, increasing the time interval between attempts.

The attempts will take approximately 9 hours to complete.

Every time a new send attempt fails, it will cause the send priority to drop in our send priority lists.

Maintain best practices to avoid disruptions to your daily routine.

You can view sent webhooks in the panel within Kobana and retry manual sending if necessary.
