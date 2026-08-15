---
title: "Autenticação"
description: "Para você começar rapidamente e fazer sua primeira requisição."
---

Para você começar rapidamente e fazer sua primeira requisição.

Nós oferecemos três formas de autenticação para acessar a API da Kobana:

| Método | Caso de Uso |
| --- | --- |
| [Token de Acesso](/api/overview/authentication/access-token) | Acessar sua própria conta. |
| [Fluxo Authorization Code](/api/overview/authentication/authorization-flow) | Permite conseguir permissões para acessar contas de terceiros. |
| [Fluxo Client Credentials](/api/overview/authentication/client-credentials-flow) | Permite conseguir um token a partir de uma aplicativo OAuth |

## Segurança

SALVE AS CREDENCIAIS DE FORMA SEGURA!

Você deve se preocupar em como guardar as credenciais que você consegue de forma segura.

Se alguém obtém o access\_token com permissões, eles poderão acessar informações particulares suas e dos seus clientes.

Nunca salve suas credenciais junto ao seu código fonte ou em seu banco de dados à menos que estejam criptografadas.

Separar as credencias do seu código fonte e do banco de dados são excelentes práticas a serem adotadas.
