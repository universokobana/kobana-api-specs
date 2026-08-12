---
title: "Eventos"
---

Alguns eventos que ocorrem dentro da Kobana são registrados.

Todos eles, quando registrados, geram notificações para cada webhook que esteja ativo e configurado para receber o respectivo evento.
Você pode acessar a qualquer momento o [Log de Eventos](https://app.kobana.com.br/conta/eventos) da sua conta.

Os códigos seguem um namespace pontilhado hierárquico iniciado pelo recurso que gerou o evento. Eventos simples de ciclo de vida usam `resource.action` (ex.: `bank_billet.paid`) ou `resource.db.action` para CRUD (ex.: `webhook.db.created`).

Eventos de comando (operações assíncronas junto ao banco) seguem `resource[.type].operation.status`, onde `operation` é a operação (`register`, `approve`, `cancel`…) e `status` contém `requested`, `confirmed`, `failed`, `error` (ex.: `transfer.ted_batch.register.confirmed`).

### Lista de eventos

| Código | Descrição |
| --- | --- |
| access\_token.db.created | Token de acesso criado. |
| access\_token.db.deleted | Token de acesso excluído. |
| access\_token.db.updated | Token de acesso atualizado. |
| access\_token.expired | Token de acesso expirou. |
| access\_token.reminder | Lembrete de expiração do token de acesso. |
| account.bank\_billet\_creation\_blocked | Toda vez que a emissão de boleto é bloqueada. |
| account.blocked | Toda vez que a conta é bloqueada. |
| account.updated | Toda vez que a conta é atualizada. |
| addon.activated | Toda vez que um add-on é ativado. |
| addon.removed | Toda vez que um add-on é removido. |
| bank\_billet.add\_pix.confirmed | Adição do Pix ao Boleto confirmada. |
| bank\_billet.add\_pix.error | Ocorreu um erro na adição do Pix ao Boleto. |
| bank\_billet.add\_pix.failed | Falha na adição do Pix ao Boleto. |
| bank\_billet.add\_pix.requested | Adição do Pix ao Boleto solicitada. |
| bank\_billet.blocked | Toda vez que o pagamento de um boleto é bloqueado. |
| bank\_billet.cancel.confirmed | Toda vez que o cancelamento do boleto é confirmado. |
| bank\_billet.cancel.error | Toda vez que ocorrer um erro no cancelamento do boleto. |
| bank\_billet.cancel.failed | Toda vez que o cancelamento do boleto tem uma falha definitiva. |
| bank\_billet.cancel.requested | Toda vez que o cancelamento do boleto é solicitado. |
| bank\_billet.canceled | Toda vez que um boleto é cancelado. |
| bank\_billet.created | Toda vez que um boleto é criado. |
| bank\_billet.deleted | Toda vez que um boleto é excluído. |
| bank\_billet.due\_date (descontinuado) | Toda vez que um boleto é notificado com X dias antes do vencimento. |
| bank\_billet.find.confirmed | Busca de Boleto confirmada. |
| bank\_billet.find.error | Ocorreu um erro na busca de Boleto. |
| bank\_billet.find.failed | Falha na busca de Boleto. |
| bank\_billet.find.requested | Busca de Boleto solicitada. |
| bank\_billet.generated | Toda vez que o PDF de um boleto é gerado. |
| bank\_billet.overdue | Toda vez que um boleto fica vencido. |
| bank\_billet.paid | Toda vez que um boleto é pago. |
| bank\_billet.protest.confirmed | Protesto do Boleto confirmado. |
| bank\_billet.protest.error | Ocorreu um erro no protesto do Boleto. |
| bank\_billet.protest.failed | Falha no protesto do Boleto. |
| bank\_billet.protest.requested | Protesto do Boleto solicitado. |
| bank\_billet.register.confirmed | Toda vez que o registro do boleto é confirmado. |
| bank\_billet.register.error | Toda vez que ocorrer um erro no registro do boleto. |
| bank\_billet.register.failed | Toda vez que o registro do boleto tem uma falha definitiva. |
| bank\_billet.register.requested | Toda vez que o registro do boleto é solicitado. |
| bank\_billet.registered | Toda vez que um boleto é registrado no banco. |
| bank\_billet.rejected | Toda vez que um boleto é rejeitado pelo banco. |
| bank\_billet.update.confirmed | Toda vez que uma atualização do boleto é confirmada. |
| bank\_billet.update.error | Toda vez que ocorrer um erro na atualização do boleto. |
| bank\_billet.update.failed | Toda vez que uma atualização do boleto tem uma falha definitiva. |
| bank\_billet.update.requested | Toda vez que uma atualização do boleto é solicitada. |
| bank\_billet.updated | Toda vez que um boleto é atualizado. |
| bank\_billet\_account.activated | Toda vez que uma carteira de cobrança é ativada. |
| bank\_billet\_account.created | Toda vez que uma carteira de cobrança é criada. |
| bank\_billet\_account.deleted | Toda vez que uma carteira de cobrança é excluída. |
| bank\_billet\_account.homologated (descontinuado) | Toda vez que uma carteira de cobrança é homologada. |
| bank\_billet\_account.homologation\_failed | Toda vez que uma homologação da carteira de cobrança falha. |
| bank\_billet\_account.homologation\_started | Toda vez que uma carteira de cobrança é enviada para homologação. |
| bank\_billet\_account.updated | Toda vez que uma carteira de cobrança é atualizada. |
| bank\_billet\_account.validated (descontinuado) | Toda vez que uma carteira de cobrança é validada. |
| bank\_billet\_account.validation\_released | Toda vez que uma carteira de cobrança é enviada para validação. |
| bank\_billet\_discharge.created | Toda vez que um registro de retorno é criado. |
| bank\_billet\_discharge.deleted | Toda vez que um registro de retorno é excluído. |
| bank\_billet\_discharge.updated | Toda vez que um registro de retorno é atualizado. |
| bank\_billet\_payment.created | Toda vez que um pagamento é criado. |
| bank\_billet\_payment.deleted | Toda vez que um pagamento é excluído. |
| bank\_billet\_payment.updated | Toda vez que um pagamento é atualizado. |
| bank\_billet\_registration.created | Toda vez que um registro de boleto é criado. |
| bank\_billet\_registration.deleted | Toda vez que um registro de boleto é excluído. |
| bank\_billet\_registration.updated | Toda vez que um registro de boleto é atualizado. |
| bank\_billet\_remittance.created | Toda vez que um registro de remessa é criado. |
| bank\_billet\_remittance.deleted | Toda vez que um registro de remessa é excluído. |
| bank\_billet\_remittance.updated | Toda vez que um registro de remessa é atualizado. |
| charge.automatic\_pix.account.db.created | Conta de Pix Automático criada. |
| charge.automatic\_pix.account.db.deleted | Conta de Pix Automático excluída. |
| charge.automatic\_pix.account.db.updated | Conta de Pix Automático atualizada. |
| charge.automatic\_pix.pix.cancel.confirmed | Cancelamento da Cobrança de Pix Automático confirmado. |
| charge.automatic\_pix.pix.cancel.error | Ocorreu um erro no cancelamento da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.cancel.failed | Falha no cancelamento da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.cancel.requested | Cancelamento da Cobrança de Pix Automático solicitado. |
| charge.automatic\_pix.pix.db.created | Toda vez que um cobrança do pix automático é criada. |
| charge.automatic\_pix.pix.db.deleted | Toda vez que um cobrança do pix automático é excluída. |
| charge.automatic\_pix.pix.db.updated | Cobrança de Pix Automático atualizada. |
| charge.automatic\_pix.pix.register.confirmed | Registro da Cobrança de Pix Automático confirmado. |
| charge.automatic\_pix.pix.register.error | Ocorreu um erro no registro da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.register.failed | Falha no registro da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.register.requested | Registro da Cobrança de Pix Automático solicitado. |
| charge.automatic\_pix.pix.update.confirmed | Atualização da Cobrança de Pix Automático confirmada. |
| charge.automatic\_pix.pix.update.error | Ocorreu um erro na atualização da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.update.failed | Falha na atualização da Cobrança de Pix Automático. |
| charge.automatic\_pix.pix.update.requested | Atualização da Cobrança de Pix Automático solicitada. |
| charge.automatic\_pix.recurrence.cancel.confirmed | Cancelamento da Recorrência de Pix Automático confirmado. |
| charge.automatic\_pix.recurrence.cancel.error | Ocorreu um erro no cancelamento da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.cancel.failed | Falha no cancelamento da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.cancel.requested | Cancelamento da Recorrência de Pix Automático solicitado. |
| charge.automatic\_pix.recurrence.db.created | Toda vez que um recorrência do pix automático é criada. |
| charge.automatic\_pix.recurrence.db.deleted | Toda vez que um solicitação do pix automático é excluída. |
| charge.automatic\_pix.recurrence.db.updated | Toda vez que um solicitação do pix automático é atualizada. |
| charge.automatic\_pix.recurrence.register.confirmed | Registro da Recorrência de Pix Automático confirmado. |
| charge.automatic\_pix.recurrence.register.error | Ocorreu um erro no registro da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.register.failed | Falha no registro da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.register.requested | Registro da Recorrência de Pix Automático solicitado. |
| charge.automatic\_pix.recurrence.update.confirmed | Atualização da Recorrência de Pix Automático confirmada. |
| charge.automatic\_pix.recurrence.update.error | Ocorreu um erro na atualização da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.update.failed | Falha na atualização da Recorrência de Pix Automático. |
| charge.automatic\_pix.recurrence.update.requested | Atualização da Recorrência de Pix Automático solicitada. |
| charge.automatic\_pix.request.cancel.confirmed | Cancelamento da Solicitação de Recorrência de Pix Automático confirmado. |
| charge.automatic\_pix.request.cancel.error | Ocorreu um erro no cancelamento da Solicitação de Recorrência de Pix Automático. |
| charge.automatic\_pix.request.cancel.failed | Falha no cancelamento da Solicitação de Recorrência de Pix Automático. |
| charge.automatic\_pix.request.cancel.requested | Cancelamento da Solicitação de Recorrência de Pix Automático solicitado. |
| charge.automatic\_pix.request.db.created | Toda vez que um solicitação do pix automático é criada. |
| charge.automatic\_pix.request.db.deleted | Toda vez que um solicitação do pix automático é excluída. |
| charge.automatic\_pix.request.db.updated | Solicitações de Recorrência de Pix Automático atualizada. |
| charge.automatic\_pix.request.register.confirmed | Registro da Solicitação de Recorrência de Pix Automático confirmado. |
| charge.automatic\_pix.request.register.error | Ocorreu um erro no registro da Solicitação de Recorrência de Pix Automático. |
| charge.automatic\_pix.request.register.failed | Falha no registro da Solicitação de Recorrência de Pix Automático. |
| charge.automatic\_pix.request.register.requested | Registro da Solicitação de Recorrência de Pix Automático solicitado. |
| charge.bank\_billet.payment.canceled | Toda vez que um pagamento de boleto é cancelado na instituição financeira. |
| charge.bank\_billet.payment.confirmed | Toda vez que um pagamento de boleto é efetivado na instituição financeira. |
| charge.bank\_billet.payment.notified | Toda vez que um pagamento de boleto é notificado pela instituição financeira. |
| charge.payment.canceled | Recebimento cancelado. |
| charge.payment.confirmed | Recebimento confirmado. |
| charge.payment.db.created | Toda vez que um recebimento é criado no banco de dados. |
| charge.payment.db.deleted | Toda vez que um recebimento é excluído no banco de dados. |
| charge.payment.db.updated | Toda vez que um recebimento é atualizado no banco de dados. |
| charge.payment.duplicated | Recebimento duplicado. |
| charge.payment.notified | Recebimento notificado. |
| connection.db.created (descontinuado) | Conexão criada. |
| connection.db.deleted (descontinuado) | Conexão excluída. |
| connection.db.updated (descontinuado) | Conexão atualizada. |
| credit.restriction.add.confirmed | Toda vez que um inclusão da restrição de crédito é confirmada. |
| credit.restriction.add.error | Toda vez que ocorrer um erro na inclusão da restrição de crédito. |
| credit.restriction.add.failed | Toda vez que um inclusão da restrição de crédito falha. |
| credit.restriction.add.requested | Toda vez que um inclusão da restrição de crédito é solicitada. |
| credit.restriction.remove.confirmed | Toda vez que uma remoção da restrição de crédito é confirmada. |
| credit.restriction.remove.error | Toda vez que ocorrer um erro na remoção da restrição de crédito. |
| credit.restriction.remove.failed | Toda vez que uma remoção da restrição de crédito falha. |
| credit.restriction.remove.requested | Toda vez que uma remoção da restrição de crédito é solicitada. |
| customer.created | Toda vez que um cliente é criado. |
| customer.deleted | Toda vez que um cliente é excluído. |
| customer.portal\_password\_updated | Toda vez que a senha do portal do cliente é atualizada. |
| customer.updated | Toda vez que um cliente é atualizado. |
| customer\_subscription.created | Toda vez que uma assinatura é criada. |
| customer\_subscription.deleted | Toda vez que uma assinatura é excluída. |
| customer\_subscription.updated | Toda vez que uma assinatura é atualizada. |
| data.bank\_billet\_query.db.created | Consulta de boleto criada. |
| data.bank\_billet\_query.db.deleted | Consulta de boleto excluída. |
| data.bank\_billet\_query.db.updated | Consulta de boleto atualizada. |
| data.bank\_billet\_query.error | Consulta de boleto com erro. |
| data.bank\_billet\_query.success | Consulta de boleto realizada com sucesso. |
| data.pix\_qrcode\_query.db.created | Consulta de Pix via QR Code criada. |
| data.pix\_qrcode\_query.db.deleted | Consulta de Pix via QR Code excluída. |
| data.pix\_qrcode\_query.db.updated | Consulta de Pix via QR Code atualizada. |
| data.pix\_qrcode\_query.error | Consulta de Pix via QR Code com erro. |
| data.pix\_qrcode\_query.success | Consulta de Pix via QR Code realizada com sucesso. |
| discharge.created | Toda vez que um retorno é criado. |
| discharge.deleted | Toda vez que um retorno é excluído. |
| discharge.processed | Toda vez que um retorno é processado. |
| edi.edi\_box.activated | Toda vez que um EDI é ativado. |
| edi.edi\_box.confirming\_at\_bank | Aguardando confirmação do banco |
| edi.edi\_box.db.created | Toda vez que um EDI é criado. |
| edi.edi\_box.db.deleted | Toda vez que um EDI é excluído. |
| edi.edi\_box.db.updated | Toda vez que um EDI é atualizado. |
| edi.edi\_box.demand\_received | Demanda recepcionada |
| edi.edi\_box.generated | Carta gerada. |
| edi.edi\_box.testing\_by\_customer | Aguardando teste do cliente. |
| edi.edi\_box.waiting\_for\_validations | Aguardando validações. |
| edi.remittance\_line.created | Linha de Remessa criada. |
| edi.remittance\_line.deleted | Linha de Remessa excluída. |
| edi.remittance\_line.updated | Linha de Remessa atualizada. |
| email\_account.db.created | Conta de e-mail criada. |
| email\_account.db.deleted | Conta de e-mail excluída. |
| email\_account.db.updated | Conta de e-mail atualizada. |
| email\_account.dns.awaiting | Aguardando validação DNS. |
| email\_account.dns.error | Falha na validação do DNS. |
| email\_account.dns.failure | Falha na tentativa do DNS. |
| email\_account.dns.not\_ready | DNS não pronto. |
| email\_account.dns.validated | DNS validado. |
| email\_account.identity.created | Identidade criada. |
| email\_account.identity.error | Identidade já existente. |
| email\_account.identity.failure | Falha da identidade. |
| email\_account.identity.pending | Aguardando identidade. |
| enotas.nfe.generated | Enotas: nota fiscal gerada |
| export.db.created | Exportação criada. |
| export.db.deleted | Exportação excluída. |
| export.db.updated | Exportação atualizada. |
| financial.account.balance.updated | Toda vez que um saldo de uma conta financeira é atualizado. |
| financial.account.db.created | Conta Financeira criada. |
| financial.account.db.deleted | Conta Financeira excluída. |
| financial.account.db.updated | Conta Financeira atualizada. |
| financial.account.statement.updated | Toda vez que um extrato é atualizado. (Seja por importação do CNAB ou sincronização com api do banco) |
| financial.account\_balance.db.created | Saldo criado. |
| import.created | Toda vez que uma importação é criada. |
| import.deleted | Toda vez que uma importação é excluída. |
| import.processed | Toda vez que uma importação é processada. |
| installment.created | Toda vez que um carnê é criado. |
| installment.deleted | Toda vez que um carnê é excluído. |
| installment.generated | Toda vez que todas as parcelas de um carnê são geradas. |
| installment.processed | Toda vez que todas as parcelas de um carnê são processadas. |
| integration.connection.db.created | Conexão criada. |
| integration.connection.db.deleted | Conexão excluída. |
| integration.connection.db.updated | Conexão atualizada. |
| mailbox.channel.email.db.created | Canal de e-mail do Mailbox criado. |
| mailbox.channel.email.db.deleted | Canal de e-mail do Mailbox excluído. |
| mailbox.channel.email.db.updated | Canal de e-mail do Mailbox atualizado. |
| mailbox.channel.s3.db.created | Canal S3 do Mailbox criado. |
| mailbox.channel.s3.db.deleted | Canal S3 do Mailbox excluído. |
| mailbox.channel.s3.db.updated | Canal S3 do Mailbox atualizado. |
| mailbox.channel.s3.fetch\_all | Arquivo do Mailbox obtido do canal S3. |
| mailbox.channel.sftp.db.created | Canal SFTP do Mailbox criado. |
| mailbox.channel.sftp.db.deleted | Canal SFTP do Mailbox excluído. |
| mailbox.channel.sftp.db.updated | Canal SFTP do Mailbox atualizado. |
| mailbox.channel.sftp.fetch\_all | Arquivo do Mailbox obtido do canal SFTP. |
| mailbox.channel.syncthing.db.created | Canal Syncthing do Mailbox criado. |
| mailbox.channel.syncthing.db.deleted | Canal Syncthing do Mailbox excluído. |
| mailbox.channel.syncthing.db.updated | Canal Syncthing do Mailbox atualizado. |
| mailbox.channel.whatsapp.db.created | Canal WhatsApp do Mailbox criado. |
| mailbox.channel.whatsapp.db.deleted | Canal WhatsApp do Mailbox excluído. |
| mailbox.channel.whatsapp.db.updated | Canal WhatsApp do Mailbox atualizado. |
| mailbox.entry.db.created | Entrada do Mailbox criada. |
| mailbox.entry.db.deleted | Entrada do Mailbox excluída. |
| mailbox.entry.db.updated | Entrada do Mailbox atualizada. |
| mailbox.entry.file.received | Arquivo do Mailbox recebido na caixa de entrada. |
| mailbox.entry.file.sent | Arquivo do Mailbox enviado para a caixa de saída. |
| mailbox.file.db.created | Arquivo do Mailbox criado. |
| mailbox.file.db.deleted | Arquivo do Mailbox excluído. |
| mailbox.file.db.updated | Arquivo do Mailbox atualizado. |
| payment.approve.confirmed (descontinuado) | Liberação de Pagamento confirmada. |
| payment.approve.error (descontinuado) | Ocorreu um erro na liberação de Pagamento. |
| payment.approve.failed (descontinuado) | Falha na liberação de Pagamento. |
| payment.approve.requested (descontinuado) | Liberação de Pagamento solicitada. |
| payment.batch.awaiting\_approval | Lote de pagamento aguardando liberação. |
| payment.batch.db.created | Lote de Pagamento criado. |
| payment.batch.db.deleted | Lote de Pagamento excluído. |
| payment.batch.db.updated | Lote de Pagamento atualizado. |
| payment.cancel.confirmed (descontinuado) | Toda vez que um cancelamento de um pagamento é confirmado. |
| payment.cancel.error (descontinuado) | Toda vez que ocorrer um erro no cancelamento de um pagamento. |
| payment.cancel.failed (descontinuado) | Toda vez que um cancelamento de um pagamento falha. |
| payment.cancel.requested (descontinuado) | Toda vez que um cancelamento de um pagamento é solicitado. |
| payment.db.created | Toda vez que um pagamento é criado no banco de dados. |
| payment.db.deleted | Toda vez que um pagamento é excluído no banco de dados. |
| payment.db.updated | Toda vez que um pagamento é atualizado no banco de dados. |
| payment.dda.account.confirmed | Conta DDA aprovada. |
| payment.dda.account.db.created | Conta DDA criada. |
| payment.dda.account.db.deleted | Conta DDA excluída. |
| payment.dda.account.db.updated | Conta DDA atualizada. |
| payment.dda.account.disabled | Conta DDA desabilitada. |
| payment.dda.account.enabled | Conta DDA reabilitada. |
| payment.dda.account.failed | Falha na conta DDA. |
| payment.dda.account.letter.failed | Falha no processo de assinatura da carta DDA. |
| payment.dda.account.letter.pending | Carta DDA gerada e enviada para assinatura. |
| payment.dda.account.letter.signed | Carta DDA assinada por todos os signatários. |
| payment.dda.account.letter.waiting\_signatures | Carta DDA aguardando assinaturas. |
| payment.dda.account.register.confirmed | Registro da conta DDA confirmado. |
| payment.dda.account.register.error | Ocorreu um erro no registro da conta DDA. |
| payment.dda.account.register.failed | Falha no registro da conta DDA. |
| payment.dda.account.register.requested | Registro da conta DDA solicitado. |
| payment.dda.account.rejected | Conta DDA rejeitada. |
| payment.dda.account.unregister.confirmed | Descadastramento da conta DDA confirmado. |
| payment.dda.account.unregister.error | Ocorreu um erro no descadastramento da conta DDA. |
| payment.dda.account.unregister.failed | Falha no descadastramento da conta DDA. |
| payment.dda.account.unregister.requested | Descadastramento da conta DDA solicitado. |
| payment.dda.bank\_billet.db.created | Boleto DDA sincronizado do banco. |
| payment.dda.bank\_billet.db.updated | Boleto DDA atualizado (liberado ou rejeitado). |
| payment.dda.bank\_billet.external\_status\_changed | Status externo do Boleto DDA alterado pelo banco. |
| payment.payment\_batch.approve.confirmed (descontinuado) | Toda vez que a aprovação de um Lote de pagamento na instituição financeira é confirmada. |
| payment.payment\_batch.approve.error (descontinuado) | Toda vez que ocorrer um erro na aprovação de um lote de pagamento na instituição financeira. |
| payment.payment\_batch.approve.failed (descontinuado) | Toda vez que a aprovação de um Lote de pagamento na instituição financeira falha. |
| payment.payment\_batch.approve.requested (descontinuado) | Toda vez que a aprovação de um Lote de pagamento na instituição financeira é solicitada. |
| payment.payment\_batch.awaiting\_approval (descontinuado) | Toda vez que a instituição financeira solicita aprovação ou rejeição de um Lote de pagamento. |
| payment.payment\_batch.db.created (descontinuado) | Toda vez que um Lote de pagamento é criado no banco de dados. |
| payment.payment\_batch.db.deleted (descontinuado) | Toda vez que um Lote de pagamento é excluído no banco de dados. |
| payment.payment\_batch.db.updated (descontinuado) | Toda vez que um Lote de pagamento é atualizado no banco de dados. |
| payment.payment\_batch.register.confirmed (descontinuado) | Toda vez que o registro de um Lote de pagamento na instituição financeira é confirmado. |
| payment.payment\_batch.register.error (descontinuado) | Toda vez que ocorrer um erro no registro de um lote de pagamento na instituição financeira. |
| payment.payment\_batch.register.failed (descontinuado) | Toda vez que o registro de um Lote de pagamento na instituição financeira falha. |
| payment.payment\_batch.register.requested (descontinuado) | Toda vez que o registro de um Lote de pagamento na instituição financeira é solicitado. |
| payment.payment\_batch.reprove.confirmed (descontinuado) | Toda vez que a rejeição de um Lote de pagamento na instituição financeira é confirmada. |
| payment.payment\_batch.reprove.error (descontinuado) | Toda vez que ocorrer um erro na rejeição de um lote de pagamento na instituição financeira. |
| payment.payment\_batch.reprove.failed (descontinuado) | Toda vez que a rejeição de um Lote de pagamento na instituição financeira falha. |
| payment.payment\_batch.reprove.requested (descontinuado) | Toda vez que a rejeição de um Lote de pagamento na instituição financeira é solicitada. |
| payment.register.confirmed (descontinuado) | Toda vez que o registro de um pagamento na instituição financeira é confirmado. |
| payment.register.error (descontinuado) | Toda vez que ocorrer um erro no registro de um pagamento na instituição financeira. |
| payment.register.failed (descontinuado) | Toda vez que o registro de um pagamento na instituição financeira falha. |
| payment.register.requested (descontinuado) | Toda vez que o registro de um pagamento na instituição financeira é solicitado. |
| pix.cancel.confirmed | Toda vez que um cancelamento de um Pix é confirmado. |
| pix.cancel.error | Toda vez que ocorrer um erro no cancelamento do Pix. |
| pix.cancel.failed | Toda vez que um cancelamento de um Pix tem uma falha definitiva. |
| pix.cancel.requested | Toda vez que um cancelamento de um Pix é solicitado. |
| pix.db.created | Toda vez que um Pix é criado no banco de dados. |
| pix.db.deleted | Toda vez que um Pix é excluído no banco de dados. |
| pix.db.updated | Toda vez que um Pix é atualizado no banco de dados. |
| pix.overdue | Toda vez que um Pix Cobrança é vencido. |
| pix.paid | Toda vez que a confirmação do pagamento de um Pix é recebida. |
| pix.register.confirmed | Toda vez que o registro de um Pix é confirmado. |
| pix.register.error | Toda vez que ocorrer um erro no registro do Pix. |
| pix.register.failed | Toda vez que o registro de um Pix tem uma falha definitiva. |
| pix.register.requested | Toda vez que o registro de um Pix é solicitado. |
| pix.update.confirmed | Toda vez que uma atualização do Pix é confirmada. |
| pix.update.error | Toda vez que ocorrer um erro na atualização do Pix. |
| pix.update.failed | Toda vez que uma atualização do Pix tem uma falha definitiva. |
| pix.update.requested | Toda vez que uma atualização do Pix é solicitada. |
| plan\_subscription.activated | Toda vez que um plano é ativado. |
| plan\_subscription.fee | Toda vez que um plano é cobrado. |
| plan\_subscription.removed | Toda vez que um plano é desativado. |
| plan\_subscription.updated | Toda vez que um plano é atualizado. |
| remittance.created | Toda vez que uma remessa é criada. |
| remittance.deleted | Toda vez que uma remessa é excluída. |
| remittance.downloaded | Toda vez que uma remessa é baixada. |
| remittance.line.db.created | Toda vez que uma linha de remessa é criada. |
| remittance.line.db.deleted | Toda vez que uma linha de remessa é excluída. |
| remittance.line.db.updated | Toda vez que uma linha de remessa é atualizada. |
| remittance.processed | Toda vez que uma remessa é processada. |
| remittance.sent | Toda vez que uma remessa é enviada. (Somente quando contratado envio automático) |
| transaction.created | Toda vez que uma transação é criada. |
| transaction.processed | Toda vez que uma transação é processada. |
| transaction.updated | Toda vez que uma transação é atualizada. |
| transfer.batch.awaiting\_approval | Lote de transferência aguardando liberação. |
| transfer.batch.db.created | Lote de transferência criado. |
| transfer.batch.db.deleted | Lote de transferência excluído. |
| transfer.batch.db.updated | Lote de transferência atualizado. |
| transfer.cancel.confirmed (descontinuado) | Toda vez que um cancelamento de uma transferência é confirmado. |
| transfer.cancel.error (descontinuado) | Toda vez que ocorrer um erro no cancelamento de uma transferência. |
| transfer.cancel.failed (descontinuado) | Toda vez que um cancelamento de uma transferência falha. |
| transfer.cancel.requested (descontinuado) | Toda vez que um cancelamento de uma transferência é solicitado. |
| transfer.db.created | Toda vez que uma transferência é criada no banco de dados. |
| transfer.db.deleted | Toda vez que uma transferência é excluída no banco de dados. |
| transfer.db.updated | Toda vez que uma transferência é atualizada no banco de dados. |
| transfer.register.confirmed (descontinuado) | Toda vez que o registro de uma transferência na instituição financeira é confirmado. |
| transfer.register.error (descontinuado) | Toda vez que ocorrer um erro no registro de uma transferência na instituição financeira. |
| transfer.register.failed (descontinuado) | Toda vez que o registro de uma transferência na instituição financeira falha. |
| transfer.register.requested (descontinuado) | Toda vez que o registro de uma transferência na instituição financeira é solicitado. |
| transfer.reschedule.confirmed (descontinuado) | Toda vez que um reagendamento de uma transferência é confirmado. |
| transfer.reschedule.error (descontinuado) | Toda vez que ocorrer um erro no reagendamento de uma transferência. |
| transfer.reschedule.failed (descontinuado) | Toda vez que um reagendamento de uma transferência falha. |
| transfer.reschedule.requested (descontinuado) | Toda vez que um reagendamento de uma transferência é solicitado. |
| transfer.transfer\_batch.approve.confirmed (descontinuado) | Toda vez que a aprovação de um Lote de transferência na instituição financeira é confirmada. |
| transfer.transfer\_batch.approve.error (descontinuado) | Toda vez que ocorrer um erro na aprovação de um lote de transferência na instituição financeira. |
| transfer.transfer\_batch.approve.failed (descontinuado) | Toda vez que a aprovação de um Lote de transferência na instituição financeira falha. |
| transfer.transfer\_batch.approve.requested (descontinuado) | Toda vez que a aprovação de um Lote de transferência na instituição financeira é solicitada. |
| transfer.transfer\_batch.awaiting\_approval (descontinuado) | Toda vez que a instituição financeira solicita aprovação ou rejeição de um Lote de transferência. |
| transfer.transfer\_batch.db.created (descontinuado) | Toda vez que um Lote de transferência é criado no banco de dados. |
| transfer.transfer\_batch.db.deleted (descontinuado) | Toda vez que um Lote de transferência é excluído no banco de dados. |
| transfer.transfer\_batch.db.updated (descontinuado) | Toda vez que um Lote de transferência é atualizado no banco de dados. |
| transfer.transfer\_batch.register.confirmed (descontinuado) | Toda vez que o registro de um Lote de transferência na instituição financeira é confirmado. |
| transfer.transfer\_batch.register.error (descontinuado) | Toda vez que ocorrer um erro no registro de um lote de transferência na instituição financeira. |
| transfer.transfer\_batch.register.failed (descontinuado) | Toda vez que o registro de um Lote de transferência na instituição financeira falha. |
| transfer.transfer\_batch.register.requested (descontinuado) | Toda vez que o registro de um Lote de transferência na instituição financeira é solicitado. |
| transfer.transfer\_batch.reprove.confirmed (descontinuado) | Toda vez que a rejeição de um Lote de transferência na instituição financeira é confirmada. |
| transfer.transfer\_batch.reprove.error (descontinuado) | Toda vez que ocorrer um erro na rejeição de um lote de transferência na instituição financeira. |
| transfer.transfer\_batch.reprove.failed (descontinuado) | Toda vez que a rejeição de um Lote de transferência na instituição financeira falha. |
| transfer.transfer\_batch.reprove.requested (descontinuado) | Toda vez que a rejeição de um Lote de transferência na instituição financeira é solicitada. |
| user.created | Toda vez que um usuário é criado. |
| user.deleted | Toda vez que um usuário é excluído. |
| user.updated | Toda vez que um usuário é atualizado. |
| webhook.db.created | Webhook criado. |
| webhook.db.deleted | Webhook excluído. |
| webhook.db.updated | Webhook atualizado. |
| withdrawal.requested | Toda vez que um saque é solicitado. |
| withdrawal.transferred | Toda vez que um saque é transferido. |

### Eventos de Pagamento e Transferência por Tipo

Além dos eventos listados acima, o sistema gera eventos específicos por tipo de pagamento e transferência. Esses eventos seguem uma estrutura combinatória e não aparecem individualmente na lista.

| Código | Descrição |
| --- | --- |
| payment.\{type\}.\{operation\}.\{status\} | Eventos de pagamento por tipo. Type: pix, bank\_billet, darf, tax, utility, gru. Operation: register, approve, reschedule, cancel. Status: requested, confirmed, failed, error. Exemplo: payment.pix.cancel.confirmed |
| payment.\{type\}\_batch.\{operation\}.\{status\} | Eventos de lote de pagamento por tipo. Type: pix\_batch, bank\_billet\_batch, darf\_batch, tax\_batch, utility\_batch, gru\_batch. Operation: register, approve, reprove. Também: awaiting\_approval |
| transfer.\{type\}.\{operation\}.\{status\} | Eventos de transferência por tipo. Type: ted, pix, internal. Operation: register, reschedule, approve, cancel. Status: requested, confirmed, failed, error. Exemplo: transfer.ted.register.confirmed |
| transfer.\{type\}\_batch.\{operation\}.\{status\} | Eventos de lote de transferência por tipo. Type: pix\_batch, ted\_batch, internal\_batch. Operation: register, approve, reprove. Também: awaiting\_approval |

### Evento Ping

O evento `ping` é um evento especial para testar se a URL do webhook está funcionando. Quando um webhook é criado uma notificação também é criado com o evento `ping`.

### Eventos Coringas

Ao configurar o webhook é possível se inscrever nos eventos acima e nos eventos coringas. Eventos coringas não são eventos que acontecem dentro do Kobana, eles são apenas representações de um conjunto de eventos para determinar que notificações o webhook deve receber.

| Código | Descrição |
| --- | --- |
| \* | Todos os eventos. Se o webhook estiver configurado para este evento, não é mais necessário configurar para nenhum outro evento e o seu sistema receberá notificação para todos os eventos que ocorrerem na Kobana. Além disso, o webhook estará configurado para receber todo e qualquer evento que venha ser implementado posteriormente. |
| access\_token.\* | Todos os eventos relacionados a tokens de acesso, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| account.\* | Todos os eventos relacionados a conta, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet.\* | Todos os eventos relacionados a boleto bancário, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet\_account.\* | Todos os eventos relacionados a carteiras de cobrança, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet\_discharge.\* | Todos os eventos relacionados a registros de retornos, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet\_payment.\* | Todos os eventos relacionados a recebimento de boleto, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet\_registration.\* | Todos os eventos relacionados a registro de boleto por API bancária, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| bank\_billet\_remittance.\* | Todos os eventos relacionados a registros de remessa, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| charge.\* | Todos os eventos relacionados a cobrança, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| credit.\* | Todos os eventos relacionados a restrição de crédito, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| customer.\* | Todos os eventos relacionados a clientes, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| customer\_subscription.\* | Todos os eventos relacionados a assinaturas, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| data.\* | Todos os eventos relacionados a consultas de dados (boleto e Pix via QR Code), inclusive os novos eventos que sejam implementados após a criação do webhook. |
| discharge.\* | Todos os eventos relacionados a retornos, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| edi.\* | Todos os eventos relacionados a EDI, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| email\_account.\* | Todos os eventos relacionados a contas de e-mail, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| enotas.\* | Todos os eventos relacionados a notas fiscais (eNotas), inclusive os novos eventos que sejam implementados após a criação do webhook. |
| export.\* | Todos os eventos relacionados a exportações, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| import.\* | Todos os eventos relacionados a importação, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| installment.\* | Todos os eventos relacionados a carnês, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| integration.\* | Todos os eventos relacionados a integrações e conexões, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| mailbox.\* | Todos os eventos relacionados a caixa postal, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| payment.\* | Todos os eventos relacionados a pagamentos e seus lotes, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| pix.\* | Todos os eventos relacionados a Pix, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| plan\_subscription.\* | Todos os eventos relacionados a planos, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| remittance.\* | Todos os eventos relacionados a remessas, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| transaction.\* | Todos os eventos relacionados a transações, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| transfer.\* | Todos os eventos relacionados a transferências e seus lotes, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| user.\* | Todos os eventos relacionados a usuário, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| webhook.\* | Todos os eventos relacionados a webhooks, inclusive os novos eventos que sejam implementados após a criação do webhook. |
| withdrawal.\* | Todos os eventos relacionados a saques, inclusive os novos eventos que sejam implementados após a criação do webhook. |
