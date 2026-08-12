---
title: "Webhooks"
---

Webhooks permitem que sistemas externos recebam notificações de todos os eventos que ocorrem no sistema.

Quando um evento acontece, o sistema envia uma requisição `HTTP POST` para a URL configurada no webhook com as informações relativas ao evento.

Os webhooks também são chamados de `Callbacks` ou `Reverse API`.

### Funcionamento

Quando um evento é disparado dentro da Kobana, são geradas notificações para cada webhook que esteja configurado para receber o tal evento.

Essas notificações geram automaticamente uma requisição que é realizada na URL configurada no webhook. A Kobana mantém o registro de todas as requisições geradas, bem como as informações da requisição (Request) e da resposta do servidor externo (Response).

Ao receber a notificação, você nos responde confirmando o recebimento.

#### Requisição

Além dos cabeçalhos normais de uma requisição `HTTP POST`, os seguintes cabeçalhos são enviados:

| Cabeçalho | Descrição |
| --- | --- |
| **X-Kobana-Event** | [Código do evento](/api/webhooks/eventos) que gerou essa notificação. |
| **X-Kobana-Delivery-Id** | ID único da notificação, no formato [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) . |
| **X-Kobana-Environment** | Ambiente de onde a notificação foi disparada ( `production` ou `sandbox` ). |
| **X-Kobana-Signature** | [Assinatura de segurança](/api/webhooks/seguranca) , para você verificar que a chamada saiu realmente dos servidores da Kobana. |
| ~~X-BoletoSimples-Event~~ (DEPRECIADO) | [Código do evento](/api/webhooks/eventos) que gerou essa notificação. |
| ~~X-BoletoSimples-Delivery-Id~~ (DEPRECIADO) | ID único da notificação, no formato [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) . |
| ~~X-BoletoSimples-Environment(~~DEPRECIADO) | Ambiente de onde a notificação foi disparada ( `production` ou `sandbox` ). |
| ~~X-Hub-Signature~~ (DEPRECIADO) | [Assinatura de segurança](/api/webhooks/seguranca) , para você verificar que a chamada saiu realmente dos servidores da Kobana. |

Devido às diferentes formas de tratamento dos Headers por servidores, browsers e libs das diversas linguagens existentes, não podemos garantir que os headers sempre cheguem em CamelCase e portanto esteja preparado para receber no formato case-insensitive conforme [RFC7230](https://www.rfc-editor.org/rfc/rfc7230#section-3.2).

```bash
POST /15a0nqn1 HTTP/1.1

Host: requestb.in
X-Kobana-Delivery-Id: 94d4eab5-787a-4209-8282-5bc1398575ab
X-Kobana-Signature: sha256=0ac0bc270389d3836a86f0141c7657f58e05076805c852c584e700389df09c0e
X-Kobana-Event: ping
X-Kobana-Environment: sandbox
Total-Route-Time: 0
X-Request-Id: 8ed758bd-3351-4724-aaa6-2ad550c3f0c7
User-Agent: Kobana-Robot (sandbox)
Content-Type: application/json
Via: 1.1 vegur
Content-Length: 77
Connect-Time: 1
Connection: close

{
  "ping": "pong",
  "event_code": "ping",
  "webhook": {
    "id": 11,
    "url": "https://requestb.in"
  }
}
```

#### Considerações

Algumas considerações em relação aos Webhooks:

- Os Webhooks podem ser enviados fora de ordem;
- O mesmo Webhook poderá ser enviado múltiplas vezes, inclusive manualmente e você deve estar preparado para isso (principalmente nos eventos de pagamento, a fim de evitar duplicidade);
- Garantimos que o Webhook será enviado pelo menos uma vez;
- A Kobana pode adicionar novos eventos a qualquer momento e isso não será considerado como quebra de compatibilidade;
- A Kobana pode adicionar novos atributos no payload do Webhook a qualquer momento e isso não será considerado como quebra de compatibilidade;
- A Kobana **NÃO** pode remover um atributo do payload do Webhook sem notificação prévia;
- Você deveria usar SSL/TLS nas URLs configuradas no Webhook. Seu servidor deve responder com toda a cadeia de certificados incluíndo os intermediários. Você pode checar sua URL em ferramentas como essa [Qualys SSL labs](https://www.ssllabs.com/ssltest/);
- Todos os Webhook enviados poderão ser vistos no painel de histórico de Webhooks enviados([Exceto fora do período de retenção](/legal/retencao-de-dados));

:::danger[Atenção]

**NÃO** faça processamento do payload enviado no momento do recebimento do Webhook.

O recebimento sempre deve ser respondido **de forma imediata** com status code **200**.

Você deve salvar o payload enviado por nós em um Banco de Dados, Redis, Kafka, Rabbitmq ou qualquer outro serviço que sua aplicação faça uso. Respondendo com **200** logo em seguida. Esse processo todo, idealmente, deve levar milissegundos.

Somente após a resposta afirmativa do recebimento é que o payload deve ser processado.

:::

Salvar o payload também se torna importante para que você tenha seu histórico armazenado para futuras consultas.

Temos uma [política de retenção de dados](/legal/retencao-de-dados) e ao longo do tempo, iremos remover os eventos e envios relacionados a ele a medida que estiverem fora do prazo de nossa guarda.

#### Resposta (STATUS CODES)

- Webhooks devem ser respondidos **de forma imediata** com status code `200 OK`.
- Não responda com outros códigos como por exemplo 422, 404 e etc, isso indica que você está realizando o processamento do payload antes de nos responder, o que é uma má prática.
- Webhooks com assinatura de segurança inválida devem retornar `498 Token Invalid`.
- Webhooks com eventos desconhecidos/não esperados por você, devem ser ignorados e podem retornar com `204 No Content`.

Todas as outras informações retornadas no cabeçalho ou no conteúdo da resposta serão ignoradas, porém são armazenadas.

Nós guardamos os cabeçalhos e o conteúdo da resposta. Por esse motivo é importante que **nenhuma informação sigilosa** seja retornada nas requisições de notificação dos Webhooks.

#### Falhas e Retentativas

:::danger[Atenção]

Nossa plataforma de envios de webhooks aguardará apenas **5 segundos** por uma resposta do seu servidor.

O envio será cancelado após esse tempo, marcado como uma falha e retornará erro de timeout.

:::

A Kobana fará a retentativa de entrega do Webhook caso o seu servidor retorne com os seguintes erros e apenas estes:

- 500 - Indica que o seu servidor está instável no momento;
- Timeouts -  Indica que o seu servidor não respondeu no tempo esperado(máximo de 5 segundos);
- Erros de SSL/TLS - Indica que o certificado do seu servidor não está válido;

Nós tentaremos o reenvio por até 7 vezes, aumentando o intervalo de tempo entre as tentativas.

As tentativas levarão aproximadamente 9 horas para serem concluídas.

Todas as vezes que uma nova tentativa de envio falhar, fará com que a prioridade de envio caia em nossas listas de prioridades de envios.

Matenha as boas práticas para evitar transtornos no seu dia a dia.

Você poderá ver os webhooks enviados no painel dentro da Kobana e tentar o reenvio manual caso seja necessário.
