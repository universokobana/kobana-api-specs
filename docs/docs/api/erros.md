---
title: "Códigos de Erros"
---

Quando há um erro, a api da Kobana retorna um objeto com o máximo de informações descritivas que pudermos. Uma lista de códigos de erro comuns pode ser encontrada abaixo.

| Código do Erro | Código Status Resposta Http | Descrição |
| --- | --- | --- |
| not\_found | 404 | Não foi possível encontrar o registro. Este registro não existe, ou foi deletado. |
| forbidden | 403 | Operação não autorizada. O acesso à API está bloqueado ou o usuário está bloqueado. |
| unprocessable\_entity | 422 | A requisição é válida, mas os dados passados não são válidos. |
| bad\_request | 400 | Requisição mal formatada |
| unauthorized | 401 | Token de API inválido. O Token de API é diferente para cada Servidor/URL, mais em [Token de Acesso](/api/autenticacao/token-de-acesso) |
| destroy\_pix\_bank\_billet | 422 | Não é possível excluir um Pix associado a um Boleto. |
| destroy\_pix\_opened | 422 | Não é possível excluir um Pix em aberto. |
| change\_pix\_already\_canceled | 422 | Não é possível alterar uma cobrança Pix que já foi cancelada. |
| change\_pix\_expired | 422 | Não é possível alterar uma cobrança Pix que já expirou. |
| invalid\_get\_param | 400 | Parâmetro GET inválido |

```json
{
  "status": 404,
  "errors": [
    {
      "title": "Não foi possível encontrar o registro",
      "code": "not_found",
      "detail": "Este registro não existe, ou foi deletado."
    }
  ]
}
```
