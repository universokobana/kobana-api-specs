---
title: "Postman"
description: "Postman collection to test the API"
---

Postman collection to test the API

If you prefer to use Postman, you can use the collections we've prepared there.

![](/img/guias/api-postman/kobana-postman.png)

## Team

[universokobana](https://www.postman.com/universokobana)

## Workspace

[kobana-api](https://www.postman.com/universokobana/kobana-api/overview)

## Collections

| Collection | Address |
| --- | --- |
| KOBANA API v1.0 | [https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0](https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0) |
| KOBANA API v2.0 | [https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0](https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0) |

## Using

1. Go to Environments and select the environment you want to connect to
2. Set the type of the `token` variable to `secret`

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-environment.png)
3. Get the Kobana token from Integrations > Kobana API > API Token
4. Save the token in the `Current value` field. Click `Save` (or press CRTL + S)
5. Go to `Collections > KOBANA API v1.0` and click on the `Authorization` tab
6. Select the environment where you saved the token in the top right corner, where it says `No environment`.
7. Select `Bearer Token` and fill in the Token field with the value `{{token}}`. Click `Save` (or press CRTL + S)
8. Go to `v1/userinfo` → User Information
9. Click `Send` and you will see your user information in the response of the call.

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-request-n9tp.png)
