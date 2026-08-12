---
title: "Itaú"
---

| Carteiras | Slug |
| --- | --- |
| 104 | itau-bs-104 |
| 108 | itau-bs-108 |
| 109 | itau-bs-109 |
| 112 | itau-bs-112 |
| 115 | itau-bs-115 |
| 138 | itau-bs-138 |
| 156 | itau-bs-156 |
| 157 | itau-bs-157 |
| 158 | itau-bs-158 |
| 171 | itau-bs-171 |
| 174 | itau-bs-174 |
| 175 | itau-bs-175 |
| 176 | itau-bs-176 |
| 178 | itau-bs-178 |
| 179 | itau-bs-179 |
| 181 | itau-bs-181 |
| 195 | itau-bs-195 |
| 196 | itau-bs-196 |
| 198 | itau-bs-198 |

### Ocorrências

#### CNAB 240

| Nosso Código | Descrição | Suporte Banco | Suporte Kobana |
| --- | --- | --- | --- |
| 1001 | Remessa | Sim | Sim |
| 1002 | Pedido de baixa | Sim | Sim |
| 1003 | Alteração de vencimento | Sim | [Veja tabela](https://ajuda.kobana.com.br/pt-BR/articles/8843278-posso-alterar-a-data-de-vencimento-e-o-valor-de-um-boleto-ja-emitido) |
| 1004 | Concessão de abatimento | Sim | Não |
| 1005 | Cancelamento de abatimento | Sim | Sim |
| 1009 | Protestar | Sim | Sim |
| 1010 | Não protestar | Sim | Sim |
| 1018 | Sustar o protesto | Sim | Sim |
| 1028 | Alterar Valor | Sim | [Veja tabela](https://ajuda.kobana.com.br/pt-BR/articles/8843278-posso-alterar-a-data-de-vencimento-e-o-valor-de-um-boleto-ja-emitido) |
| 1031 | Alteração de outros dados | Sim | Não |
| 1109 | Exclusão de sacador avalista | Sim | Não |
| 1112 | Beneficiário não concorda com a alegação do pagador | Sim | Não |

#### CNAB 400

| Nosso Código | Descrição | Suporte Banco | Suporte Kobana |
| --- | --- | --- | --- |
| 1001 | Remessa | Sim | Sim |
| 1002 | Pedido de baixa | Sim | Sim |
| 1003 | Alteração de vencimento | Sim | [Veja tabela](https://ajuda.kobana.com.br/pt-BR/articles/8843278-posso-alterar-a-data-de-vencimento-e-o-valor-de-um-boleto-ja-emitido) |
| 1009 | Protestar | Sim | Sim |
| 1010 | Não protestar | Sim | Sim |
| 1011 | Protesto para fins falimentares | Sim | Sim |
| 1018 | Sustar o protesto | Sim | Sim |
| 1028 | Alterar Valor | Sim | [Veja tabela](https://ajuda.kobana.com.br/pt-BR/articles/8843278-posso-alterar-a-data-de-vencimento-e-o-valor-de-um-boleto-ja-emitido) |
| 1031 | Alteração de outros dados | Sim | Não |
| 1034 | Pago diretamente ao beneficiário | Sim | Sim |
| 1047 | Não cobrar juros | Sim | Sim |
| 1066 | Entrada em negativação expressa | Sim | Sim |
| 1067 | Não negativar | Sim | Sim |
| 1068 | Excluir negativação expressa | Sim | Sim |
| 1069 | Cancelar negativação expressa | Sim | Sim |

### Códigos de Instrução de Cobrança

Para ser enviado nos campos `first_instruction` e `second_instruction` do [Boleto](/api/v1/boletos).

Usado apenas em remessas com formato CNAB 400.

| Código | Descrição |
| --- | --- |
| 02 | DEVOLVER APÓS 05 DIAS DO VENCIMENTO |
| 03 | DEVOLVER APÓS 30 DIAS DO VENCIMENTO |
| 05 | RECEBER CONFORME INSTRUÇÕES NO PRÓPRIO TÍTULO |
| 06 | DEVOLVER APÓS 10 DIAS DO VENCIMENTO |
| 07 | DEVOLVER APÓS 15 DIAS DO VENCIMENTO |
| 08 | DEVOLVER APÓS 20 DIAS DO VENCIMENTO |
| 09 | PROTESTAR (emite aviso ao sacado após XX dias do vencimento, e envia ao cartório após 5 dias úteis) |
| 10 | NÃO PROTESTAR (inibe protesto, quando houver instrução permanente na conta corrente) |
| 11 | DEVOLVER APÓS 25 DIAS DO VENCIMENTO |
| 12 | DEVOLVER APÓS 35 DIAS DO VENCIMENTO |
| 13 | DEVOLVER APÓS 40 DIAS DO VENCIMENTO |
| 14 | DEVOLVER APÓS 45 DIAS DO VENCIMENTO |
| 15 | DEVOLVER APÓS 50 DIAS DO VENCIMENTO |
| 16 | DEVOLVER APÓS 55 DIAS DO VENCIMENTO |
| 17 | DEVOLVER APÓS 60 DIAS DO VENCIMENTO |
| 18 | DEVOLVER APÓS 90 DIAS DO VENCIMENTO |
| 19 | NÃO RECEBER APÓS 05 DIAS DO VENCIMENTO |
| 20 | NÃO RECEBER APÓS 10 DIAS DO VENCIMENTO |
| 21 | NÃO RECEBER APÓS 15 DIAS DO VENCIMENTO |
| 22 | NÃO RECEBER APÓS 20 DIAS DO VENCIMENTO |
| 23 | NÃO RECEBER APÓS 25 DIAS DO VENCIMENTO |
| 24 | NÃO RECEBER APÓS 30 DIAS DO VENCIMENTO |
| 25 | NÃO RECEBER APÓS 35 DIAS DO VENCIMENTO |
| 26 | NÃO RECEBER APÓS 40 DIAS DO VENCIMENTO |
| 27 | NÃO RECEBER APÓS 45 DIAS DO VENCIMENTO |
| 28 | NÃO RECEBER APÓS 50 DIAS DO VENCIMENTO |
| 29 | NÃO RECEBER APÓS 55 DIAS DO VENCIMENTO |
| 30 | IMPORTÂNCIA DE DESCONTO POR DIA |
| 31 | NÃO RECEBER APÓS 60 DIAS DO VENCIMENTO |
| 32 | NÃO RECEBER APÓS 90 DIAS DO VENCIMENTO |
| 33 | CONCEDER ABATIMENTO REF. À PIS-PASEP/COFIN/CSSL, MESMO APÓS VENCIMENTO |
| 34 | PROTESTAR APÓS XX DIAS CORRIDOS DO VENCIMENTO (SEM AVISO AO SACADO) |
| 35 | PROTESTAR APÓS XX DIAS ÚTEIS DO VENCIMENTO (SEM AVISO AO SACADO) |
| 37 | RECEBER ATÉ O ÚLTIMO DIA DO MÊS DE VENCIMENTO |
| 38 | CONCEDER DESCONTO MESMO APÓS VENCIMENTO |
| 39 | NÃO RECEBER APÓS O VENCIMENTO |
| 40 | CONCEDER DESCONTO CONFORME NOTA DE CRÉDITO |
| 42 | PROTESTO PARA FINS FALIMENTARES |
| 43 | SUJEITO A PROTESTO SE NÃO FOR PAGO NO VENCIMENTO |
| 44 | IMPORTÂNCIA POR DIA DE ATRASO A PARTIR DE DDMMAA |
| 45 | TEM DIA DA GRAÇA |
| 46 | USO DO BANCO |
| 47 | DISPENSAR JUROS/COMISSÃO DE PERMANÊNCIA |
| 51 | RECEBER SOMENTE COM A PARCELA ANTERIOR QUITADA |
| 52 | EFETUAR O PAGAMENTO SOMENTE ATRAVÉS DESTE BOLETO E NA REDE BANCÁRIA |
| 53 | USO DO BANCO |
| 54 | APÓS VENCIMENTO PAGÁVEL SOMENTE NA EMPRESA |
| 55 | USO DO BANCO |
| 57 | SOMAR VALOR DO TÍTULO AO VALOR DO CAMPO MORA/MULTA CASO EXISTA |
| 58 | DEVOLVER APÓS 365 DIAS DE VENCIDO |
| 59 | COBRANÇA NEGOCIADA. PAGÁVEL SOMENTE POR ESTE BOLETO NA REDE BANCÁRIA |
| 61 | TÍTULO ENTREGUE EM PENHOR EM FAVOR DO CEDENTE ACIMA |
| 62 | TÍTULO TRANSFERIDO A FAVOR DO CEDENTE |
| 70 à 75 | USO DO BANCO |
| 78 | VALOR DA IDA ENGLOBA MULTA DE 10% PRO RATA |
| 79 | COBRAR JUROS APÓS 15 DIAS DA EMISSÃO (para títulos com vencimento à vista) |
| 80 | PAGAMENTO EM CHEQUE: SOMENTE RECEBER COM CHEQUE DE EMISSÃO DO SACADO |
| 83 | OPERAÇÃO REF A VENDOR |
| 84 | APÓS VENCIMENTO CONSULTAR A AGÊNCIA CEDENTE |
| 86 | ANTES DO VENCIMENTO OU APÓS 15 DIAS, PAGÁVEL SOMENTE EM NOSSA SEDE |
| 87 | USO DO BANCO |
| 88 | NÃO RECEBER ANTES DO VENCIMENTO |
| 89 | USO DO BANCO |
| 90 | NO VENCIMENTO PAGÁVEL EM QUALQUER AGÊNCIA BANCÁRIA |
| 91 | NÃO RECEBER APÓS XX DIAS DO VENCIMENTO |
| 92 | DEVOLVER APÓS XX DIAS DO VENCIMENTO |
| 93 | MENSAGENS NOS BOLETOS COM 30 POSIÇÕES |
| 94 | MENSAGENS NOS BOLETOS COM 40 POSIÇÕES |
| 95 à 97 | USO DO BANCO |
| 98 | DUPLICATA / FATURA Nº |
