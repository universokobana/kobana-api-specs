---
title: "n8n"
description: "Node comunitário do n8n para a API da Kobana"
---

O [n8n-nodes-kobana](https://github.com/universokobana/n8n-nodes-kobana) é um node comunitário do [n8n](https://n8n.io) para integrar a API da Kobana diretamente nos seus workflows, sem precisar escrever chamadas HTTP manualmente.

O pacote cobre as **v1** e **v2** da API da Kobana em dois nodes:

- **Kobana** — interface simplificada, baseada em campos, para as operações mais comuns (boletos, cobranças, clientes, Pix, pagamentos, transferências e mais).
- **Kobana Complete** — acesso completo à API, com seleção dinâmica de recurso e operação, cobrindo todos os endpoints das duas versões.

## Instalação

### Nodes da comunidade (recomendado)

No n8n, acesse **Settings › Community Nodes › Install** e instale o pacote `n8n-nodes-kobana`. Veja o [guia oficial de instalação de community nodes](https://docs.n8n.io/integrations/community-nodes/installation/).

### npm

```bash
npm install n8n-nodes-kobana
```

### Instalação local (desenvolvimento)

```bash
git clone https://github.com/universokobana/n8n-nodes-kobana
cd n8n-nodes-kobana
npm install
npm run build
npm pack
```

Isso gera um arquivo `.tgz` que pode ser instalado na pasta `~/.n8n/custom/` da sua instância do n8n:

```bash
cd ~/.n8n/custom/
npm install /caminho/para/n8n-nodes-kobana-0.0.1.tgz
```

Ou, para desenvolvimento ativo, use `npm link` entre os dois diretórios. Reinicie o n8n depois de instalar para carregar os novos nodes.

## Credenciais

O node usa o seu [Token de Acesso](/api/overview/authentication/access-token) da Kobana para autenticar:

1. No n8n, acesse **Credentials › New** e selecione **Kobana API**.
2. Informe o token de acesso.
3. Escolha o ambiente (Sandbox ou Produção).
4. Salve.

## Exemplo de uso

Para emitir um boleto:

1. Adicione um node **Kobana** ao seu workflow.
2. Selecione o recurso **Bank Slip** (Boleto).
3. Escolha a operação **Create**.
4. Preencha os campos obrigatórios (valor, vencimento, dados do cliente).
5. Opcionalmente configure instruções de pagamento, tags e notificações.

O mesmo padrão se aplica aos demais recursos cobertos pelo node — cobranças Pix, pagamentos, transferências, contas financeiras, entre outros.

## Saiba mais

Consulte o [repositório no GitHub](https://github.com/universokobana/n8n-nodes-kobana) para a lista completa de recursos e operações suportadas.
