---
title: "Introducción"
description: "¡Eres programador, diviértete! ✨"
---

¡Eres programador, diviértete! ✨

## Formato

La API acepta solo el formato `JSON`, por lo que todas las solicitudes usan el tipo de contenido `application/json`.

| Tipo de Campo | Formato |
| --- | --- |
| **DateTime** | Formato [ISO8601](https://pt.wikipedia.org/wiki/ISO_8601) <br />Ejemplos <br />Fecha: 2022-01-24 <br />Fecha y Hora: 2022-01-24 10:07Z |

## Convenciones

Utilizamos las siguientes convenciones en esta documentación:

| Convención | Descripción |
| --- | --- |
| **:variable** | Indica el nombre de una variable que necesita ser reemplazada en una URL. |
| **#\{variable\}** | Indica el nombre de una variable que necesita ser reemplazada por valores de tu cuenta. |
| **...** | Indica el contenido de la respuesta de una solicitud, que fue truncado para facilitar la lectura de la documentación. |
| $KOBANA\_TOKEN | Indica el Token de Acceso y está en este formato para facilitar las pruebas en la línea de comandos. Suponiendo que tu token es "zjuio96wkixkzy6z98sy", puedes ejecutar el comando a continuación y luego copiar y pegar los comandos de esta documentación en la terminal. <br />`export KOBANA_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx` |

## Códigos de Retorno

La API retorna los códigos de respuesta HTTP. Esta es la información más relevante:

| Código | Descripción |  |
| --- | --- | --- |
| ✅ | **200 OK** | La solicitud fue exitosa y el cuerpo de la respuesta contiene contenido. |
| ✅ | **201 Created** | El recurso fue creado exitosamente. |
| ✅ | **204 No Content** | La solicitud fue exitosa pero el cuerpo de la respuesta no contiene contenido |
| ❌ | **400 Bad Request** | La solicitud no es válida, generalmente contiene contenido mal formado. |
| ❌ | **401 Unauthorized** | El usuario y contraseña o token de acceso son inválidos. |
| ❌ | **403 Forbidden** | El acceso a la API está bloqueado o el usuario está bloqueado. |
| ❌ | **404 Not Found** | La dirección accedida no existe. |
| ❌ | **422 Unprocessable Entity** | La solicitud es válida, pero los datos proporcionados no son válidos. |
| ❌ | **429 Too Many Requests** | El usuario ha alcanzado el límite de solicitudes. |
| ❌ | **500 Internal Server Error** | Hubo un error interno del servidor al procesar la solicitud. Consulta el [estado de los servidores](https://status.kobana.com.br) . |

Si deseas saber más sobre retornos de errores y códigos de error específicos, accede a la página [Errores](/api/overview/errors)

## ID de las Solicitudes (Request ID)

Cada solicitud de API tiene un identificador de solicitud asociado. Puedes encontrar este valor en el encabezado `Request-Id` de cada respuesta de la API.

Esta información es útil para depurar errores y tener más seguridad en todas las operaciones. Puedes consultar las solicitudes y sus IDs en el panel del sistema.

El registro de solicitudes está disponible por un período de 30 días.

Si necesitas ponerte en contacto con nosotros sobre una solicitud específica, proporcionar el identificador de la solicitud garantizará la resolución lo más rápido posible.

## Seguridad

La API de Kobana utiliza certificados SSL de 2048 bits.

Toda solicitud realizada a través de la API debe utilizar el protocolo HTTPS ya que estará pasando información de autenticación en el encabezado de la solicitud.

Las solicitudes realizadas en el puerto 80 serán automáticamente redirigidas al puerto 443. Esta medida garantiza que ninguna solicitud realizada a la API esté fuera del protocolo seguro.

Todas las solicitudes realizadas en los servidores de Kobana serán encriptadas.

Por lo tanto, las aplicaciones que se conectan a nuestra API deben estar listas para comunicarse a través de los protocolos `TLSv1.2` o `TLSv1.3` usando uno de los siguientes cifrados:

TLS\_AES\_128\_GCM\_SHA256

TLS\_AES\_256\_GCM\_SHA384

TLS\_CHACHA20\_POLY1305\_SHA256

ECDHE-RSA-AES128-GCM-SHA256

ECDHE-RSA-AES128-SHA256

ECDHE-RSA-AES256-GCM-SHA384

ECDHE-RSA-CHACHA20-POLY1305

ECDHE-RSA-AES256-SHA384

Por razones de seguridad, no admitimos conexiones a través del protocolo `TLSv1` y `TLSv1.1`.

## Caché HTTP

Debes usar los encabezados HTTP de caché para reducir la

carga en nuestros servidores (¡y aumentar la velocidad de tu aplicación!).

La mayoría de las respuestas de las solicitudes incluirán un encabezado `ETag`

u `Last-Modified`. Cuando solicites un recurso por primera vez,

almacena ese valor y devuélvenoslo en las solicitudes posteriores

en los encabezados `If-None-Match` e `If-Modified-Since`. Si el recurso no

ha sido modificado, recibirás una respuesta con el encabezado `304 Not Modified`,

lo que ahorra tiempo y ancho de banda, al

evitar enviarte los datos que ya tienes.

[Más información sobre Caché HTTP (en inglés)](http://www.mnot.net/cache_docs/)

## Tratamiento de Errores

Si nuestros servidores tienen problemas, tu solicitud recibirá una respuesta de error con estado 5xx.

El error 500 significa que la aplicación no está disponible,

pero también puedes recibir otros errores

de la familia 500 en casos específicos, como `502 Bad Gateway`,

`503 Service Unavailable` o `504 Gateway Timeout`.

Es tu responsabilidad identificar el error y manejar estos

casos, haciendo que la aplicación intente enviar

la solicitud de nuevo después de unos minutos.

Contamos con una página que informa el estado de los servidores de Kobana en

[https://status.kobana.com.br/](https://status.kobana.com.br/)
