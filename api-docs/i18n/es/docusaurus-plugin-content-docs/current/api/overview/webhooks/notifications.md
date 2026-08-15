---
title: "Notificaciones"
---

Cada vez que ocurre un evento en el sistema y un webhook está activo y configurado para recibir el evento, se crea una notificación y se entrega.

En el menú **Integraciones -\> Webhooks -\> Historial**, puede rastrear las notificaciones y los detalles de la solicitud.

![Historial de webhooks enviados](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.41.20.png)

Esta área es muy útil para inspeccionar qué sucedió en cada caso.

Encontrará las respuestas que recibimos de su servidor en caso de éxito o fallos.

![Detalles del Webhook](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.43.17.png)

### Reenviando la notificación

Si su sistema ha tenido algún error y desea recibir la notificación nuevamente, puede reenviarla a través de esta área usando el menú **Acciones**.

![](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.48.23.png)

Cuando reenvía la notificación, la información de la solicitud y la respuesta, así como la duración se sobrescriben.

En el momento del reenvío se utilizan las configuraciones actuales del webhook, es decir, si la dirección del webhook cambió entre el momento en que se creó la notificación y el momento en que se está reenviando, la nueva dirección se utilizará en el reenvío.

Es importante destacar que esto no es una operación común y debe usarse solo mientras desarrolla una integración.
