---
title: "Introdução"
description: "Você que é dev, divirta-se! ✨"
---

Você que é dev, divirta-se! ✨

## Formato

A API aceita apenas o formato `JSON`, sendo assim todas as requisições usam content type `application/json`.

| Tipo de Campo | Formato |
| --- | --- |
| **DateTime** | Formato [ISO8601](https://pt.wikipedia.org/wiki/ISO_8601) <br />Exemplos <br />Data: 2022-01-24 <br />Data e Hora: 2022-01-24 10:07Z |

## Convenções

Utilizamos as seguintes convenções nesta documentação:

| Convenção | Descrição |
| --- | --- |
| **:variable** | Indica o nome de uma variável que precisa ser substituída em uma URL. |
| **#\{variable\}** | Indica o nome de uma variável que precisa ser substituída por valores da sua conta. |
| **...** | Indica o conteúdo da resposta de uma requisição, que foi truncado para facilitar a leitura da documentação. |
| $KOBANA\_TOKEN | Indica o Token de Acesso e está neste formato para facilitar os testes na linha de comando. Supondo que o seu token é "zjuio96wkixkzy6z98sy", você pode rodar o comando abaixo e posteriormente copiar e colar os comandos desta documentação no terminal. <br />`export KOBANA_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx` |

## Códigos de Retorno

A API retorna os códigos de resposta HTTP. Estas são as informações mais relevantes:

| Código | Descrição |  |
| --- | --- | --- |
| ✅ | **200 OK** | A chamada foi bem sucedida e o corpo da resposta possui conteúdo. |
| ✅ | **201 Created** | O recurso foi criado com sucesso. |
| ✅ | **204 No Content** | A chamada foi bem sucedida mas o corpo da resposta não tem conteúdo |
| ❌ | **400 Bad Request** | A requisição é inválida, em geral conteúdo mal formado. |
| ❌ | **401 Unauthorized** | O usuário e senha ou token de acesso são inválidos. |
| ❌ | **403 Forbidden** | O acesso à API está bloqueado ou o usuário está bloqueado. |
| ❌ | **404 Not Found** | O endereço acessado não existe. |
| ❌ | **422 Unprocessable Entity** | A requisição é válida, mas os dados passados não são válidos. |
| ❌ | **429 Too Many Requests** | O usuário atingiu o limite de requisições. |
| ❌ | **500 Internal Server Error** | Houve um erro interno do servidor ao processar a requisição. Consulte o [status dos servidores](https://status.kobana.com.br) . |

Se deseja saber mais sobre retornos de erros e códigos de erros especificos acessar a página [Erros](/api/overview/errors)

## ID das Requisições (Request ID)

Cada solicitação de API tem um identificador de solicitação associado. Você pode encontrar esse valor no cabeçalho `Request-Id` de cada resposta da API.

Essa informação é útil para depurar erros e ter mais segurança em todas as operações. Você pode consultar as requisições e seus IDs no painel do sistema.

O log de requisições fica disponível pelo período de 30 dias.

Se você precisar entrar em contato conosco sobre uma solicitação específica, fornecer o identificador da solicitação garantirá a resolução mais rápida possível.

## Segurança

A API da Kobana utiliza certificados SSL 2048 bits.

Toda requisição realizada através da API deve utilizar o protocolo HTTPS pois estará passando informações de autenticação no cabeçalho da requisição.

As requisições realizadas na porta 80, serão automaticamente redirecionadas para a porta 443. Esta medida garante que nenhuma requisição realizada na API estará fora do protocolo seguro.

Todas as requisições realizadas nos servidore da Kobana serão criptografadas.

Assim, as aplicações que se conectam em nossa API precisam estar prontas para se comunicar através dos protocolos `TLSv1.2` ou `TLSv1.3` usando uma das seguintes cifras:

TLS\_AES\_128\_GCM\_SHA256

TLS\_AES\_256\_GCM\_SHA384

TLS\_CHACHA20\_POLY1305\_SHA256

ECDHE-RSA-AES128-GCM-SHA256

ECDHE-RSA-AES128-SHA256

ECDHE-RSA-AES256-GCM-SHA384

ECDHE-RSA-CHACHA20-POLY1305

ECDHE-RSA-AES256-SHA384

Por questões de segurança não suportamos conexões via protocolo `TLSv1` e `TLSv1.1`.

## Cache HTTP

Você deve fazer uso dos cabeçalhos HTTP de cache para diminuir a

carga em nossos servidores (e aumentar a velocidade do seu aplicativo!).

A maioria dos retornos das requisições irão incluir um header `ETag`

ou `Last-Modified`. Quando você solicitar um recurso pela primeira vez,

armazene esse valor e nos envie de volta nas requisições seguintes

nos headers `If-None-Match` e `If-Modified-Since`. Se o recurso não

foi alterado, você receberá uma resposta com o header `304 Not Modified`,

o que economiza tempo e largura de banda, por

evitar de te enviar os dados que você já tem.

[Mais informações sobre Cache HTTP (em inglês)](http://www.mnot.net/cache_docs/)

## Tratamento de Erros

Se os nossos servidores estiverem com problema, sua requisição receberá um retorno de erro com status 5xx.

Erro 500 significa que a aplicação está completamente indisponível,

mas você pode receber também outros erros

da família 500 em casos específicos, tais como `502 Bad Gateway`,

`503 Service Unavailable` ou `504 Gateway Timeout`.

É de sua responsabilidade identificar o erro e lidar com esses

casos, fazendo com que o aplicativo tente enviar

a requisição novamente depois de alguns minutos.

Nós temos uma página que informa o status dos servidores da Kobana em

[https://status.kobana.com.br/](https://status.kobana.com.br/)
