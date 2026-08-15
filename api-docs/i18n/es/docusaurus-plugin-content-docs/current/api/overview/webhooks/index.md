---
title: "Webhooks"
---

Los webhooks permiten que los sistemas externos reciban notificaciones de todos los eventos que ocurren en el sistema.

Cuando ocurre un evento, el sistema envía una solicitud `HTTP POST` a la URL configurada en el webhook con la información relacionada con el evento.

Los webhooks también se llaman `Callbacks` o `Reverse API`.

### Funcionamiento

Cuando un evento se dispara dentro de Kobana, se generan notificaciones para cada webhook que esté configurado para recibir ese evento.

Estas notificaciones generan automáticamente una solicitud que se realiza en la URL configurada en el webhook. Kobana mantiene el registro de todas las solicitudes generadas, así como la información de la solicitud (Request) y la respuesta del servidor externo (Response).

Al recibir la notificación, nos responde confirmando la recepción.

#### Solicitud

Además de los encabezados normales de una solicitud `HTTP POST`, se envían los siguientes encabezados:

| Encabezado | Descripción |
| --- | --- |
| **X-Kobana-Event** | [Código del evento](/api/overview/webhooks/events) que generó esta notificación. |
| **X-Kobana-Delivery-Id** | ID único de la notificación, en formato [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) . |
| **X-Kobana-Environment** | Ambiente desde donde se disparó la notificación ( `production` o `sandbox` ). |
| **X-Kobana-Signature** | [Firma de seguridad](/api/overview/webhooks/security) , para verificar que la llamada realmente provino de los servidores de Kobana. |
| ~~X-BoletoSimples-Event~~ (DEPRECADO) | [Código del evento](/api/overview/webhooks/events) que generó esta notificación. |
| ~~X-BoletoSimples-Delivery-Id~~ (DEPRECADO) | ID único de la notificación, en formato [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) . |
| ~~X-BoletoSimples-Environment(~~DEPRECADO) | Ambiente desde donde se disparó la notificación ( `production` o `sandbox` ). |
| ~~X-Hub-Signature~~ (DEPRECADO) | [Firma de seguridad](/api/overview/webhooks/security) , para verificar que la llamada realmente provino de los servidores de Kobana. |

Debido a las diferentes formas de tratamiento de encabezados por servidores, navegadores y librerías de varios lenguajes, no podemos garantizar que los encabezados siempre lleguen en CamelCase y por lo tanto esté preparado para recibir en formato case-insensitive conforme [RFC7230](https://www.rfc-editor.org/rfc/rfc7230#section-3.2).

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

#### Consideraciones

Algunas consideraciones en relación a los Webhooks:

- Los Webhooks pueden enviarse fuera de orden;
- El mismo Webhook puede enviarse múltiples veces, incluso manualmente y debe estar preparado para esto (principalmente en eventos de pago, para evitar duplicidad);
- Garantizamos que el Webhook se enviará al menos una vez;
- Kobana puede agregar nuevos eventos en cualquier momento y esto no se considerará como un cambio incompatible;
- Kobana puede agregar nuevos atributos en el payload del Webhook en cualquier momento y esto no se considerará como un cambio incompatible;
- Kobana **NO** puede eliminar un atributo del payload del Webhook sin notificación previa;
- Debe usar SSL/TLS en las URLs configuradas en el Webhook. Su servidor debe responder con toda la cadena de certificados incluyendo los intermediarios. Puede verificar su URL en herramientas como [Qualys SSL labs](https://www.ssllabs.com/ssltest/);
- Todos los Webhooks enviados pueden verse en el panel de historial de Webhooks enviados([Excepto fuera del período de retención](/legal/retencao-de-dados));

:::danger[Atención]

**NO** realice el procesamiento del payload enviado en el momento de la recepción del Webhook.

La recepción siempre debe responderse **de forma inmediata** con código de estado **200**.

Debe guardar el payload enviado por nosotros en una Base de Datos, Redis, Kafka, Rabbitmq o cualquier otro servicio que su aplicación use. Respondiendo con **200** inmediatamente después. Este proceso completo idealmente debe tomar milisegundos.

Solo después de la respuesta afirmativa de la recepción es que el payload debe ser procesado.

:::

Guardar el payload también es importante para que tenga un historial almacenado para futuras consultas.

Tenemos una [política de retención de datos](/legal/retencao-de-dados) y con el tiempo removeremos los eventos y envíos relacionados cuando estén fuera del plazo de nuestra custodia.

#### Respuesta (CÓDIGOS DE ESTADO)

- Los Webhooks deben responderse **de forma inmediata** con código de estado `200 OK`.
- No responda con otros códigos como por ejemplo 422, 404, etc., esto indica que está realizando el procesamiento del payload antes de respondernos, lo que es una mala práctica.
- Los Webhooks con firma de seguridad inválida deben retornar `498 Token Invalid`.
- Los Webhooks con eventos desconocidos/no esperados por usted deben ignorarse y pueden retornar con `204 No Content`.

Toda la demás información retornada en el encabezado o en el contenido de la respuesta será ignorada, pero se almacena.

Guardamos los encabezados y el contenido de la respuesta. Por esta razón es importante que **ninguna información confidencial** sea retornada en las solicitudes de notificación de los Webhooks.

#### Fallos y Reintentos

:::danger[Atención]

Nuestra plataforma de envío de webhooks esperará solo **5 segundos** por una respuesta de su servidor.

El envío será cancelado después de ese tiempo, marcado como una falla y retornará error de timeout.

:::

Kobana reintentará la entrega del Webhook si su servidor retorna con los siguientes errores y solo estos:

- 500 - Indica que su servidor está inestable en el momento;
- Timeouts -  Indica que su servidor no respondió en el tiempo esperado(máximo de 5 segundos);
- Errores de SSL/TLS - Indica que el certificado de su servidor no es válido;

Intentaremos el reenvío hasta 7 veces, aumentando el intervalo de tiempo entre los intentos.

Los intentos tomarán aproximadamente 9 horas para completarse.

Cada vez que un nuevo intento de envío falla, hace que la prioridad de envío baje en nuestras listas de prioridades de envío.

Mantenga las buenas prácticas para evitar problemas en su día a día.

Puede ver los webhooks enviados en el panel dentro de Kobana e intentar el reenvío manual si es necesario.
