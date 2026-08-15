---
title: "User-Agent"
description: "Este encabezado es opcional en todas las solicitudes"
---

Este encabezado es opcional en todas las solicitudes

Puedes incluir el encabezado `User-Agent` con el nombre de tu aplicación y una dirección de correo electrónico válida, para que podamos ponernos en contacto en caso de que:

1. Estés haciendo algo incorrecto, y podamos advertirte de antemano antes de que seas bloqueado;
2. Estés haciendo algo muy interesante, y podamos felicitarte :)

A continuación un Ejemplo:

`User-Agent: Mi e-Commerce (miecommerce@example.com)`

Ejemplo de cómo pasar este encabezado usando cURL:

```bash
curl -i \
-H "Authorization: Bearer TOKEN" \
-H 'Content-Type: application/json' \
-H 'User-Agent: Mi e-Commerce (miecommerce@example.com)' \
-X GET 'https://api-sandbox.kobana.com.br/v1/userinfo'
```
