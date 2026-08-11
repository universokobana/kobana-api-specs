---
title: "User-Agent"
description: "Esse cabeçalho é opcional em todas as requisições"
---

Esse cabeçalho é opcional em todas as requisições

Você pode incluir o cabeçalho `User-Agent` com o nome da sua aplicação e um endereço de e-mail válido, para que possamos entrar em contato caso:

1. Você esteja fazendo algo errado, e possamos avisá-lo antecipadamente antes de você ser bloqueado;
2. Esteja fazendo algo muito legal, e possamos dar-lhe os parabéns :)

Segue um Exemplo:

`User-Agent: Meu e-Commerce ([email protected])`

Exemplo de como passar esse cabeçalho usando o cURL:

```bash
curl -i \
-H "Authorization: Bearer TOKEN" \
-H 'Content-Type: application/json' \
-H 'User-Agent: Meu e-Commerce (meuecommerce@example.com)' \
-X GET 'https://api-sandbox.kobana.com.br/v1/userinfo'
```
