---
title: "Idempotência"
---

A API oferece suporte à idempotência para repetir solicitações com segurança sem executar acidentalmente a mesma operação duas vezes. Isso é útil quando uma chamada de API é interrompida em trânsito e você não recebe uma resposta. Por exemplo, se uma solicitação para criar uma cobrança não responder devido a um erro de conexão de rede, você poderá tentar novamente a solicitação com a mesma chave de idempotência para garantir que não seja criada mais de uma cobrança.

Para executar uma solicitação idempotente, forneça um cabeçalho `X-Idempotency-Key: <key>` adicional à solicitação.

Exemplo de Requisição:

```bash
curl -i \
-H "Authorization: Bearer $KOBANA_TOKEN" \
-d '{"bank_billet":{"amount":12.34, "expire_at": "2021-11-15", "description": "Prestação de Serviço", "customer_person_name": "Nome do Cliente", "customer_cnpj_cpf": "125.812.717-28", "customer_zipcode": "12312123", "customer_address": "Rua quinhentos", "customer_city_name": "Rio de Janeiro", "customer_state": "RJ", "customer_neighborhood": "bairro"}}' \
-H 'Content-Type: application/json' \
-H 'X-Idempotency-Key: 4wE7HVG5rW3R7Xg1' \
-H 'User-Agent: MyApp (myapp@example.com)' \
-X POST 'https://api-sandbox.kobana.com.br/v1/bank_billets'
```

A idempotência da Kobana funciona salvando o código de status resultante e o corpo da primeira solicitação feita para qualquer chave de idempotência, independentemente de ter sido bem-sucedida ou falhada. Solicitações subsequentes com a mesma chave retornam o mesmo resultado, incluindo erros `500`.

Uma chave de idempotência é um valor único gerado pelo cliente que o servidor usa para reconhecer tentativas subsequentes da mesma solicitação. Como você cria chaves exclusivas depende de você, mas sugerimos usar `UUIDs V4` ou outra string aleatória com entropia suficiente para evitar colisões.

As chaves de idempotência podem ter até 255 caracteres.

As chaves são qualificadas para serem removidas do sistema automaticamente após terem pelo menos 24 horas de uso, e uma nova solicitação será gerada se uma chave for reutilizada após a remoção da original. A camada de idempotência compara os parâmetros de entrada com os da solicitação original e os erros, a menos que sejam os mesmos para evitar o uso indevido acidental.

Os resultados são salvos apenas se um endpoint de API começou a ser executado. Se os parâmetros de entrada falharem na validação ou a solicitação entrar em conflito com outra que estava sendo executada simultaneamente, nenhum resultado idempotente será salvo porque nenhum endpoint da API iniciou a execução. É seguro repetir essas solicitações.

Todas as solicitações `POST`, `PUT` e `PATCH` aceitam chaves de idempotência. O envio de chaves de idempotência em solicitações `GET` e `DELETE` não tem efeito e deve ser evitado, pois essas solicitações são idempotentes por definição.
