---
title: "Límite de Solicitudes"
---

Cuando un cliente excede el límite asociado a él, las solicitudes posteriores son bloqueadas.

El servidor puede responder con información sobre los límites utilizados y el tiempo de espera necesario para enviar una nueva solicitud.

Esta información se adjunta a los encabezados de la respuesta (headers).

| Encabezado | Ejemplo | Descripción |
| --- | --- | --- |
| ratelimit-limit | 60 | El límite de solicitudes para el cliente. |
| ratelimit-name | throttle\_authenticated\_web | Nombre del throttle utilizado. |
| ratelimit-remaining | 0 | Número de solicitudes disponibles. |
| ratelimit-reset | 1609844400 | [Hora Unix](https://en.wikipedia.org/wiki/Unix_time) - cuando el conteo será reiniciado. |
| retry-after | 30 | Tiempo en segundos hasta que el conteo sea reiniciado. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) . |

Hay dos tipos de límites de solicitudes en la API de Kobana, los límites de solicitudes `GET` y `POST`.

En ambos casos el conteo se realiza por **hora**.

Se pueden realizar como máximo:

60 solicitudes por hora `GET`

1000 solicitudes por hora `POST`

Si tu operación necesita un número mayor de solicitudes, habla con nuestro soporte o equipo comercial.

El número de solicitudes realizadas por el usuario se reinicia en el primer minuto de cada hora.

A cada solicitud realizada, el servidor retorna los encabezados `ratelimit-limit` y `ratelimit-remaining` con el número de solicitudes permitidas y el número de solicitudes restantes para esa hora.

Ejemplo de Respuesta en caso de éxito

```http
Date: Fri, 05 Nov 2010 12:00:00 GMT
Content-Type: application/json; charset=utf-8
ratelimit-limit: 1000
ratelimit-remaining: 486
```

Si alcanzas el número máximo de solicitudes dentro de una hora, el servidor retorna el estado `HTTP 429 Too Many Requests`.

En este caso, debes esperar el número de segundos retornado en el encabezado `retry-after` antes de realizar la próxima solicitud.

Ejemplo de Respuesta en caso de bloqueo:

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

{error: "Límite de solicitudes POST por hora excedido para este usuario."}
```

Referencias:

[https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html](https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html)
