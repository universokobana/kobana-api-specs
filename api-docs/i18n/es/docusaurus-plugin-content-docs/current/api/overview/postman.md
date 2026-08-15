---
title: "Postman"
description: "Colección de Postman para probar la API"
---

Colección de Postman para probar la API

Si prefieres usar Postman, puedes usar las colecciones que hemos preparado allí.

![](/img/guias/api-postman/kobana-postman.png)

## Equipo

[universokobana](https://www.postman.com/universokobana)

## Espacio de trabajo

[kobana-api](https://www.postman.com/universokobana/kobana-api/overview)

## Colecciones

| Colección | Dirección |
| --- | --- |
| KOBANA API v1.0 | [https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0](https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0) |
| KOBANA API v2.0 | [https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0](https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0) |

## Usando

1. Ve a Environments y selecciona el ambiente que deseas conectar
2. Establece el tipo de la variable `token` en `secret`

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-environment.png)
3. Obtén el token de Kobana en Integraciones \> API Kobana \> Token de API
4. Guarda el token en el campo `Current value`. Haz clic en `Save` (o presiona CRTL + S)
5. Ve a `Collections > KOBANA API v1.0` y haz clic en la pestaña `Authorization`
6. Selecciona el ambiente donde guardaste el token en la esquina superior derecha, donde dice `No environment`.
7. Selecciona `Bearer Token` y rellena en el campo Token el valor `{{token}}`. Haz clic en `Save` (o presiona CRTL + S)
8. Ve a `v1/userinfo` → Información del Usuario
9. Haz clic en `Send` y verás la información de tu usuario en la respuesta de la llamada.

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-request-n9tp.png)
