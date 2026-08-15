---
title: "Postman"
description: "Coleção do Postman para testar a API"
---

Coleção do Postman para testar a API

Se você gosta mais de usar o Postman, pode usar as coleções que preparamos por lá.

![](/img/guias/api-postman/kobana-postman.png)

## Time

[universokobana](https://www.postman.com/universokobana)

## Workspace

[kobana-api](https://www.postman.com/universokobana/kobana-api/overview)

## Coleções

| Coleção | Endereço |
| --- | --- |
| KOBANA API v1.0 | [https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0](https://www.postman.com/universokobana/kobana-api/collection/lebcq32/kobana-api-v1-0) |
| KOBANA API v2.0 | [https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0](https://www.postman.com/universokobana/kobana-api/collection/sfql4s0/kobana-api-v2-0) |

## Usando

1. Vá em Environments e selecione o ambiente que deseja conectar
2. Defina o tipo da variável `token` para `secret`

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-environment.png)
3. Pegue o token da Kobana em Integrações \> API Kobana \> Token de API
4. Salve o token no campo `Current value`. Clique em `Save` (ou aperte CRTL + S)
5. Vá em `Collections > KOBANA API v1.0` e clique na aba `Authorization`
6. Seleciona o environment onde você salvou o token no canto superior direito, onde tem escrito `No environment`.
7. Selecione `Bearer Token` e preencha no campo Token o valor `{{token}}`. Clique em `Save` (ou aperte CRTL + S)
8. Vá em `v1/userinfo` → Informações do Usuário
9. Clique em `Send` e verá as informações do seu usuário na resposta da chamada.

   ![](/img/guias/api-postman/screencapture-postman-universokobana-kobana-api-request-n9tp.png)
