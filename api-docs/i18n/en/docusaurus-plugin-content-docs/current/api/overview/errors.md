---
title: "Error Codes"
---

When there is an error, Kobana's API returns an object with as much descriptive information as we can provide. A list of common error codes can be found below.

| Error Code | HTTP Response Status Code | Description |
| --- | --- | --- |
| not\_found | 404 | Could not find the record. This record does not exist, or has been deleted. |
| forbidden | 403 | Operation not authorized. Access to the API is blocked or the user is blocked. |
| unprocessable\_entity | 422 | The request is valid, but the data passed is not valid. |
| bad\_request | 400 | Malformed request |
| unauthorized | 401 | Invalid API Token. The API Token is different for each Server/URL, see [Access Token](/api/overview/authentication/access-token) |
| destroy\_pix\_bank\_billet | 422 | Cannot delete a Pix associated with a boleto. |
| destroy\_pix\_opened | 422 | Cannot delete an open Pix. |
| change\_pix\_already\_canceled | 422 | Cannot change a Pix charge that has already been canceled. |
| change\_pix\_expired | 422 | Cannot change a Pix charge that has already expired. |
| invalid\_get\_param | 400 | Invalid GET parameter |

```json
{
  "status": 404,
  "errors": [
    {
      "title": "Could not find the record",
      "code": "not_found",
      "detail": "This record does not exist, or has been deleted."
    }
  ]
}
```
