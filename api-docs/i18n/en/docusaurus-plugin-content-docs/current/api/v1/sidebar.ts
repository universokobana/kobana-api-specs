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
          id: "api/v1/post-customer-subscriptions",
          label: "Create a Subscription",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-customer-subscriptions",
          label: "List Subscriptions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customer-subscriptions-2",
          label: "Subscription Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-customer-subscriptions",
          label: "Update Subscription",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-customer-subscriptions",
          label: "Delete Subscription",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/post-customer-subscriptions-next-charge",
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
          id: "api/v1/post-bank-billets",
          label: "Create a Billet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billets",
          label: "List Billets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billets-2",
          label: "View the Billet",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets",
          label: "Update the Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-cancel",
          label: "Cancel the Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-duplicate",
          label: "Duplicate Billet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-protest",
          label: "Protest Billet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-pay",
          label: "Mark Billet as Paid",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-cancel-all",
          label: "Cancel Billets in Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-send-email",
          label: "Send Billet by Email",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-send-sms",
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
          id: "api/v1/post-discharges",
          label: "Send CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges",
          key: "api/v1/get-discharges",
          label: "List CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges-2",
          key: "api/v1/get-discharges-2",
          label: "CNAB Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-discharges-pay-off",
          label: "Settle Billets",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-discharges-reprocess",
          label: "Reprocess CNAB",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges-download",
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
          id: "api/v1/get-installments",
          label: "List Carnês",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-installments",
          label: "Create a Carnê",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-installments-2",
          label: "Carnê Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-installments",
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
          id: "api/v1/post-bank-billet-accounts",
          label: "Create Collection Wallet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts",
          label: "List Wallets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts-2",
          label: "Wallet Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts",
          label: "Update Wallet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-accounts",
          label: "Delete Collection Wallet",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts-ask",
          label: "Request Collection Wallet Approval",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts-validate",
          label: "Validate Collection Wallet",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts-set-default",
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
          id: "api/v1/post-customers",
          label: "Create a Customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-customers",
          label: "List Customers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-2",
          label: "View Customer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-customers",
          label: "Update Customer",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-cnpj-cpf",
          label: "Search Customer by CNPJ/CPF",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-email",
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
          id: "api/v1/get-events",
          label: "List Events",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-events-2",
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
          id: "api/v1/get-sms-deliveries",
          label: "List Sent SMS",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-sms-deliveries-2",
          label: "Sent SMS Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-sms-deliveries-resend",
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
          id: "api/v1/post-webhooks",
          label: "Create Webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-webhooks",
          label: "List Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-webhooks-2",
          label: "Webhook Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-webhooks",
          label: "Update Webhook",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-webhooks",
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
          id: "api/v1/get-email-deliveries",
          label: "List Sent Emails",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-email-deliveries-2",
          label: "Sent Email Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-email-deliveries-resend",
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
          id: "api/v1/get-webhook-deliveries",
          label: "List Sent Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-webhook-deliveries-2",
          label: "Sent Webhook Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-webhook-deliveries-resend",
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
          id: "api/v1/get-bank-billet-batch-exports",
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
          id: "api/v1/post-bank-billet-batches",
          label: "Create Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-batches",
          label: "List Batches",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-batches-2",
          label: "Batch Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-batches",
          label: "Delete the batch",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-batches-add-bank-billets",
          label: "Add Billets to Batch",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-batches-remove-bank-billet",
          label: "Remove Billet from Batch",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-batches-zip",
          label: "Export Batch in .zip Format",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-batches-pdf",
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
          id: "api/v1/get-bank-billet-discharges",
          label: "List Return Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-discharges-2",
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
          id: "api/v1/post-bank-billet-payments",
          label: "Make Billet Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-payments",
          label: "List Billet Payments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-payments-2",
          label: "Billet Payment Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-payments",
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
          id: "api/v1/get-bank-billet-registrations",
          label: "List Billet Records.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-registrations-2",
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
          id: "api/v1/get-bank-billet-remittances",
          label: "List Remittance Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-remittances-pending",
          label: "List Pending Remittance Records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-remittances-occurrence",
          label: "Create Pending Items",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-remittances",
          label: "Delete Pending Items",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-remittances-2",
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
          id: "api/v1/get-imports",
          label: "List Imports",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-imports",
          label: "Import",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-imports-2",
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
          id: "api/v1/post-remittances",
          label: "Create CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances",
          key: "api/v1/get-remittances",
          label: "List CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances-2",
          key: "api/v1/get-remittances-2",
          label: "CNAB Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-remittances",
          label: "Delete CNAB",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances-raw",
          label: "Raw(text/plain) of CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-remittances-bulk",
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
          id: "api/v1/get-reports-bank-billets",
          label: "Billet Count.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
