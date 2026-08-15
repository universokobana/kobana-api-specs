---
title: "Permisos"
---

Cuando autenticas al usuario con OAuth2, puedes especificar qué datos tendrá acceso el token a través de la elección de uno o más alcances de acceso.

### Alcances

Aquí está la lista de todos los alcances que puedes solicitar:

| Slug del Alcance | Descripción |
| --- | --- |
| login | Autenticarse con el usuario |
| all | Acceso completo a todos los recursos disponibles |
| read | Puede leer los datos, no puede ejecutar operaciones |
| write | Puede ejecutar operaciones relativas a los recursos liberados |
| email | Ver la dirección de correo electrónico |
| phone | Ver el teléfono utilizado en el registro |
| profile | Ver los datos básicos del perfil (nombre y foto) |
| profile.legal | Ver los datos legales (nombre civil y CPF) |
| profile.gender | Ver el género |
| profile.preferences | Ver las preferencias (idiomas y zona horaria) |
| acbr.accounts | Gestionar cuentas contables e integraciones fiscales |
| admin.subaccounts | Gestionar subcuentas de la cuenta principal |
| admin.users | Gestionar usuarios y permisos |
| automation.email_accounts | Gestionar cuentas de correo electrónico para automatización |
| automation.email_deliveries | Ver y gestionar envíos de correo electrónico |
| automation.sms_accounts | Gestionar cuentas de SMS |
| automation.sms_deliveries | Ver y gestionar envíos de SMS |
| automation.webhook_deliveries | Ver y gestionar entregas de webhooks |
| automation.webhooks | Gestionar webhooks y notificaciones automatizadas |
| billing.transactions | Ver transacciones de cobranza y facturación |
| charge.automatic_pix.accounts | Gestionar cuentas de Pix automático |
| charge.automatic_pix.locations | Gestionar ubicaciones de Pix automático |
| charge.automatic_pix.pix | Gestionar cobros de Pix automáticos |
| charge.automatic_pix.recurrences | Gestionar recurrencias de Pix automático |
| charge.automatic_pix.requests | Gestionar solicitudes de Pix automático |
| charge.bank_billet_accounts | Gestionar cuentas de boletos bancarios |
| charge.bank_billet_payments | Ver y registrar pagos de boletos |
| charge.bank_billet_registrations | Gestionar registros de boletos en los bancos |
| charge.bank_billets | Gestionar boletos bancarios |
| charge.customer_subscriptions | Gestionar suscripciones de clientes |
| charge.installments | Gestionar cuotas |
| charge.payments | Ver y gestionar pagos recibidos |
| charge.pix | Gestionar cobros de Pix |
| charge.pix_accounts | Gestionar cuentas de Pix |
| data.bank_billet_queries | Consultar información de boletos bancarios |
| core.providers | Gestionar proveedores del sistema (bancos e integraciones) |
| crm.customers | Gestionar clientes e información comercial |
| crm.people | Gestionar personas y contactos |
| financial.accounts | Gestionar cuentas financieras |
| financial.balances | Ver saldos y movimientos financieros |
| financial.providers | Gestionar proveedores financieros e integraciones bancarias |
| financial.statement_transactions | Ver transacciones y extractos financieros |
| integration.certificates | Gestionar certificados digitales para integraciones |
| integration.commands | Consultar comandos de la cuenta |
| integration.connections | Gestionar conexiones con bancos y proveedores |
| integration.discharges | Gestionar archivos de devolución bancaria (bajas) |
| integration.edi_boxes | Gestionar buzones EDI para intercambio de archivos |
| integration.remittances | Gestionar archivos de remesa bancaria |
| mailbox.entries | Gestionar buzones para recibimiento de archivos |
| mailbox.files | Ver y gestionar archivos en los buzones |
| partner.bank_contracts | Gestionar contratos bancarios con socios |
| payment.accounts | Gestionar cuentas de pago |
| payment.bank_billets | Realizar pagos de boletos bancarios |
| payment.batches | Gestionar lotes de pagos |
| payment.darfs | Realizar pagos de DARFs (impuestos federales) |
| payment.payments | Gestionar todos los tipos de pagos a través de la API |
| payment.pix | Realizar pagos por Pix |
| payment.taxes | Realizar pagos de impuestos y tasas |
| payment.dda_accounts | Gestionar cuentas DDA (Débito Directo Autorizado) |
| payment.dda.bank_billets | Ver y gestionar boletos DDA disponibles para pago |
| payment.utilities | Realizar pagos de cuentas de consumo (agua, luz, etc) |
| security.access_tokens | Gestionar tokens de acceso y autenticación |
| system.events | Ver eventos y registros del sistema |
| system.imports | Gestionar importaciones de datos |
| system.reports | Generar y ver informes del sistema |
| transfer.accounts | Gestionar cuentas de transferencia |
| transfer.batches | Gestionar lotes de transferencias |
| transfer.internal | Realizar transferencias internas entre cuentas |
| transfer.pix | Realizar transferencias por Pix |
| transfer.ted | Realizar transferencias TED (Transferencia Electrónica Disponible) |
| transfer.transfers | Gestionar todos los tipos de transferencias (Pix, TED, Internas) a través del endpoint unificado |

### OAuth2

Para OAuth2, los permisos se acceden a través del parámetro `scope` en tu solicitud OAuth2.

Por ejemplo, tu aplicación puede necesitar iniciar sesión como el usuario para generar boletos, pero no necesitará saber cuáles son los datos bancarios del usuario.

El permiso predeterminado es `login` si no especificas un alcance.

#### Grupo de permisos

Puedes solicitar permisos individuales o en grupo.

Los permisos en grupo deben separarse con el carácter `+` en la URL.

A continuación hay un ejemplo de URL de solicitud con el parámetro `scope` al final:

```html
[https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile](https://api-sandbox.kobana.com.br/v1/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=login+email+profile)
```
