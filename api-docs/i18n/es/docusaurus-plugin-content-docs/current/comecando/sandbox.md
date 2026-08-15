---
title: "Sandbox"
description: "Comienza ahora a integrar en ambiente de sandbox y contrata solo cuando estés listo"
---

Comienza ahora a integrar en ambiente de sandbox y contrata solo cuando estés listo

Este es el ambiente para pruebas del uso de la API. Si no conoces qué es esto, lee sobre el [concepto de Sandbox en Wikipedia](http://en.wikipedia.org/wiki/Sandbox_(software_development)).

Por razones de seguridad, el ambiente de sandbox está en servidores completamente separados del ambiente de producción. Ningún dato es compartido entre los ambientes. Necesitas crear una cuenta en el ambiente de sandbox así como en el ambiente de Producción y cada cuenta tendrá sus datos aislados.

:::info

- El ambiente de sandbox tiene servidores con menos recursos y por eso es más lento que el ambiente de producción. No tengas en cuenta el desempeño de este ambiente.
- Los filtros de búsqueda en el ambiente sandbox en algunas pantallas pueden no funcionar por la limitación de recursos en el ambiente sandbox.

:::

La versión del sistema en el ambiente Sandbox siempre es la misma versión del ambiente de Producción.

# Comenzando

Para comenzar a utilizar el ambiente Sandbox, es necesario crear una cuenta en este ambiente.

[Crear cuenta en el ambiente de Sandbox](https://app-sandbox.kobana.com.br/users/sign_up)

Después de crear la cuenta, podrás utilizar el ambiente Sandbox de la misma forma que usarás el ambiente de Producción. Lee sobre autenticación para comenzar.

Ninguna validación de cuenta es realizada en este ambiente y poco después de la creación de la cuenta, ya conseguirás utilizar la API.

# Restricciones

El ambiente Sandbox no debe ser usado con el objetivo de realizar operaciones reales. Debe ser usado solo para probar la integración de tu sistema con la API de Kobana, sin afectar los datos de tu cuenta real.

:::info

El ambiente de Sandbox no se comunica con los bancos.

:::

Por ese motivo, este ambiente tiene algunas restricciones. Son estas:

## Generación de Boleto

- Agencia y Cuenta en los boletos generados serán alterados a 1 y 2.
- Las instrucciones para la caja en el boleto generado van con el mensaje: "SR(a) CAJA, NO AUTORIZAMOS RECIBIR ESTE BOLETO".
- Agencia y Cuenta en los envíos generados serán alterados a 1 y 2.
- Los boletos y envíos no deben ser utilizados para fines de homologación con el banco.

## Limpieza del ambiente

Por razones de seguridad, todos los datos se eliminarán automáticamente del ambiente de Sandbox los lunes, miércoles y viernes entre las 02:00 y 03:00 de la mañana en el horario de Brasilia.

## Eventos

Puedes simular los eventos para probar los webhooks.

## Boleto

En la pantalla de visualización del boleto puedes informar pago y marcar como vencido que solo se muestran en el ambiente sandbox, en la pantalla del boleto. De esta forma se generan los eventos `bank_billet.paid` y `bank_billet.overdue` para cada acción respectivamente.

## Pago

No pagues una cobranza generada por el ambiente Sandbox bajo ninguna hipótesis.

Al realizar login en el Ambiente de Sandbox es posible emular el pago de una cobranza.

## Fraude

Los códigos de barras de los boletos de prueba y los Códigos QR de Pix generados por el ambiente Sandbox no son válidos y no deben ser pagos bajo ninguna hipótesis.

El uso de cobrancias generadas en el ambiente de Sandbox es considerado fraude. Ninguna cobranza generada en este ambiente puede ser divulgada o enviada a terceros.

Es responsabilidad del cliente evitar que la cobranza generada en este ambiente sea divulgada en cualquier medio.
