---
title: "User-Agent"
description: "This header is optional in all requests"
---

This header is optional in all requests

You can include the `User-Agent` header with the name of your application and a valid email address, so we can contact you if:

1. You are doing something wrong, and we can warn you in advance before you are blocked;
2. You are doing something really cool, and we can congratulate you :)

Here is an Example:

`User-Agent: My e-Commerce ([email protected])`

Example of how to pass this header using cURL:

```bash
curl -i \
-H "Authorization: Bearer TOKEN" \
-H 'Content-Type: application/json' \
-H 'User-Agent: My e-Commerce (myecommerce@example.com)' \
-X GET 'https://api-sandbox.kobana.com.br/v1/userinfo'
```
