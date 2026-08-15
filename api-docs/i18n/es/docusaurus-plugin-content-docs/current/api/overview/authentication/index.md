---
title: "Autenticación"
description: "Para que comiences rápidamente y realices tu primera solicitud."
---

Para que comiences rápidamente y realices tu primera solicitud.

Ofrecemos tres formas de autenticación para acceder a la API de Kobana:

| Método | Caso de Uso |
| --- | --- |
| [Token de Acceso](/api/overview/authentication/access-token) | Acceder a tu propia cuenta. |
| [Flujo Authorization Code](/api/overview/authentication/authorization-flow) | Permite obtener permisos para acceder a cuentas de terceros. |
| [Flujo Client Credentials](/api/overview/authentication/client-credentials-flow) | Permite obtener un token desde una aplicación OAuth |

## Seguridad

GUARDA LAS CREDENCIALES DE FORMA SEGURA

Debes preocuparte por cómo guardar las credenciales que obtienes de forma segura.

Si alguien obtiene el access_token con permisos, podrá acceder a información privada tuya y de tus clientes.

Nunca guardes tus credenciales junto a tu código fuente o en tu base de datos a menos que estén encriptadas.

Separar las credenciales de tu código fuente y de tu base de datos son excelentes prácticas a adoptar.
