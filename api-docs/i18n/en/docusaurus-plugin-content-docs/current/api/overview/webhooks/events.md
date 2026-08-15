---
title: "Events"
---

Some events that occur within Kobana are recorded.

All of them, when recorded, generate notifications for each webhook that is active and configured to receive the respective event.
You can access the [Event Log](https://app.kobana.com.br/conta/eventos) of your account at any time.

The codes follow a dotted hierarchical namespace started by the resource that generated the event. Simple lifecycle events use `resource.action` (e.g.: `bank_billet.paid`) or `resource.db.action` for CRUD (e.g.: `webhook.db.created`).

Command events (asynchronous operations with the bank) follow `resource[.type].operation.status`, where `operation` is the operation (`register`, `approve`, `cancel`…) and `status` contains `requested`, `confirmed`, `failed`, `error` (e.g.: `transfer.ted_batch.register.confirmed`).

### List of events

| Code | Description |
| --- | --- |
| access\_token.db.created | Access token created. |
| access\_token.db.deleted | Access token deleted. |
| access\_token.db.updated | Access token updated. |
| access\_token.expired | Access token expired. |
| access\_token.reminder | Access token expiration reminder. |
| account.bank\_billet\_creation\_blocked | Every time boleto issuance is blocked. |
| account.blocked | Every time the account is blocked. |
| account.updated | Every time the account is updated. |
| addon.activated | Every time an add-on is activated. |
| addon.removed | Every time an add-on is removed. |
| bank\_billet.add\_pix.confirmed | Pix addition to boleto confirmed. |
| bank\_billet.add\_pix.error | An error occurred when adding Pix to boleto. |
| bank\_billet.add\_pix.failed | Failure in adding Pix to boleto. |
| bank\_billet.add\_pix.requested | Pix addition to boleto requested. |
| bank\_billet.blocked | Every time a boleto payment is blocked. |
| bank\_billet.cancel.confirmed | Every time boleto cancellation is confirmed. |
| bank\_billet.cancel.error | Every time an error occurs in boleto cancellation. |
| bank\_billet.cancel.failed | Every time boleto cancellation has a permanent failure. |
| bank\_billet.cancel.requested | Every time boleto cancellation is requested. |
| bank\_billet.canceled | Every time a boleto is canceled. |
| bank\_billet.created | Every time a boleto is created. |
| bank\_billet.deleted | Every time a boleto is deleted. |
| bank\_billet.due\_date (discontinued) | Every time a boleto is notified X days before due date. |
| bank\_billet.find.confirmed | Boleto search confirmed. |
| bank\_billet.find.error | An error occurred in boleto search. |
| bank\_billet.find.failed | Failure in boleto search. |
| bank\_billet.find.requested | Boleto search requested. |
| bank\_billet.generated | Every time a boleto PDF is generated. |
| bank\_billet.overdue | Every time a boleto becomes overdue. |
| bank\_billet.paid | Every time a boleto is paid. |
| bank\_billet.protest.confirmed | Boleto protest confirmed. |
| bank\_billet.protest.error | An error occurred in boleto protest. |
| bank\_billet.protest.failed | Failure in boleto protest. |
| bank\_billet.protest.requested | Boleto protest requested. |
| bank\_billet.register.confirmed | Every time boleto registration is confirmed. |
| bank\_billet.register.error | Every time an error occurs in boleto registration. |
| bank\_billet.register.failed | Every time boleto registration has a permanent failure. |
| bank\_billet.register.requested | Every time boleto registration is requested. |
| bank\_billet.registered | Every time a boleto is registered with the bank. |
| bank\_billet.rejected | Every time a boleto is rejected by the bank. |
| bank\_billet.update.confirmed | Every time a boleto update is confirmed. |
| bank\_billet.update.error | Every time an error occurs in boleto update. |
| bank\_billet.update.failed | Every time a boleto update has a permanent failure. |
| bank\_billet.update.requested | Every time a boleto update is requested. |
| bank\_billet.updated | Every time a boleto is updated. |
| bank\_billet\_account.activated | Every time a collection portfolio is activated. |
| bank\_billet\_account.created | Every time a collection portfolio is created. |
| bank\_billet\_account.deleted | Every time a collection portfolio is deleted. |
| bank\_billet\_account.homologated (discontinued) | Every time a collection portfolio is homologated. |
| bank\_billet\_account.homologation\_failed | Every time a collection portfolio homologation fails. |
| bank\_billet\_account.homologation\_started | Every time a collection portfolio is sent for homologation. |
| bank\_billet\_account.updated | Every time a collection portfolio is updated. |
| bank\_billet\_account.validated (discontinued) | Every time a collection portfolio is validated. |
| bank\_billet\_account.validation\_released | Every time a collection portfolio is sent for validation. |
| bank\_billet\_discharge.created | Every time a return record is created. |
| bank\_billet\_discharge.deleted | Every time a return record is deleted. |
| bank\_billet\_discharge.updated | Every time a return record is updated. |
| bank\_billet\_payment.created | Every time a payment is created. |
| bank\_billet\_payment.deleted | Every time a payment is deleted. |
| bank\_billet\_payment.updated | Every time a payment is updated. |
| bank\_billet\_registration.created | Every time a boleto registration is created. |
| bank\_billet\_registration.deleted | Every time a boleto registration is deleted. |
| bank\_billet\_registration.updated | Every time a boleto registration is updated. |
| bank\_billet\_remittance.created | Every time a remittance record is created. |
| bank\_billet\_remittance.deleted | Every time a remittance record is deleted. |
| bank\_billet\_remittance.updated | Every time a remittance record is updated. |
| charge.automatic\_pix.account.db.created | Automatic Pix collection account created. |
| charge.automatic\_pix.account.db.deleted | Automatic Pix collection account deleted. |
| charge.automatic\_pix.account.db.updated | Automatic Pix collection account updated. |
| charge.automatic\_pix.pix.cancel.confirmed | Automatic Pix collection cancellation confirmed. |
| charge.automatic\_pix.pix.cancel.error | An error occurred in automatic Pix collection cancellation. |
| charge.automatic\_pix.pix.cancel.failed | Failure in automatic Pix collection cancellation. |
| charge.automatic\_pix.pix.cancel.requested | Automatic Pix collection cancellation requested. |
| charge.automatic\_pix.pix.db.created | Every time an automatic Pix collection is created. |
| charge.automatic\_pix.pix.db.deleted | Every time an automatic Pix collection is deleted. |
| charge.automatic\_pix.pix.db.updated | Automatic Pix collection updated. |
| charge.automatic\_pix.pix.register.confirmed | Automatic Pix collection registration confirmed. |
| charge.automatic\_pix.pix.register.error | An error occurred in automatic Pix collection registration. |
| charge.automatic\_pix.pix.register.failed | Failure in automatic Pix collection registration. |
| charge.automatic\_pix.pix.register.requested | Automatic Pix collection registration requested. |
| charge.automatic\_pix.pix.update.confirmed | Automatic Pix collection update confirmed. |
| charge.automatic\_pix.pix.update.error | An error occurred in automatic Pix collection update. |
| charge.automatic\_pix.pix.update.failed | Failure in automatic Pix collection update. |
| charge.automatic\_pix.pix.update.requested | Automatic Pix collection update requested. |
| charge.automatic\_pix.recurrence.cancel.confirmed | Automatic Pix recurrence cancellation confirmed. |
| charge.automatic\_pix.recurrence.cancel.error | An error occurred in automatic Pix recurrence cancellation. |
| charge.automatic\_pix.recurrence.cancel.failed | Failure in automatic Pix recurrence cancellation. |
| charge.automatic\_pix.recurrence.cancel.requested | Automatic Pix recurrence cancellation requested. |
| charge.automatic\_pix.recurrence.db.created | Every time an automatic Pix recurrence is created. |
| charge.automatic\_pix.recurrence.db.deleted | Every time an automatic Pix request is deleted. |
| charge.automatic\_pix.recurrence.db.updated | Every time an automatic Pix request is updated. |
| charge.automatic\_pix.recurrence.register.confirmed | Automatic Pix recurrence registration confirmed. |
| charge.automatic\_pix.recurrence.register.error | An error occurred in automatic Pix recurrence registration. |
| charge.automatic\_pix.recurrence.register.failed | Failure in automatic Pix recurrence registration. |
| charge.automatic\_pix.recurrence.register.requested | Automatic Pix recurrence registration requested. |
| charge.automatic\_pix.recurrence.update.confirmed | Automatic Pix recurrence update confirmed. |
| charge.automatic\_pix.recurrence.update.error | An error occurred in automatic Pix recurrence update. |
| charge.automatic\_pix.recurrence.update.failed | Failure in automatic Pix recurrence update. |
| charge.automatic\_pix.recurrence.update.requested | Automatic Pix recurrence update requested. |
| charge.automatic\_pix.request.cancel.confirmed | Automatic Pix recurrence request cancellation confirmed. |
| charge.automatic\_pix.request.cancel.error | An error occurred in automatic Pix recurrence request cancellation. |
| charge.automatic\_pix.request.cancel.failed | Failure in automatic Pix recurrence request cancellation. |
| charge.automatic\_pix.request.cancel.requested | Automatic Pix recurrence request cancellation requested. |
| charge.automatic\_pix.request.db.created | Every time an automatic Pix request is created. |
| charge.automatic\_pix.request.db.deleted | Every time an automatic Pix request is deleted. |
| charge.automatic\_pix.request.db.updated | Automatic Pix recurrence requests updated. |
| charge.automatic\_pix.request.register.confirmed | Automatic Pix recurrence request registration confirmed. |
| charge.automatic\_pix.request.register.error | An error occurred in automatic Pix recurrence request registration. |
| charge.automatic\_pix.request.register.failed | Failure in automatic Pix recurrence request registration. |
| charge.automatic\_pix.request.register.requested | Automatic Pix recurrence request registration requested. |
| charge.bank\_billet.payment.canceled | Every time a boleto payment is canceled at the financial institution. |
| charge.bank\_billet.payment.confirmed | Every time a boleto payment is effectuated at the financial institution. |
| charge.bank\_billet.payment.notified | Every time a boleto payment is notified by the financial institution. |
| charge.payment.canceled | Collection canceled. |
| charge.payment.confirmed | Collection confirmed. |
| charge.payment.db.created | Every time a collection is created in the database. |
| charge.payment.db.deleted | Every time a collection is deleted from the database. |
| charge.payment.db.updated | Every time a collection is updated in the database. |
| charge.payment.duplicated | Duplicate collection. |
| charge.payment.notified | Collection notified. |
| connection.db.created (discontinued) | Connection created. |
| connection.db.deleted (discontinued) | Connection deleted. |
| connection.db.updated (discontinued) | Connection updated. |
| credit.restriction.add.confirmed | Every time credit restriction inclusion is confirmed. |
| credit.restriction.add.error | Every time an error occurs in credit restriction inclusion. |
| credit.restriction.add.failed | Every time credit restriction inclusion fails. |
| credit.restriction.add.requested | Every time credit restriction inclusion is requested. |
| credit.restriction.remove.confirmed | Every time credit restriction removal is confirmed. |
| credit.restriction.remove.error | Every time an error occurs in credit restriction removal. |
| credit.restriction.remove.failed | Every time credit restriction removal fails. |
| credit.restriction.remove.requested | Every time credit restriction removal is requested. |
| customer.created | Every time a customer is created. |
| customer.deleted | Every time a customer is deleted. |
| customer.portal\_password\_updated | Every time the customer portal password is updated. |
| customer.updated | Every time a customer is updated. |
| customer\_subscription.created | Every time a subscription is created. |
| customer\_subscription.deleted | Every time a subscription is deleted. |
| customer\_subscription.updated | Every time a subscription is updated. |
| data.bank\_billet\_query.db.created | Boleto query created. |
| data.bank\_billet\_query.db.deleted | Boleto query deleted. |
| data.bank\_billet\_query.db.updated | Boleto query updated. |
| data.bank\_billet\_query.error | Boleto query with error. |
| data.bank\_billet\_query.success | Boleto query completed successfully. |
| data.pix\_qrcode\_query.db.created | Pix QR Code query created. |
| data.pix\_qrcode\_query.db.deleted | Pix QR Code query deleted. |
| data.pix\_qrcode\_query.db.updated | Pix QR Code query updated. |
| data.pix\_qrcode\_query.error | Pix QR Code query with error. |
| data.pix\_qrcode\_query.success | Pix QR Code query completed successfully. |
| discharge.created | Every time a return is created. |
| discharge.deleted | Every time a return is deleted. |
| discharge.processed | Every time a return is processed. |
| edi.edi\_box.activated | Every time an EDI is activated. |
| edi.edi\_box.confirming\_at\_bank | Awaiting bank confirmation |
| edi.edi\_box.db.created | Every time an EDI is created. |
| edi.edi\_box.db.deleted | Every time an EDI is deleted. |
| edi.edi\_box.db.updated | Every time an EDI is updated. |
| edi.edi\_box.demand\_received | Demand received |
| edi.edi\_box.generated | Letter generated. |
| edi.edi\_box.testing\_by\_customer | Awaiting customer testing. |
| edi.edi\_box.waiting\_for\_validations | Awaiting validations. |
| edi.remittance\_line.created | Remittance line created. |
| edi.remittance\_line.deleted | Remittance line deleted. |
| edi.remittance\_line.updated | Remittance line updated. |
| email\_account.db.created | Email account created. |
| email\_account.db.deleted | Email account deleted. |
| email\_account.db.updated | Email account updated. |
| email\_account.dns.awaiting | Awaiting DNS validation. |
| email\_account.dns.error | DNS validation failed. |
| email\_account.dns.failure | DNS attempt failure. |
| email\_account.dns.not\_ready | DNS not ready. |
| email\_account.dns.validated | DNS validated. |
| email\_account.identity.created | Identity created. |
| email\_account.identity.error | Identity already exists. |
| email\_account.identity.failure | Identity failure. |
| email\_account.identity.pending | Awaiting identity. |
| enotas.nfe.generated | Enotas: fiscal note generated |
| export.db.created | Export created. |
| export.db.deleted | Export deleted. |
| export.db.updated | Export updated. |
| financial.account.balance.updated | Every time a financial account balance is updated. |
| financial.account.db.created | Financial account created. |
| financial.account.db.deleted | Financial account deleted. |
| financial.account.db.updated | Financial account updated. |
| financial.account.statement.updated | Every time a statement is updated. (Whether by CNAB import or bank API synchronization) |
| financial.account\_balance.db.created | Balance created. |
| import.created | Every time an import is created. |
| import.deleted | Every time an import is deleted. |
| import.processed | Every time an import is processed. |
| installment.created | Every time an installment plan is created. |
| installment.deleted | Every time an installment plan is deleted. |
| installment.generated | Every time all installments of a plan are generated. |
| installment.processed | Every time all installments of a plan are processed. |
| integration.connection.db.created | Connection created. |
| integration.connection.db.deleted | Connection deleted. |
| integration.connection.db.updated | Connection updated. |
| mailbox.channel.email.db.created | Mailbox email channel created. |
| mailbox.channel.email.db.deleted | Mailbox email channel deleted. |
| mailbox.channel.email.db.updated | Mailbox email channel updated. |
| mailbox.channel.s3.db.created | Mailbox S3 channel created. |
| mailbox.channel.s3.db.deleted | Mailbox S3 channel deleted. |
| mailbox.channel.s3.db.updated | Mailbox S3 channel updated. |
| mailbox.channel.s3.fetch\_all | Mailbox file obtained from S3 channel. |
| mailbox.channel.sftp.db.created | Mailbox SFTP channel created. |
| mailbox.channel.sftp.db.deleted | Mailbox SFTP channel deleted. |
| mailbox.channel.sftp.db.updated | Mailbox SFTP channel updated. |
| mailbox.channel.sftp.fetch\_all | Mailbox file obtained from SFTP channel. |
| mailbox.channel.syncthing.db.created | Mailbox Syncthing channel created. |
| mailbox.channel.syncthing.db.deleted | Mailbox Syncthing channel deleted. |
| mailbox.channel.syncthing.db.updated | Mailbox Syncthing channel updated. |
| mailbox.channel.whatsapp.db.created | Mailbox WhatsApp channel created. |
| mailbox.channel.whatsapp.db.deleted | Mailbox WhatsApp channel deleted. |
| mailbox.channel.whatsapp.db.updated | Mailbox WhatsApp channel updated. |
| mailbox.entry.db.created | Mailbox entry created. |
| mailbox.entry.db.deleted | Mailbox entry deleted. |
| mailbox.entry.db.updated | Mailbox entry updated. |
| mailbox.entry.file.received | Mailbox file received in the inbox. |
| mailbox.entry.file.sent | Mailbox file sent to the outbox. |
| mailbox.file.db.created | Mailbox file created. |
| mailbox.file.db.deleted | Mailbox file deleted. |
| mailbox.file.db.updated | Mailbox file updated. |
| payment.approve.confirmed (discontinued) | Payment release confirmed. |
| payment.approve.error (discontinued) | An error occurred in payment release. |
| payment.approve.failed (discontinued) | Failure in payment release. |
| payment.approve.requested (discontinued) | Payment release requested. |
| payment.batch.awaiting\_approval | Payment batch awaiting release. |
| payment.batch.db.created | Payment batch created. |
| payment.batch.db.deleted | Payment batch deleted. |
| payment.batch.db.updated | Payment batch updated. |
| payment.cancel.confirmed (discontinued) | Every time a payment cancellation is confirmed. |
| payment.cancel.error (discontinued) | Every time an error occurs in payment cancellation. |
| payment.cancel.failed (discontinued) | Every time a payment cancellation fails. |
| payment.cancel.requested (discontinued) | Every time a payment cancellation is requested. |
| payment.db.created | Every time a payment is created in the database. |
| payment.db.deleted | Every time a payment is deleted from the database. |
| payment.db.updated | Every time a payment is updated in the database. |
| payment.dda.account.confirmed | DDA account approved. |
| payment.dda.account.db.created | DDA account created. |
| payment.dda.account.db.deleted | DDA account deleted. |
| payment.dda.account.db.updated | DDA account updated. |
| payment.dda.account.disabled | DDA account disabled. |
| payment.dda.account.enabled | DDA account re-enabled. |
| payment.dda.account.failed | DDA account failure. |
| payment.dda.account.letter.failed | Failure in DDA letter signature process. |
| payment.dda.account.letter.pending | DDA letter generated and sent for signature. |
| payment.dda.account.letter.signed | DDA letter signed by all signatories. |
| payment.dda.account.letter.waiting\_signatures | DDA letter awaiting signatures. |
| payment.dda.account.register.confirmed | DDA account registration confirmed. |
| payment.dda.account.register.error | An error occurred in DDA account registration. |
| payment.dda.account.register.failed | Failure in DDA account registration. |
| payment.dda.account.register.requested | DDA account registration requested. |
| payment.dda.account.rejected | DDA account rejected. |
| payment.dda.account.unregister.confirmed | DDA account unregistration confirmed. |
| payment.dda.account.unregister.error | An error occurred in DDA account unregistration. |
| payment.dda.account.unregister.failed | Failure in DDA account unregistration. |
| payment.dda.account.unregister.requested | DDA account unregistration requested. |
| payment.dda.bank\_billet.db.created | DDA boleto synced from the bank. |
| payment.dda.bank\_billet.db.updated | DDA boleto updated (released or rejected). |
| payment.dda.bank\_billet.external\_status\_changed | DDA boleto external status changed by the bank. |
| payment.payment\_batch.approve.confirmed (discontinued) | Every time a payment batch approval at the financial institution is confirmed. |
| payment.payment\_batch.approve.error (discontinued) | Every time an error occurs in payment batch approval at the financial institution. |
| payment.payment\_batch.approve.failed (discontinued) | Every time a payment batch approval at the financial institution fails. |
| payment.payment\_batch.approve.requested (discontinued) | Every time a payment batch approval at the financial institution is requested. |
| payment.payment\_batch.awaiting\_approval (discontinued) | Every time the financial institution requests approval or rejection of a payment batch. |
| payment.payment\_batch.db.created (discontinued) | Every time a payment batch is created in the database. |
| payment.payment\_batch.db.deleted (discontinued) | Every time a payment batch is deleted from the database. |
| payment.payment\_batch.db.updated (discontinued) | Every time a payment batch is updated in the database. |
| payment.payment\_batch.register.confirmed (discontinued) | Every time a payment batch registration at the financial institution is confirmed. |
| payment.payment\_batch.register.error (discontinued) | Every time an error occurs in payment batch registration at the financial institution. |
| payment.payment\_batch.register.failed (discontinued) | Every time a payment batch registration at the financial institution fails. |
| payment.payment\_batch.register.requested (discontinued) | Every time a payment batch registration at the financial institution is requested. |
| payment.payment\_batch.reprove.confirmed (discontinued) | Every time a payment batch rejection at the financial institution is confirmed. |
| payment.payment\_batch.reprove.error (discontinued) | Every time an error occurs in payment batch rejection at the financial institution. |
| payment.payment\_batch.reprove.failed (discontinued) | Every time a payment batch rejection at the financial institution fails. |
| payment.payment\_batch.reprove.requested (discontinued) | Every time a payment batch rejection at the financial institution is requested. |
| payment.register.confirmed (discontinued) | Every time a payment registration at the financial institution is confirmed. |
| payment.register.error (discontinued) | Every time an error occurs in payment registration at the financial institution. |
| payment.register.failed (discontinued) | Every time a payment registration at the financial institution fails. |
| payment.register.requested (discontinued) | Every time a payment registration at the financial institution is requested. |
| pix.cancel.confirmed | Every time a Pix cancellation is confirmed. |
| pix.cancel.error | Every time an error occurs in Pix cancellation. |
| pix.cancel.failed | Every time a Pix cancellation has a permanent failure. |
| pix.cancel.requested | Every time a Pix cancellation is requested. |
| pix.db.created | Every time a Pix is created in the database. |
| pix.db.deleted | Every time a Pix is deleted from the database. |
| pix.db.updated | Every time a Pix is updated in the database. |
| pix.overdue | Every time a Pix charge becomes overdue. |
| pix.paid | Every time confirmation of Pix payment is received. |
| pix.register.confirmed | Every time a Pix registration is confirmed. |
| pix.register.error | Every time an error occurs in Pix registration. |
| pix.register.failed | Every time a Pix registration has a permanent failure. |
| pix.register.requested | Every time a Pix registration is requested. |
| pix.update.confirmed | Every time a Pix update is confirmed. |
| pix.update.error | Every time an error occurs in Pix update. |
| pix.update.failed | Every time a Pix update has a permanent failure. |
| pix.update.requested | Every time a Pix update is requested. |
| plan\_subscription.activated | Every time a plan is activated. |
| plan\_subscription.fee | Every time a plan is charged. |
| plan\_subscription.removed | Every time a plan is deactivated. |
| plan\_subscription.updated | Every time a plan is updated. |
| remittance.created | Every time a remittance is created. |
| remittance.deleted | Every time a remittance is deleted. |
| remittance.downloaded | Every time a remittance is downloaded. |
| remittance.line.db.created | Every time a remittance line is created. |
| remittance.line.db.deleted | Every time a remittance line is deleted. |
| remittance.line.db.updated | Every time a remittance line is updated. |
| remittance.processed | Every time a remittance is processed. |
| remittance.sent | Every time a remittance is sent. (Only when automatic sending is contracted) |
| transaction.created | Every time a transaction is created. |
| transaction.processed | Every time a transaction is processed. |
| transaction.updated | Every time a transaction is updated. |
| transfer.batch.awaiting\_approval | Transfer batch awaiting release. |
| transfer.batch.db.created | Transfer batch created. |
| transfer.batch.db.deleted | Transfer batch deleted. |
| transfer.batch.db.updated | Transfer batch updated. |
| transfer.cancel.confirmed (discontinued) | Every time a transfer cancellation is confirmed. |
| transfer.cancel.error (discontinued) | Every time an error occurs in transfer cancellation. |
| transfer.cancel.failed (discontinued) | Every time a transfer cancellation fails. |
| transfer.cancel.requested (discontinued) | Every time a transfer cancellation is requested. |
| transfer.db.created | Every time a transfer is created in the database. |
| transfer.db.deleted | Every time a transfer is deleted from the database. |
| transfer.db.updated | Every time a transfer is updated in the database. |
| transfer.register.confirmed (discontinued) | Every time a transfer registration at the financial institution is confirmed. |
| transfer.register.error (discontinued) | Every time an error occurs in transfer registration at the financial institution. |
| transfer.register.failed (discontinued) | Every time a transfer registration at the financial institution fails. |
| transfer.register.requested (discontinued) | Every time a transfer registration at the financial institution is requested. |
| transfer.reschedule.confirmed (discontinued) | Every time a transfer rescheduling is confirmed. |
| transfer.reschedule.error (discontinued) | Every time an error occurs in transfer rescheduling. |
| transfer.reschedule.failed (discontinued) | Every time a transfer rescheduling fails. |
| transfer.reschedule.requested (discontinued) | Every time a transfer rescheduling is requested. |
| transfer.transfer\_batch.approve.confirmed (discontinued) | Every time a transfer batch approval at the financial institution is confirmed. |
| transfer.transfer\_batch.approve.error (discontinued) | Every time an error occurs in transfer batch approval at the financial institution. |
| transfer.transfer\_batch.approve.failed (discontinued) | Every time a transfer batch approval at the financial institution fails. |
| transfer.transfer\_batch.approve.requested (discontinued) | Every time a transfer batch approval at the financial institution is requested. |
| transfer.transfer\_batch.awaiting\_approval (discontinued) | Every time the financial institution requests approval or rejection of a transfer batch. |
| transfer.transfer\_batch.db.created (discontinued) | Every time a transfer batch is created in the database. |
| transfer.transfer\_batch.db.deleted (discontinued) | Every time a transfer batch is deleted from the database. |
| transfer.transfer\_batch.db.updated (discontinued) | Every time a transfer batch is updated in the database. |
| transfer.transfer\_batch.register.confirmed (discontinued) | Every time a transfer batch registration at the financial institution is confirmed. |
| transfer.transfer\_batch.register.error (discontinued) | Every time an error occurs in transfer batch registration at the financial institution. |
| transfer.transfer\_batch.register.failed (discontinued) | Every time a transfer batch registration at the financial institution fails. |
| transfer.transfer\_batch.register.requested (discontinued) | Every time a transfer batch registration at the financial institution is requested. |
| transfer.transfer\_batch.reprove.confirmed (discontinued) | Every time a transfer batch rejection at the financial institution is confirmed. |
| transfer.transfer\_batch.reprove.error (discontinued) | Every time an error occurs in transfer batch rejection at the financial institution. |
| transfer.transfer\_batch.reprove.failed (discontinued) | Every time a transfer batch rejection at the financial institution fails. |
| transfer.transfer\_batch.reprove.requested (discontinued) | Every time a transfer batch rejection at the financial institution is requested. |
| user.created | Every time a user is created. |
| user.deleted | Every time a user is deleted. |
| user.updated | Every time a user is updated. |
| webhook.db.created | Webhook created. |
| webhook.db.deleted | Webhook deleted. |
| webhook.db.updated | Webhook updated. |
| withdrawal.requested | Every time a withdrawal is requested. |
| withdrawal.transferred | Every time a withdrawal is transferred. |

### Payment and Transfer Events by Type

In addition to the events listed above, the system generates specific events by payment and transfer type. These events follow a combinatorial structure and do not appear individually in the list.

| Code | Description |
| --- | --- |
| payment.\{type\}.\{operation\}.\{status\} | Payment events by type. Type: pix, bank\_billet, darf, tax, utility, gru. Operation: register, approve, reschedule, cancel. Status: requested, confirmed, failed, error. Example: payment.pix.cancel.confirmed |
| payment.\{type\}\_batch.\{operation\}.\{status\} | Payment batch events by type. Type: pix\_batch, bank\_billet\_batch, darf\_batch, tax\_batch, utility\_batch, gru\_batch. Operation: register, approve, reprove. Also: awaiting\_approval |
| transfer.\{type\}.\{operation\}.\{status\} | Transfer events by type. Type: ted, pix, internal. Operation: register, reschedule, approve, cancel. Status: requested, confirmed, failed, error. Example: transfer.ted.register.confirmed |
| transfer.\{type\}\_batch.\{operation\}.\{status\} | Transfer batch events by type. Type: pix\_batch, ted\_batch, internal\_batch. Operation: register, approve, reprove. Also: awaiting\_approval |

### Ping Event

The `ping` event is a special event to test whether the webhook URL is working. When a webhook is created, a notification is also created with the `ping` event.

### Wildcard Events

When configuring the webhook, it is possible to subscribe to the above events and wildcard events. Wildcard events are not events that happen within Kobana, they are only representations of a set of events to determine which notifications the webhook should receive.

| Code | Description |
| --- | --- |
| \* | All events. If the webhook is configured for this event, it is no longer necessary to configure for any other event and your system will receive notification for all events that occur in Kobana. Additionally, the webhook will be configured to receive any and all events that may be implemented later. |
| access\_token.\* | All events related to access tokens, including new events that are implemented after the webhook is created. |
| account.\* | All events related to account, including new events that are implemented after the webhook is created. |
| bank\_billet.\* | All events related to bank boleto, including new events that are implemented after the webhook is created. |
| bank\_billet\_account.\* | All events related to collection portfolios, including new events that are implemented after the webhook is created. |
| bank\_billet\_discharge.\* | All events related to return records, including new events that are implemented after the webhook is created. |
| bank\_billet\_payment.\* | All events related to boleto payment receipt, including new events that are implemented after the webhook is created. |
| bank\_billet\_registration.\* | All events related to boleto registration via bank API, including new events that are implemented after the webhook is created. |
| bank\_billet\_remittance.\* | All events related to remittance records, including new events that are implemented after the webhook is created. |
| charge.\* | All events related to charging, including new events that are implemented after the webhook is created. |
| credit.\* | All events related to credit restriction, including new events that are implemented after the webhook is created. |
| customer.\* | All events related to customers, including new events that are implemented after the webhook is created. |
| customer\_subscription.\* | All events related to subscriptions, including new events that are implemented after the webhook is created. |
| data.\* | All events related to data queries (boleto and Pix via QR Code), including new events that are implemented after the webhook is created. |
| discharge.\* | All events related to returns, including new events that are implemented after the webhook is created. |
| edi.\* | All events related to EDI, including new events that are implemented after the webhook is created. |
| email\_account.\* | All events related to email accounts, including new events that are implemented after the webhook is created. |
| enotas.\* | All events related to fiscal notes (eNotas), including new events that are implemented after the webhook is created. |
| export.\* | All events related to exports, including new events that are implemented after the webhook is created. |
| import.\* | All events related to imports, including new events that are implemented after the webhook is created. |
| installment.\* | All events related to installment plans, including new events that are implemented after the webhook is created. |
| integration.\* | All events related to integrations and connections, including new events that are implemented after the webhook is created. |
| mailbox.\* | All events related to mailbox, including new events that are implemented after the webhook is created. |
| payment.\* | All events related to payments and their batches, including new events that are implemented after the webhook is created. |
| pix.\* | All events related to Pix, including new events that are implemented after the webhook is created. |
| plan\_subscription.\* | All events related to plans, including new events that are implemented after the webhook is created. |
| remittance.\* | All events related to remittances, including new events that are implemented after the webhook is created. |
| transaction.\* | All events related to transactions, including new events that are implemented after the webhook is created. |
| transfer.\* | All events related to transfers and their batches, including new events that are implemented after the webhook is created. |
| user.\* | All events related to users, including new events that are implemented after the webhook is created. |
| webhook.\* | All events related to webhooks, including new events that are implemented after the webhook is created. |
| withdrawal.\* | All events related to withdrawals, including new events that are implemented after the webhook is created. |
