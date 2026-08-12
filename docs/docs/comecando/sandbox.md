---
title: "Sandbox"
description: "Comece agora a integrar em ambiente de sandbox e contrate apenas quando estiver pronto"
---

Comece agora a integrar em ambiente de sandbox e contrate apenas quando estiver pronto

Este é o ambiente para testes do uso da API. Se você não conhece o que é isso, leia sobre o [conceito de Sandbox na Wikipedia](http://en.wikipedia.org/wiki/Sandbox_(software_development)).

Por questões de segurança, o ambiente de sandbox está em servidores completamente separados do ambiente de produção . Nenhum dado é compartilhado entre os ambientes. Você precisa criar uma conta no ambiente de sandbox bem como no ambiente de Produção e cada conta terá seus dados isolados.

:::info

- O ambiente de sandbox possui servidores com menos recursos e por isso é mais lento que o ambiente de produção. Não leve em conta a performance deste ambiente.
- Os filtros de pesquisa no ambiente sandbox em algumas telas podem não funcionar pela questão de limitação de recursos no ambiente sandbox.

:::

A versão do sistema no ambiente Sandbox é sempre a mesma versão do ambiente de Produção.

# Começando

Para começar a utilizar o ambiente Sandbox, é necessário criar uma conta neste ambiente.

[Criar conta no ambiente de Sandbox](https://app-sandbox.kobana.com.br/users/sign_up)

Após criar a conta, você poderá utilizar o ambiente Sandbox da mesma forma que usará o ambiente de Produção. Leia sobre autenticação para começar.

Nenhuma validação de conta é realizada neste ambiente e logo após a criação da conta, você já conseguirá utilizar a API.

# Restrições

O ambiente Sandbox não deve ser usado com o objetivo de realizar operações reais. Ele deve ser usado apenas para testar a integração de seu sistema com a API da Kobana, sem afetar os dados da sua conta real.

:::info

O ambiente de Sandbox não se comunica com os bancos.

:::

Por esse motivo, este ambiente possui algumas restrições. São elas:

## Geração de Boleto

- Agência e Conta nos boletos gerados serão alterados para 1 e 2.
- As instruções para o caixa no boleto gerado vão com a mensagem: “SR(a) CAIXA, NÃO AUTORIZAMOS RECEBER ESTE BOLETO”.
- Agência e Conta nas remessas geradas serão alterados para 1 e 2.
- Boletos e remessas não devem ser utilizados para fins de homologação junto ao banco.

## Limpeza do ambiente

Por motivos de segurança, todos os dados são excluídos automaticamente do ambiente de Sandbox nas segundas, quartas e sextas-feiras entre 02:00 e 03:00 da manhã do horário de Brasília.

## Eventos

Você pode simular os eventos para testar s webhooks.

## Boleto

Na tela de visualização do boleto você pode informar pagamento e marcar como vencido que somente são apresentados no ambiente sandbox, na tela do boleto. Dessa forma são gerados os eventos `bank_billet.paid` e `bank_billet.overdue` para cada ação respectivamente.

## Pagamento

Não pague uma cobrança gerada pelo ambiente Sandbox sob nenhuma hipótese.

Ao realizar login no Ambiente de Sandbox é possível emular o pagamento de uma cobrança.

## Fraude

Os códigos de barras dos boletos de teste e os QR Code dos PIX gerados pelo ambiente Sandbox não são válidos e não devem ser pagos sob nenhuma hipótese.

O uso de cobranças geradas no ambiente de Sandbox é considerado fraude. Nenhuma cobrança gerada neste ambiente pode ser divulgado ou enviado para terceiros.

É de responsabilidade do cliente evitar que a cobrança gerada neste ambiente seja divulgada em qualquer meio.
