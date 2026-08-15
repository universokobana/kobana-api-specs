---
title: "Eventos"
---

Algunos eventos que ocurren dentro de Kobana se registran.

Todos ellos, cuando se registran, generan notificaciones para cada webhook que esté activo y configurado para recibir el evento respectivo.
Puede acceder en cualquier momento al [Registro de Eventos](https://app.kobana.com.br/conta/eventos) de su cuenta.

Los códigos siguen un espacio de nombres punteado jerárquico iniciado por el recurso que generó el evento. Eventos simples de ciclo de vida usan `resource.action` (ej.: `bank_billet.paid`) o `resource.db.action` para CRUD (ej.: `webhook.db.created`).

Eventos de comando (operaciones asincrónicas con el banco) siguen `resource[.type].operation.status`, donde `operation` es la operación (`register`, `approve`, `cancel`…) y `status` contiene `requested`, `confirmed`, `failed`, `error` (ej.: `transfer.ted_batch.register.confirmed`).

### Lista de eventos

| Código | Descripción |
| --- | --- |
| access\_token.db.created | Token de acceso creado. |
| access\_token.db.deleted | Token de acceso eliminado. |
| access\_token.db.updated | Token de acceso actualizado. |
| access\_token.expired | Token de acceso expirado. |
| access\_token.reminder | Recordatorio de expiración del token de acceso. |
| account.bank\_billet\_creation\_blocked | Cada vez que la emisión de boleto está bloqueada. |
| account.blocked | Cada vez que la cuenta está bloqueada. |
| account.updated | Cada vez que la cuenta se actualiza. |
| addon.activated | Cada vez que un complemento está activado. |
| addon.removed | Cada vez que un complemento se elimina. |
| bank\_billet.add\_pix.confirmed | Adición del Pix al Boleto confirmada. |
| bank\_billet.add\_pix.error | Se produjo un error al agregar Pix al Boleto. |
| bank\_billet.add\_pix.failed | Falla al agregar Pix al Boleto. |
| bank\_billet.add\_pix.requested | Adición del Pix al Boleto solicitada. |
| bank\_billet.blocked | Cada vez que el pago de un boleto está bloqueado. |
| bank\_billet.cancel.confirmed | Cada vez que la cancelación del boleto se confirma. |
| bank\_billet.cancel.error | Cada vez que hay un error en la cancelación del boleto. |
| bank\_billet.cancel.failed | Cada vez que la cancelación del boleto falla definitivamente. |
| bank\_billet.cancel.requested | Cada vez que se solicita la cancelación del boleto. |
| bank\_billet.canceled | Cada vez que se cancela un boleto. |
| bank\_billet.created | Cada vez que se crea un boleto. |
| bank\_billet.deleted | Cada vez que se elimina un boleto. |
| bank\_billet.due\_date (descontinuado) | Cada vez que se notifica un boleto X días antes del vencimiento. |
| bank\_billet.find.confirmed | Búsqueda de Boleto confirmada. |
| bank\_billet.find.error | Se produjo un error en la búsqueda de Boleto. |
| bank\_billet.find.failed | Falla en la búsqueda de Boleto. |
| bank\_billet.find.requested | Búsqueda de Boleto solicitada. |
| bank\_billet.generated | Cada vez que se genera el PDF de un boleto. |
| bank\_billet.overdue | Cada vez que un boleto vence. |
| bank\_billet.paid | Cada vez que se paga un boleto. |
| bank\_billet.protest.confirmed | Protesto del Boleto confirmado. |
| bank\_billet.protest.error | Se produjo un error en el protesto del Boleto. |
| bank\_billet.protest.failed | Falla en el protesto del Boleto. |
| bank\_billet.protest.requested | Protesto del Boleto solicitado. |
| bank\_billet.register.confirmed | Cada vez que se confirma el registro del boleto. |
| bank\_billet.register.error | Cada vez que hay un error en el registro del boleto. |
| bank\_billet.register.failed | Cada vez que el registro del boleto falla definitivamente. |
| bank\_billet.register.requested | Cada vez que se solicita el registro del boleto. |
| bank\_billet.registered | Cada vez que se registra un boleto en el banco. |
| bank\_billet.rejected | Cada vez que el banco rechaza un boleto. |
| bank\_billet.update.confirmed | Cada vez que se confirma una actualización del boleto. |
| bank\_billet.update.error | Cada vez que hay un error en la actualización del boleto. |
| bank\_billet.update.failed | Cada vez que la actualización del boleto falla definitivamente. |
| bank\_billet.update.requested | Cada vez que se solicita una actualización del boleto. |
| bank\_billet.updated | Cada vez que se actualiza un boleto. |
| bank\_billet\_account.activated | Cada vez que se activa una cartilla de cobranza. |
| bank\_billet\_account.created | Cada vez que se crea una cartilla de cobranza. |
| bank\_billet\_account.deleted | Cada vez que se elimina una cartilla de cobranza. |
| bank\_billet\_account.homologated (descontinuado) | Cada vez que se homologa una cartilla de cobranza. |
| bank\_billet\_account.homologation\_failed | Cada vez que falla una homologación de la cartilla de cobranza. |
| bank\_billet\_account.homologation\_started | Cada vez que se envía una cartilla de cobranza para homologación. |
| bank\_billet\_account.updated | Cada vez que se actualiza una cartilla de cobranza. |
| bank\_billet\_account.validated (descontinuado) | Cada vez que se valida una cartilla de cobranza. |
| bank\_billet\_account.validation\_released | Cada vez que se envía una cartilla de cobranza para validación. |
| bank\_billet\_discharge.created | Cada vez que se crea un registro de devolución. |
| bank\_billet\_discharge.deleted | Cada vez que se elimina un registro de devolución. |
| bank\_billet\_discharge.updated | Cada vez que se actualiza un registro de devolución. |
| bank\_billet\_payment.created | Cada vez que se crea un pago. |
| bank\_billet\_payment.deleted | Cada vez que se elimina un pago. |
| bank\_billet\_payment.updated | Cada vez que se actualiza un pago. |
| bank\_billet\_registration.created | Cada vez que se crea un registro de boleto. |
| bank\_billet\_registration.deleted | Cada vez que se elimina un registro de boleto. |
| bank\_billet\_registration.updated | Cada vez que se actualiza un registro de boleto. |
| bank\_billet\_remittance.created | Cada vez que se crea un registro de remesa. |
| bank\_billet\_remittance.deleted | Cada vez que se elimina un registro de remesa. |
| bank\_billet\_remittance.updated | Cada vez que se actualiza un registro de remesa. |
| charge.automatic\_pix.account.db.created | Cuenta de Pix Automático creada. |
| charge.automatic\_pix.account.db.deleted | Cuenta de Pix Automático eliminada. |
| charge.automatic\_pix.account.db.updated | Cuenta de Pix Automático actualizada. |
| charge.automatic\_pix.pix.cancel.confirmed | Cancelación de la Cobranza de Pix Automático confirmada. |
| charge.automatic\_pix.pix.cancel.error | Se produjo un error en la cancelación de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.cancel.failed | Falla en la cancelación de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.cancel.requested | Cancelación de la Cobranza de Pix Automático solicitada. |
| charge.automatic\_pix.pix.db.created | Cada vez que se crea una cobranza de pix automático. |
| charge.automatic\_pix.pix.db.deleted | Cada vez que se elimina una cobranza de pix automático. |
| charge.automatic\_pix.pix.db.updated | Cobranza de Pix Automático actualizada. |
| charge.automatic\_pix.pix.register.confirmed | Registro de la Cobranza de Pix Automático confirmado. |
| charge.automatic\_pix.pix.register.error | Se produjo un error en el registro de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.register.failed | Falla en el registro de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.register.requested | Registro de la Cobranza de Pix Automático solicitado. |
| charge.automatic\_pix.pix.update.confirmed | Actualización de la Cobranza de Pix Automático confirmada. |
| charge.automatic\_pix.pix.update.error | Se produjo un error en la actualización de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.update.failed | Falla en la actualización de la Cobranza de Pix Automático. |
| charge.automatic\_pix.pix.update.requested | Actualización de la Cobranza de Pix Automático solicitada. |
| charge.automatic\_pix.recurrence.cancel.confirmed | Cancelación de la Recurrencia de Pix Automático confirmada. |
| charge.automatic\_pix.recurrence.cancel.error | Se produjo un error en la cancelación de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.cancel.failed | Falla en la cancelación de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.cancel.requested | Cancelación de la Recurrencia de Pix Automático solicitada. |
| charge.automatic\_pix.recurrence.db.created | Cada vez que se crea una recurrencia de pix automático. |
| charge.automatic\_pix.recurrence.db.deleted | Cada vez que se elimina una solicitud de pix automático. |
| charge.automatic\_pix.recurrence.db.updated | Cada vez que se actualiza una solicitud de pix automático. |
| charge.automatic\_pix.recurrence.register.confirmed | Registro de la Recurrencia de Pix Automático confirmado. |
| charge.automatic\_pix.recurrence.register.error | Se produjo un error en el registro de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.register.failed | Falla en el registro de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.register.requested | Registro de la Recurrencia de Pix Automático solicitado. |
| charge.automatic\_pix.recurrence.update.confirmed | Actualización de la Recurrencia de Pix Automático confirmada. |
| charge.automatic\_pix.recurrence.update.error | Se produjo un error en la actualización de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.update.failed | Falla en la actualización de la Recurrencia de Pix Automático. |
| charge.automatic\_pix.recurrence.update.requested | Actualización de la Recurrencia de Pix Automático solicitada. |
| charge.automatic\_pix.request.cancel.confirmed | Cancelación de la Solicitud de Recurrencia de Pix Automático confirmada. |
| charge.automatic\_pix.request.cancel.error | Se produjo un error en la cancelación de la Solicitud de Recurrencia de Pix Automático. |
| charge.automatic\_pix.request.cancel.failed | Falla en la cancelación de la Solicitud de Recurrencia de Pix Automático. |
| charge.automatic\_pix.request.cancel.requested | Cancelación de la Solicitud de Recurrencia de Pix Automático solicitada. |
| charge.automatic\_pix.request.db.created | Cada vez que se crea una solicitud de pix automático. |
| charge.automatic\_pix.request.db.deleted | Cada vez que se elimina una solicitud de pix automático. |
| charge.automatic\_pix.request.db.updated | Solicitudes de Recurrencia de Pix Automático actualizada. |
| charge.automatic\_pix.request.register.confirmed | Registro de la Solicitud de Recurrencia de Pix Automático confirmado. |
| charge.automatic\_pix.request.register.error | Se produjo un error en el registro de la Solicitud de Recurrencia de Pix Automático. |
| charge.automatic\_pix.request.register.failed | Falla en el registro de la Solicitud de Recurrencia de Pix Automático. |
| charge.automatic\_pix.request.register.requested | Registro de la Solicitud de Recurrencia de Pix Automático solicitado. |
| charge.bank\_billet.payment.canceled | Cada vez que se cancela un pago de boleto en la institución financiera. |
| charge.bank\_billet.payment.confirmed | Cada vez que se efectúa un pago de boleto en la institución financiera. |
| charge.bank\_billet.payment.notified | Cada vez que se notifica un pago de boleto por la institución financiera. |
| charge.payment.canceled | Recepción cancelada. |
| charge.payment.confirmed | Recepción confirmada. |
| charge.payment.db.created | Cada vez que se crea una recepción en la base de datos. |
| charge.payment.db.deleted | Cada vez que se elimina una recepción en la base de datos. |
| charge.payment.db.updated | Cada vez que se actualiza una recepción en la base de datos. |
| charge.payment.duplicated | Recepción duplicada. |
| charge.payment.notified | Recepción notificada. |
| connection.db.created (descontinuado) | Conexión creada. |
| connection.db.deleted (descontinuado) | Conexión eliminada. |
| connection.db.updated (descontinuado) | Conexión actualizada. |
| credit.restriction.add.confirmed | Cada vez que se confirma una inclusión de la restricción de crédito. |
| credit.restriction.add.error | Cada vez que hay un error en la inclusión de la restricción de crédito. |
| credit.restriction.add.failed | Cada vez que falla la inclusión de la restricción de crédito. |
| credit.restriction.add.requested | Cada vez que se solicita la inclusión de la restricción de crédito. |
| credit.restriction.remove.confirmed | Cada vez que se confirma una eliminación de la restricción de crédito. |
| credit.restriction.remove.error | Cada vez que hay un error en la eliminación de la restricción de crédito. |
| credit.restriction.remove.failed | Cada vez que falla la eliminación de la restricción de crédito. |
| credit.restriction.remove.requested | Cada vez que se solicita la eliminación de la restricción de crédito. |
| customer.created | Cada vez que se crea un cliente. |
| customer.deleted | Cada vez que se elimina un cliente. |
| customer.portal\_password\_updated | Cada vez que se actualiza la contraseña del portal del cliente. |
| customer.updated | Cada vez que se actualiza un cliente. |
| customer\_subscription.created | Cada vez que se crea una suscripción. |
| customer\_subscription.deleted | Cada vez que se elimina una suscripción. |
| customer\_subscription.updated | Cada vez que se actualiza una suscripción. |
| data.bank\_billet\_query.db.created | Consulta de boleto creada. |
| data.bank\_billet\_query.db.deleted | Consulta de boleto eliminada. |
| data.bank\_billet\_query.db.updated | Consulta de boleto actualizada. |
| data.bank\_billet\_query.error | Consulta de boleto con error. |
| data.bank\_billet\_query.success | Consulta de boleto realizada con éxito. |
| data.pix\_qrcode\_query.db.created | Consulta de Pix mediante código QR creada. |
| data.pix\_qrcode\_query.db.deleted | Consulta de Pix mediante código QR eliminada. |
| data.pix\_qrcode\_query.db.updated | Consulta de Pix mediante código QR actualizada. |
| data.pix\_qrcode\_query.error | Consulta de Pix mediante código QR con error. |
| data.pix\_qrcode\_query.success | Consulta de Pix mediante código QR realizada con éxito. |
| discharge.created | Cada vez que se crea una devolución. |
| discharge.deleted | Cada vez que se elimina una devolución. |
| discharge.processed | Cada vez que se procesa una devolución. |
| edi.edi\_box.activated | Cada vez que se activa un EDI. |
| edi.edi\_box.confirming\_at\_bank | Esperando confirmación del banco |
| edi.edi\_box.db.created | Cada vez que se crea un EDI. |
| edi.edi\_box.db.deleted | Cada vez que se elimina un EDI. |
| edi.edi\_box.db.updated | Cada vez que se actualiza un EDI. |
| edi.edi\_box.demand\_received | Demanda recibida |
| edi.edi\_box.generated | Carta generada. |
| edi.edi\_box.testing\_by\_customer | Esperando prueba del cliente. |
| edi.edi\_box.waiting\_for\_validations | Esperando validaciones. |
| edi.remittance\_line.created | Línea de Remesa creada. |
| edi.remittance\_line.deleted | Línea de Remesa eliminada. |
| edi.remittance\_line.updated | Línea de Remesa actualizada. |
| email\_account.db.created | Cuenta de correo creada. |
| email\_account.db.deleted | Cuenta de correo eliminada. |
| email\_account.db.updated | Cuenta de correo actualizada. |
| email\_account.dns.awaiting | Esperando validación de DNS. |
| email\_account.dns.error | Falla en la validación de DNS. |
| email\_account.dns.failure | Falla en el intento de DNS. |
| email\_account.dns.not\_ready | DNS no listo. |
| email\_account.dns.validated | DNS validado. |
| email\_account.identity.created | Identidad creada. |
| email\_account.identity.error | Identidad ya existente. |
| email\_account.identity.failure | Falla de identidad. |
| email\_account.identity.pending | Esperando identidad. |
| enotas.nfe.generated | Enotas: nota fiscal generada |
| export.db.created | Exportación creada. |
| export.db.deleted | Exportación eliminada. |
| export.db.updated | Exportación actualizada. |
| financial.account.balance.updated | Cada vez que se actualiza un saldo de una cuenta financiera. |
| financial.account.db.created | Cuenta Financiera creada. |
| financial.account.db.deleted | Cuenta Financiera eliminada. |
| financial.account.db.updated | Cuenta Financiera actualizada. |
| financial.account.statement.updated | Cada vez que se actualiza un estado de cuenta. (Ya sea por importación de CNAB o sincronización con API del banco) |
| financial.account\_balance.db.created | Saldo creado. |
| import.created | Cada vez que se crea una importación. |
| import.deleted | Cada vez que se elimina una importación. |
| import.processed | Cada vez que se procesa una importación. |
| installment.created | Cada vez que se crea un pagare. |
| installment.deleted | Cada vez que se elimina un pagare. |
| installment.generated | Cada vez que se generan todas las cuotas de un pagare. |
| installment.processed | Cada vez que se procesan todas las cuotas de un pagare. |
| integration.connection.db.created | Conexión creada. |
| integration.connection.db.deleted | Conexión eliminada. |
| integration.connection.db.updated | Conexión actualizada. |
| mailbox.channel.email.db.created | Canal de correo de Buzón creado. |
| mailbox.channel.email.db.deleted | Canal de correo de Buzón eliminado. |
| mailbox.channel.email.db.updated | Canal de correo de Buzón actualizado. |
| mailbox.channel.s3.db.created | Canal S3 de Buzón creado. |
| mailbox.channel.s3.db.deleted | Canal S3 de Buzón eliminado. |
| mailbox.channel.s3.db.updated | Canal S3 de Buzón actualizado. |
| mailbox.channel.s3.fetch\_all | Archivo de Buzón obtenido del canal S3. |
| mailbox.channel.sftp.db.created | Canal SFTP de Buzón creado. |
| mailbox.channel.sftp.db.deleted | Canal SFTP de Buzón eliminado. |
| mailbox.channel.sftp.db.updated | Canal SFTP de Buzón actualizado. |
| mailbox.channel.sftp.fetch\_all | Archivo de Buzón obtenido del canal SFTP. |
| mailbox.channel.syncthing.db.created | Canal Syncthing de Buzón creado. |
| mailbox.channel.syncthing.db.deleted | Canal Syncthing de Buzón eliminado. |
| mailbox.channel.syncthing.db.updated | Canal Syncthing de Buzón actualizado. |
| mailbox.channel.whatsapp.db.created | Canal WhatsApp de Buzón creado. |
| mailbox.channel.whatsapp.db.deleted | Canal WhatsApp de Buzón eliminado. |
| mailbox.channel.whatsapp.db.updated | Canal WhatsApp de Buzón actualizado. |
| mailbox.entry.db.created | Entrada de Buzón creada. |
| mailbox.entry.db.deleted | Entrada de Buzón eliminada. |
| mailbox.entry.db.updated | Entrada de Buzón actualizada. |
| mailbox.entry.file.received | Archivo de Buzón recibido en la bandeja de entrada. |
| mailbox.entry.file.sent | Archivo de Buzón enviado a la bandeja de salida. |
| mailbox.file.db.created | Archivo de Buzón creado. |
| mailbox.file.db.deleted | Archivo de Buzón eliminado. |
| mailbox.file.db.updated | Archivo de Buzón actualizado. |
| payment.approve.confirmed (descontinuado) | Liberación de Pago confirmada. |
| payment.approve.error (descontinuado) | Se produjo un error en la liberación de Pago. |
| payment.approve.failed (descontinuado) | Falla en la liberación de Pago. |
| payment.approve.requested (descontinuado) | Liberación de Pago solicitada. |
| payment.batch.awaiting\_approval | Lote de pago esperando liberación. |
| payment.batch.db.created | Lote de Pago creado. |
| payment.batch.db.deleted | Lote de Pago eliminado. |
| payment.batch.db.updated | Lote de Pago actualizado. |
| payment.cancel.confirmed (descontinuado) | Cada vez que se confirma la cancelación de un pago. |
| payment.cancel.error (descontinuado) | Cada vez que hay un error en la cancelación de un pago. |
| payment.cancel.failed (descontinuado) | Cada vez que falla la cancelación de un pago. |
| payment.cancel.requested (descontinuado) | Cada vez que se solicita la cancelación de un pago. |
| payment.db.created | Cada vez que se crea un pago en la base de datos. |
| payment.db.deleted | Cada vez que se elimina un pago en la base de datos. |
| payment.db.updated | Cada vez que se actualiza un pago en la base de datos. |
| payment.dda.account.confirmed | Cuenta DDA aprobada. |
| payment.dda.account.db.created | Cuenta DDA creada. |
| payment.dda.account.db.deleted | Cuenta DDA eliminada. |
| payment.dda.account.db.updated | Cuenta DDA actualizada. |
| payment.dda.account.disabled | Cuenta DDA deshabilitada. |
| payment.dda.account.enabled | Cuenta DDA rehabilitada. |
| payment.dda.account.failed | Falla en la cuenta DDA. |
| payment.dda.account.letter.failed | Falla en el proceso de firma de la carta DDA. |
| payment.dda.account.letter.pending | Carta DDA generada y enviada para firma. |
| payment.dda.account.letter.signed | Carta DDA firmada por todos los firmantes. |
| payment.dda.account.letter.waiting\_signatures | Carta DDA esperando firmas. |
| payment.dda.account.register.confirmed | Registro de cuenta DDA confirmado. |
| payment.dda.account.register.error | Se produjo un error en el registro de la cuenta DDA. |
| payment.dda.account.register.failed | Falla en el registro de la cuenta DDA. |
| payment.dda.account.register.requested | Registro de cuenta DDA solicitado. |
| payment.dda.account.rejected | Cuenta DDA rechazada. |
| payment.dda.account.unregister.confirmed | Descadastro de la cuenta DDA confirmado. |
| payment.dda.account.unregister.error | Se produjo un error en el descadastro de la cuenta DDA. |
| payment.dda.account.unregister.failed | Falla en el descadastro de la cuenta DDA. |
| payment.dda.account.unregister.requested | Descadastro de la cuenta DDA solicitado. |
| payment.dda.bank\_billet.db.created | Boleto DDA sincronizado del banco. |
| payment.dda.bank\_billet.db.updated | Boleto DDA actualizado (liberado o rechazado). |
| payment.dda.bank\_billet.external\_status\_changed | Estado externo del Boleto DDA alterado por el banco. |
| payment.payment\_batch.approve.confirmed (descontinuado) | Cada vez que se confirma la aprobación de un Lote de pago en la institución financiera. |
| payment.payment\_batch.approve.error (descontinuado) | Cada vez que hay un error en la aprobación de un lote de pago en la institución financiera. |
| payment.payment\_batch.approve.failed (descontinuado) | Cada vez que falla la aprobación de un Lote de pago en la institución financiera. |
| payment.payment\_batch.approve.requested (descontinuado) | Cada vez que se solicita la aprobación de un Lote de pago en la institución financiera. |
| payment.payment\_batch.awaiting\_approval (descontinuado) | Cada vez que la institución financiera solicita aprobación o rechazo de un Lote de pago. |
| payment.payment\_batch.db.created (descontinuado) | Cada vez que se crea un Lote de pago en la base de datos. |
| payment.payment\_batch.db.deleted (descontinuado) | Cada vez que se elimina un Lote de pago en la base de datos. |
| payment.payment\_batch.db.updated (descontinuado) | Cada vez que se actualiza un Lote de pago en la base de datos. |
| payment.payment\_batch.register.confirmed (descontinuado) | Cada vez que se confirma el registro de un Lote de pago en la institución financiera. |
| payment.payment\_batch.register.error (descontinuado) | Cada vez que hay un error en el registro de un lote de pago en la institución financiera. |
| payment.payment\_batch.register.failed (descontinuado) | Cada vez que falla el registro de un Lote de pago en la institución financiera. |
| payment.payment\_batch.register.requested (descontinuado) | Cada vez que se solicita el registro de un Lote de pago en la institución financiera. |
| payment.payment\_batch.reprove.confirmed (descontinuado) | Cada vez que se confirma el rechazo de un Lote de pago en la institución financiera. |
| payment.payment\_batch.reprove.error (descontinuado) | Cada vez que hay un error en el rechazo de un lote de pago en la institución financiera. |
| payment.payment\_batch.reprove.failed (descontinuado) | Cada vez que falla el rechazo de un Lote de pago en la institución financiera. |
| payment.payment\_batch.reprove.requested (descontinuado) | Cada vez que se solicita el rechazo de un Lote de pago en la institución financiera. |
| payment.register.confirmed (descontinuado) | Cada vez que se confirma el registro de un pago en la institución financiera. |
| payment.register.error (descontinuado) | Cada vez que hay un error en el registro de un pago en la institución financiera. |
| payment.register.failed (descontinuado) | Cada vez que falla el registro de un pago en la institución financiera. |
| payment.register.requested (descontinuado) | Cada vez que se solicita el registro de un pago en la institución financiera. |
| pix.cancel.confirmed | Cada vez que se confirma la cancelación de un Pix. |
| pix.cancel.error | Cada vez que hay un error en la cancelación del Pix. |
| pix.cancel.failed | Cada vez que la cancelación de un Pix falla definitivamente. |
| pix.cancel.requested | Cada vez que se solicita la cancelación de un Pix. |
| pix.db.created | Cada vez que se crea un Pix en la base de datos. |
| pix.db.deleted | Cada vez que se elimina un Pix en la base de datos. |
| pix.db.updated | Cada vez que se actualiza un Pix en la base de datos. |
| pix.overdue | Cada vez que vence un Pix de Cobranza. |
| pix.paid | Cada vez que se recibe la confirmación del pago de un Pix. |
| pix.register.confirmed | Cada vez que se confirma el registro de un Pix. |
| pix.register.error | Cada vez que hay un error en el registro del Pix. |
| pix.register.failed | Cada vez que el registro de un Pix falla definitivamente. |
| pix.register.requested | Cada vez que se solicita el registro de un Pix. |
| pix.update.confirmed | Cada vez que se confirma una actualización del Pix. |
| pix.update.error | Cada vez que hay un error en la actualización del Pix. |
| pix.update.failed | Cada vez que la actualización de un Pix falla definitivamente. |
| pix.update.requested | Cada vez que se solicita una actualización del Pix. |
| plan\_subscription.activated | Cada vez que se activa un plan. |
| plan\_subscription.fee | Cada vez que se cobra un plan. |
| plan\_subscription.removed | Cada vez que se desactiva un plan. |
| plan\_subscription.updated | Cada vez que se actualiza un plan. |
| remittance.created | Cada vez que se crea una remesa. |
| remittance.deleted | Cada vez que se elimina una remesa. |
| remittance.downloaded | Cada vez que se descarga una remesa. |
| remittance.line.db.created | Cada vez que se crea una línea de remesa. |
| remittance.line.db.deleted | Cada vez que se elimina una línea de remesa. |
| remittance.line.db.updated | Cada vez que se actualiza una línea de remesa. |
| remittance.processed | Cada vez que se procesa una remesa. |
| remittance.sent | Cada vez que se envía una remesa. (Solo cuando se contrata envío automático) |
| transaction.created | Cada vez que se crea una transacción. |
| transaction.processed | Cada vez que se procesa una transacción. |
| transaction.updated | Cada vez que se actualiza una transacción. |
| transfer.batch.awaiting\_approval | Lote de transferencia esperando liberación. |
| transfer.batch.db.created | Lote de transferencia creado. |
| transfer.batch.db.deleted | Lote de transferencia eliminado. |
| transfer.batch.db.updated | Lote de transferencia actualizado. |
| transfer.cancel.confirmed (descontinuado) | Cada vez que se confirma la cancelación de una transferencia. |
| transfer.cancel.error (descontinuado) | Cada vez que hay un error en la cancelación de una transferencia. |
| transfer.cancel.failed (descontinuado) | Cada vez que falla la cancelación de una transferencia. |
| transfer.cancel.requested (descontinuado) | Cada vez que se solicita la cancelación de una transferencia. |
| transfer.db.created | Cada vez que se crea una transferencia en la base de datos. |
| transfer.db.deleted | Cada vez que se elimina una transferencia en la base de datos. |
| transfer.db.updated | Cada vez que se actualiza una transferencia en la base de datos. |
| transfer.register.confirmed (descontinuado) | Cada vez que se confirma el registro de una transferencia en la institución financiera. |
| transfer.register.error (descontinuado) | Cada vez que hay un error en el registro de una transferencia en la institución financiera. |
| transfer.register.failed (descontinuado) | Cada vez que falla el registro de una transferencia en la institución financiera. |
| transfer.register.requested (descontinuado) | Cada vez que se solicita el registro de una transferencia en la institución financiera. |
| transfer.reschedule.confirmed (descontinuado) | Cada vez que se confirma un reprogramación de una transferencia. |
| transfer.reschedule.error (descontinuado) | Cada vez que hay un error en el reprogramación de una transferencia. |
| transfer.reschedule.failed (descontinuado) | Cada vez que falla un reprogramación de una transferencia. |
| transfer.reschedule.requested (descontinuado) | Cada vez que se solicita un reprogramación de una transferencia. |
| transfer.transfer\_batch.approve.confirmed (descontinuado) | Cada vez que se confirma la aprobación de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.approve.error (descontinuado) | Cada vez que hay un error en la aprobación de un lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.approve.failed (descontinuado) | Cada vez que falla la aprobación de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.approve.requested (descontinuado) | Cada vez que se solicita la aprobación de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.awaiting\_approval (descontinuado) | Cada vez que la institución financiera solicita aprobación o rechazo de un Lote de transferencia. |
| transfer.transfer\_batch.db.created (descontinuado) | Cada vez que se crea un Lote de transferencia en la base de datos. |
| transfer.transfer\_batch.db.deleted (descontinuado) | Cada vez que se elimina un Lote de transferencia en la base de datos. |
| transfer.transfer\_batch.db.updated (descontinuado) | Cada vez que se actualiza un Lote de transferencia en la base de datos. |
| transfer.transfer\_batch.register.confirmed (descontinuado) | Cada vez que se confirma el registro de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.register.error (descontinuado) | Cada vez que hay un error en el registro de un lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.register.failed (descontinuado) | Cada vez que falla el registro de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.register.requested (descontinuado) | Cada vez que se solicita el registro de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.reprove.confirmed (descontinuado) | Cada vez que se confirma el rechazo de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.reprove.error (descontinuado) | Cada vez que hay un error en el rechazo de un lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.reprove.failed (descontinuado) | Cada vez que falla el rechazo de un Lote de transferencia en la institución financiera. |
| transfer.transfer\_batch.reprove.requested (descontinuado) | Cada vez que se solicita el rechazo de un Lote de transferencia en la institución financiera. |
| user.created | Cada vez que se crea un usuario. |
| user.deleted | Cada vez que se elimina un usuario. |
| user.updated | Cada vez que se actualiza un usuario. |
| webhook.db.created | Webhook creado. |
| webhook.db.deleted | Webhook eliminado. |
| webhook.db.updated | Webhook actualizado. |
| withdrawal.requested | Cada vez que se solicita un retiro. |
| withdrawal.transferred | Cada vez que se transfiere un retiro. |

### Eventos de Pago y Transferencia por Tipo

Además de los eventos enumerados anteriormente, el sistema genera eventos específicos por tipo de pago y transferencia. Estos eventos siguen una estructura combinatoria y no aparecen individualmente en la lista.

| Código | Descripción |
| --- | --- |
| payment.\{type\}.\{operation\}.\{status\} | Eventos de pago por tipo. Type: pix, bank\_billet, darf, tax, utility, gru. Operation: register, approve, reschedule, cancel. Status: requested, confirmed, failed, error. Ejemplo: payment.pix.cancel.confirmed |
| payment.\{type\}\_batch.\{operation\}.\{status\} | Eventos de lote de pago por tipo. Type: pix\_batch, bank\_billet\_batch, darf\_batch, tax\_batch, utility\_batch, gru\_batch. Operation: register, approve, reprove. También: awaiting\_approval |
| transfer.\{type\}.\{operation\}.\{status\} | Eventos de transferencia por tipo. Type: ted, pix, internal. Operation: register, reschedule, approve, cancel. Status: requested, confirmed, failed, error. Ejemplo: transfer.ted.register.confirmed |
| transfer.\{type\}\_batch.\{operation\}.\{status\} | Eventos de lote de transferencia por tipo. Type: pix\_batch, ted\_batch, internal\_batch. Operation: register, approve, reprove. También: awaiting\_approval |

### Evento Ping

El evento `ping` es un evento especial para probar si la URL del webhook está funcionando. Cuando se crea un webhook también se crea una notificación con el evento `ping`.

### Eventos Comodín

Al configurar el webhook es posible suscribirse a los eventos anteriores y a los eventos comodín. Los eventos comodín no son eventos que ocurren dentro de Kobana, son solo representaciones de un conjunto de eventos para determinar qué notificaciones debe recibir el webhook.

| Código | Descripción |
| --- | --- |
| \* | Todos los eventos. Si el webhook está configurado para este evento, no es necesario configurar ningún otro evento y su sistema recibirá notificaciones para todos los eventos que ocurran en Kobana. Además, el webhook estará configurado para recibir todos y cada uno de los eventos que se implementen posteriormente. |
| access\_token.\* | Todos los eventos relacionados con tokens de acceso, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| account.\* | Todos los eventos relacionados con la cuenta, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet.\* | Todos los eventos relacionados con boleto bancario, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet\_account.\* | Todos los eventos relacionados con cartillas de cobranza, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet\_discharge.\* | Todos los eventos relacionados con registros de devoluciones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet\_payment.\* | Todos los eventos relacionados con recepción de boleto, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet\_registration.\* | Todos los eventos relacionados con registro de boleto por API bancaria, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| bank\_billet\_remittance.\* | Todos los eventos relacionados con registros de remesa, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| charge.\* | Todos los eventos relacionados con cobranza, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| credit.\* | Todos los eventos relacionados con restricción de crédito, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| customer.\* | Todos los eventos relacionados con clientes, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| customer\_subscription.\* | Todos los eventos relacionados con suscripciones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| data.\* | Todos los eventos relacionados con consultas de datos (boleto y Pix mediante código QR), incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| discharge.\* | Todos los eventos relacionados con devoluciones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| edi.\* | Todos los eventos relacionados con EDI, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| email\_account.\* | Todos los eventos relacionados con cuentas de correo, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| enotas.\* | Todos los eventos relacionados con facturas (eNotas), incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| export.\* | Todos los eventos relacionados con exportaciones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| import.\* | Todos los eventos relacionados con importación, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| installment.\* | Todos los eventos relacionados con pagarés, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| integration.\* | Todos los eventos relacionados con integraciones y conexiones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| mailbox.\* | Todos los eventos relacionados con buzón de correo, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| payment.\* | Todos los eventos relacionados con pagos y sus lotes, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| pix.\* | Todos los eventos relacionados con Pix, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| plan\_subscription.\* | Todos los eventos relacionados con planes, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| remittance.\* | Todos los eventos relacionados con remesas, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| transaction.\* | Todos los eventos relacionados con transacciones, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| transfer.\* | Todos los eventos relacionados con transferencias y sus lotes, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| user.\* | Todos los eventos relacionados con usuario, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| webhook.\* | Todos los eventos relacionados con webhooks, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
| withdrawal.\* | Todos los eventos relacionados con retiros, incluyendo los nuevos eventos que se implementen después de la creación del webhook. |
