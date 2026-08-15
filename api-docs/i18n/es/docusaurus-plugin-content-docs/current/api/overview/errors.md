---
title: "Códigos de Error"
---

Cuando hay un error, la API de Kobana retorna un objeto con la mayor cantidad de información descriptiva que podamos proporcionar. Una lista de códigos de error comunes se puede encontrar a continuación.

| Código del Error | Código Estado Respuesta Http | Descripción |
| --- | --- | --- |
| not\_found | 404 | No fue posible encontrar el registro. Este registro no existe o fue eliminado. |
| forbidden | 403 | Operación no autorizada. El acceso a la API está bloqueado o el usuario está bloqueado. |
| unprocessable\_entity | 422 | La solicitud es válida, pero los datos proporcionados no son válidos. |
| bad\_request | 400 | Solicitud mal formateada |
| unauthorized | 401 | Token de API inválido. El Token de API es diferente para cada Servidor/URL, más en [Token de Acceso](/api/overview/authentication/access-token) |
| destroy\_pix\_bank\_billet | 422 | No es posible eliminar un Pix asociado a un Boleto. |
| destroy\_pix\_opened | 422 | No es posible eliminar un Pix abierto. |
| change\_pix\_already\_canceled | 422 | No es posible alterar un cobro Pix que ya fue cancelado. |
| change\_pix\_expired | 422 | No es posible alterar un cobro Pix que ya expiró. |
| invalid\_get\_param | 400 | Parámetro GET inválido |

```json
{
  "status": 404,
  "errors": [
    {
      "title": "No fue posible encontrar el registro",
      "code": "not_found",
      "detail": "Este registro no existe o fue eliminado."
    }
  ]
}
```
