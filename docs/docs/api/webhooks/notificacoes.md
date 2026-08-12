---
title: "Notificações"
---

Cada vez que um evento ocorre no sistema e um webhook está ativo e configurado para receber o evento, uma notificação é criada e entregue.

No menu **Integrações -\> Webhooks -\> Histórico**, você pode acompanhar as notificações e os detalhes da requisição.

![Histórico de webhooks enviados](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.41.20.png)

Esta área é muito útil para inspecionar o que aconteceu em cada caso.

Você encontrará as respostas que recebemos do seu servidor em caso de sucesso ou de  falhas.

![Detalhes do Webhook](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.43.17.png)

### Reenviando a notificação

Caso o seu sistema tenha dado algum erro e você deseje receber a notificação novamente, você pode reenviá-la através desta área usando o menu **Ações**.

![](/img/guias/api-webhooks-notificacoes/Screenshot_2023-03-30_at_16.48.23.png)

Quando você reenvia a notificação, as informações da requisição e da resposta, bem como duração são sobrescritas.

No momento do reenvio são usadas as configurações do webhook atuais, ou seja, se o endereço do webhook mudou entre o momento que a notificação foi criada e o momento que ela está sendo reenviada, o novo endereço será usado no reenvio.

É importante ressaltar que isso não é uma operação comum e deve ser usada apenas enquanto se desenvolve uma integração.
