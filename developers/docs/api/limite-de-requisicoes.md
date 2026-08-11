---
title: "Limite de Requisições"
---

Quando um cliente excede o limite associado à ele, as requisições seguintes são bloqueadas.

O servidor pode responder com informações sobre os limites utilizados e o tempo de espera necessário para enviar uma nova requisição.

Essas informações são anexadas aos cabeçalhos da resposta(headers).

| Header | Exemplo | Descrição |
| --- | --- | --- |
| ratelimit-limit | 60 | O limite de requisições para o cliente. |
| ratelimit-name | throttle\_authenticated\_web | Nome do throttle utilizado. |
| ratelimit-remaining | 0 | Número de requisições disponíveis. |
| ratelimit-reset | 1609844400 | [Unix time](https://en.wikipedia.org/wiki/Unix_time) - quando a contagem será reiniciada. |
| retry-after | 30 | Tempo em segundos até a contagem ser reiniciada. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) . |

Existem dois tipos de limites de requisições na API da Kobana, os limites de requisições `GET` e `POST`.

Em ambos os casos a contagem é feita por **hora**.

Pode ser realizado no máximo:

60 requisições hora `GET`

1000 requisições hora `POST`

Caso a sua operação precise de um número maior de requisições, fale com nosso suporte ou comercial.

O número de requisições feitas pelo usuário é zerada no primeiro minuto de cada hora.

A cada requisição realizada, o servidor retorna os cabeçalhos `ratelimit-limit` e `ratelimit-remaining` com o número de requisições permitidas e o número de requisições restantes para aquela hora.

Exemplo de Resposta em caso de sucesso

```http
Date: Fri, 05 Nov 2010 12:00:00 GMT
Content-Type: application/json; charset=utf-8
ratelimit-limit: 1000
ratelimit-remaining: 486
```

Caso atinja o número máximo de requisições dentro de uma hora, o servidor retorna o status `HTTP 429 Too Many Requests`.

Neste caso, você deve esperar o número de segundos retornado no header `retry-after` antes de realizar a próxima requisição.

Exemplo de Resposta em caso de bloqueio:

```http
HTTP/1.1 429 Too Many Requests
Date: Fri, 05 Nov 2010 12:00:00 GMT
Content-Type: application/json; charset=utf-8
ratelimit-limit: 1000
ratelimit-remaining: 0
ratelimit-reset: 3600
ratelimit-name: throttle_authenticated_web
retry-after: 3600
...

{error: "Limite de requisições POST por hora excedido para esse usuário."}
```

Referências:

[https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html](https://ietf-wg-httpapi.github.io/ratelimit-headers/draft-ietf-httpapi-ratelimit-headers.html)
