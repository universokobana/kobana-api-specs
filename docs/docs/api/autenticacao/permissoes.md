---
title: "Permissões"
---

Quando autenticar o usuário com OAuth2, você pode especificar quais dados o token terá acesso através da escolha de um ou mais escopos de acesso.

### Escopos

Aqui está a lista de todos os escopos que você pode solicitar:

| Slug do Scope | Descrição |
| --- | --- |
| login | Autenticar com o usuário |
| all | Acesso completo a todos os recursos disponíveis |
| read | Consegue ler os dados, não consegue executar operações |
| write | Consegue executar operações relativas aos recursos liberados |
| email | Ver o endereço de e-mail |
| phone | Ver o telefone utilizado no cadastro |
| profile | Ver os dados básicos do perfil (nome e foto) |
| profile.legal | Ver os dados legais (nome civil e CPF) |
| profile.gender | Ver o gênero |
| profile.preferences | Ver as preferências (idiomas e fuso horário) |
| acbr.accounts | Gerenciar contas contábeis e integrações fiscais |
| admin.subaccounts | Gerenciar subcontas da conta principal |
| admin.users | Gerenciar usuários e permissões |
| automation.email\_accounts | Gerenciar contas de e-mail para automação |
| automation.email\_deliveries | Visualizar e gerenciar envios de e-mail |
| automation.sms\_accounts | Gerenciar contas de SMS |
| automation.sms\_deliveries | Visualizar e gerenciar envios de SMS |
| automation.webhook\_deliveries | Visualizar e gerenciar entregas de webhooks |
| automation.webhooks | Gerenciar webhooks e notificações automatizadas |
| billing.transactions | Visualizar transações de cobrança e faturamento |
| charge.automatic\_pix.accounts | Gerenciar contas de Pix automático |
| charge.automatic\_pix.locations | Gerenciar localizações de Pix automático |
| charge.automatic\_pix.pix | Gerenciar cobranças Pix automáticas |
| charge.automatic\_pix.recurrences | Gerenciar recorrências de Pix automático |
| charge.automatic\_pix.requests | Gerenciar solicitações de Pix automático |
| charge.bank\_billet\_accounts | Gerenciar contas de boletos bancários |
| charge.bank\_billet\_payments | Visualizar e registrar pagamentos de boletos |
| charge.bank\_billet\_registrations | Gerenciar registros de boletos nos bancos |
| charge.bank\_billets | Gerenciar boletos bancários |
| charge.customer\_subscriptions | Gerenciar assinaturas de clientes |
| charge.installments | Gerenciar parcelamentos |
| charge.payments | Visualizar e gerenciar pagamentos recebidos |
| charge.pix | Gerenciar cobranças Pix |
| charge.pix\_accounts | Gerenciar contas Pix |
| data.bank\_billet\_queries | Consultar informações de boletos bancários |
| core.providers | Gerenciar provedores do sistema (bancos e integrações) |
| crm.customers | Gerenciar clientes e informações comerciais |
| crm.people | Gerenciar pessoas e contatos |
| financial.accounts | Gerenciar contas financeiras |
| financial.balances | Visualizar saldos e movimentações financeiras |
| financial.providers | Gerenciar provedores financeiros e integrações bancárias |
| financial.statement\_transactions | Visualizar transações e extratos financeiros |
| integration.certificates | Gerenciar certificados digitais para integrações |
| integration.commands | Consultar comandos da conta |
| integration.connections | Gerenciar conexões com bancos e provedores |
| integration.discharges | Gerenciar arquivos de retorno bancário (baixas) |
| integration.edi\_boxes | Gerenciar caixas postais EDI para troca de arquivos |
| integration.remittances | Gerenciar arquivos de remessa bancária |
| mailbox.entries | Gerenciar caixas postais para recebimento de arquivos |
| mailbox.files | Visualizar e gerenciar arquivos nas caixas postais |
| partner.bank\_contracts | Gerenciar contratos bancários com parceiros |
| payment.accounts | Gerenciar contas de pagamento |
| payment.bank\_billets | Efetuar pagamentos de boletos bancários |
| payment.batches | Gerenciar lotes de pagamentos |
| payment.darfs | Efetuar pagamentos de DARFs (tributos federais) |
| payment.payments | Gerenciar todos os tipos de pagamentos através da API |
| payment.pix | Efetuar pagamentos via Pix |
| payment.taxes | Efetuar pagamentos de impostos e taxas |
| payment.dda\_accounts | Gerenciar contas DDA (Débito Direto Autorizado) |
| payment.dda.bank\_billets | Visualizar e gerenciar boletos DDA disponíveis para pagamento |
| payment.utilities | Efetuar pagamentos de contas de consumo (água, luz, etc) |
| security.access\_tokens | Gerenciar tokens de acesso e autenticação |
| system.events | Visualizar eventos e logs do sistema |
| system.imports | Gerenciar importações de dados |
| system.reports | Gerar e visualizar relatórios do sistema |
| transfer.accounts | Gerenciar contas de transferência |
| transfer.batches | Gerenciar lotes de transferências |
| transfer.internal | Realizar transferências internas entre contas |
| transfer.pix | Realizar transferências via Pix |
| transfer.ted | Realizar transferências TED (Transferência Eletrônica Disponível) |
| transfer.transfers | Gerenciar todos os tipos de transferências (Pix, TED, Internas) via endpoint unificado |

### OAuth2

Para OAuth2, permissões são acessadas através do parâmetro `scope` em sua requisição OAuth2.

Por exemplo, sua aplicação pode precisar logar como o usuário para gerar boletos, porém não precisará saber quais são os dados bancários do usuário.

A permissão padrão é `login` caso você não especifice um scope.

#### Grupo de permissões

Você pode solicitar permissões individuais ou em grupo.

Permissões em grupo devem ser separadas com caracter `+` na URL.

Abaixo um exemplo de URL de requisição com parâmetro `scope` no final:

```html
[https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile](https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile)
```
