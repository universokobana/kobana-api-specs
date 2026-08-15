import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/v1/kobana-api-v-1-0",
    },
    {
      type: "category",
      label: "Assinaturas",
      key: "v1:Assinaturas",
      link: {
        type: "doc",
        id: "api/v1/assinaturas",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/criar-uma-assinatura",
          label: "Create a Subscription",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-assinaturas",
          label: "List Subscriptions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-da-assinatura",
          label: "Subscription Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-a-assinatura",
          label: "Update Subscription",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-a-assinatura",
          label: "Delete Subscription",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/gerar-proxima-cobranca",
          label: "Generate Next Charge",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Boletos",
      key: "v1:Boletos",
      link: {
        type: "doc",
        id: "api/v1/boletos",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/criar-um-boleto",
          label: "Create a Billet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-boletos",
          label: "List Billets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-o-boleto",
          label: "View the Billet",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-o-boleto",
          label: "Update the Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/cancelar-o-boleto",
          label: "Cancel the Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/duplicar-boleto",
          label: "Duplicate Billet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/protestar-boleto",
          label: "Protest Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/marcar-boleto-como-pago",
          label: "Mark Billet as Paid",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/cancelar-boletos-em-lote",
          label: "Cancel Billets in Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/enviar-boleto-por-e-mail",
          label: "Send Billet by Email",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/enviar-boleto-por-sms",
          label: "Send Billet by SMS",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "CNAB (Retorno)",
      key: "v1:CNAB (Retorno)",
      link: {
        type: "doc",
        id: "api/v1/cnab-retorno",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/enviar-cnab",
          label: "Send CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-cna-bs",
          key: "api/v1/listar-cna-bs",
          label: "List CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-cnab",
          key: "api/v1/informacoes-do-cnab",
          label: "CNAB Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/quitar-boletos",
          label: "Settle Billets",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/reprocessar-cnab",
          label: "Reprocess CNAB",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/download-do-cnab",
          label: "CNAB Download",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Carnês",
      key: "v1:Carnês",
      link: {
        type: "doc",
        id: "api/v1/carnes",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/listar-carnes",
          label: "List Carnês",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-um-carne",
          label: "Create a Carnê",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-carne",
          label: "Carnê Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-o-carne",
          label: "Delete Carnê",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Carteiras de Cobrança",
      key: "v1:Carteiras de Cobrança",
      link: {
        type: "doc",
        id: "api/v1/carteiras-de-cobranca",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/criar-carteira-de-cobranca",
          label: "Create Collection Wallet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-carteiras",
          label: "List Wallets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-da-carteira",
          label: "Wallet Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-a-carteira",
          label: "Update Wallet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-a-carteira-de-cobranca",
          label: "Delete Collection Wallet",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/solicitar-homologacao-da-carteira-de-cobranca",
          label: "Request Collection Wallet Approval",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/validar-carteira-de-cobranca",
          label: "Validate Collection Wallet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/alterar-carteira-de-cobranca-padrao",
          label: "Change Default Collection Wallet",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Clientes",
      key: "v1:Clientes",
      link: {
        type: "doc",
        id: "api/v1/clientes",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/criar-um-cliente",
          label: "Create a Customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-clientes",
          label: "List Customers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-o-cliente",
          label: "View Customer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-cliente",
          label: "Update Customer",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/busca-cliente-por-cnpj-cpf",
          label: "Search Customer by CNPJ/CPF",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/busca-cliente-por-e-mail",
          label: "Search Customer by Email",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Eventos",
      key: "v1:Eventos",
      link: {
        type: "doc",
        id: "api/v1/eventos",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/listar-eventos",
          label: "List Events",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-evento",
          label: "Event Information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Histórico de SMS",
      key: "v1:Histórico de SMS",
      link: {
        type: "doc",
        id: "api/v1/historico-de-sms",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/listar-sms-enviados",
          label: "List Sent SMS",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-sms-enviado",
          label: "Sent SMS Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-sms-enviado",
          label: "Resend Sent SMS",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      key: "v1:Webhooks",
      link: {
        type: "doc",
        id: "api/v1/webhooks",
      },
      items: [
        {
          type: "doc",
          id: "api/v1/criar-webhook",
          label: "Create Webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-webhooks",
          label: "List Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-webhook",
          label: "Webhook Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-webhook",
          label: "Update Webhook",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-webhook",
          label: "Delete Webhook",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Histórico de E-mails",
      key: "v1:Histórico de E-mails",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-e-mails-enviados",
          label: "List Sent Emails",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-e-mail-enviado",
          label: "Sent Email Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-e-mail-enviado",
          label: "Resend Sent Email",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Log de Webhooks",
      key: "v1:Log de Webhooks",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-webhooks-enviados",
          label: "List Sent Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-webhook-enviado",
          label: "Sent Webhook Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-webhooks-enviados",
          label: "Resend Sent Webhooks",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Exportação do Lote",
      key: "v1:Exportação do Lote",
      items: [
        {
          type: "doc",
          id: "api/v1/arquivo-de-exportacao-do-lote",
          label: "Batch Export File",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Lotes",
      key: "v1:Lotes",
      items: [
        {
          type: "doc",
          id: "api/v1/criar-lote",
          label: "Create Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-lotes",
          label: "List Batches",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-lote",
          label: "Batch Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-o-lote",
          label: "Delete the batch",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/incluir-boletos-no-lote",
          label: "Add Billets to Batch",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-boleto-do-lote",
          label: "Remove Billet from Batch",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/exportar-lote-no-formato-zip",
          label: "Export Batch in .zip Format",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/exportar-lote-no-formato-pdf",
          label: "Export Batch in .pdf Format",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Registro de Retorno",
      key: "v1:Registro de Retorno",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-registros-de-retorno",
          label: "List Return Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-retorno",
          label: "Return Record Information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Recebimento de Boleto",
      key: "v1:Recebimento de Boleto",
      items: [
        {
          type: "doc",
          id: "api/v1/efetuar-pagamento-de-boleto",
          label: "Make Billet Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-pagamentos-de-boleto",
          label: "List Billet Payments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-pagamento-de-boleto",
          label: "Billet Payment Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-pagamento-de-boleto",
          label: "Delete Billet Payment",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Registro de Boleto",
      key: "v1:Registro de Boleto",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-registros-de-boleto",
          label: "List Billet Records.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-boleto",
          label: "Billet Record Information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Registro de Remessa",
      key: "v1:Registro de Remessa",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-registros-de-remessa",
          label: "List Remittance Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/listar-registros-de-remessa-pendentes",
          label: "List Pending Remittance Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-pendencias",
          label: "Create Pending Items",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/excluir-pendencias",
          label: "Delete Pending Items",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-remessa",
          label: "Remittance Record Information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Importações",
      key: "v1:Importações",
      items: [
        {
          type: "doc",
          id: "api/v1/listar-importacoes",
          label: "List Imports",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/importar",
          label: "Import",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-importacao",
          label: "View Import",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "CNAB (Remessa)",
      key: "v1:CNAB (Remessa)",
      items: [
        {
          type: "doc",
          id: "api/v1/criar-cnab",
          label: "Create CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-cna-bs-remittances",
          key: "api/v1/listar-cna-bs-remittances",
          label: "List CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-cnab-remittances",
          key: "api/v1/informacoes-do-cnab-remittances",
          label: "CNAB Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/apagar-cnab",
          label: "Delete CNAB",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/raw-text-plain-do-cnab",
          label: "Raw(text/plain) of CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-cna-bs-em-lote",
          label: "Create CNABs in Batch",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Relatórios",
      key: "v1:Relatórios",
      items: [
        {
          type: "doc",
          id: "api/v1/contagem-de-boletos",
          label: "Billet Count.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
