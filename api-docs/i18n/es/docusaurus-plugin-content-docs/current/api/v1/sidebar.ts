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
          label: "Crear una Suscripción",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-customer-subscriptions",
          label: "Listar Suscripciones",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customer-subscriptions-2",
          label: "Información de la Suscripción",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-customer-subscriptions",
          label: "Actualizar la Suscripción",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-customer-subscriptions",
          label: "Eliminar la Suscripción",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/post-customer-subscriptions-next-charge",
          label: "Generar Próximo Cobro",
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
          label: "Crear un Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billets",
          label: "Listar Boletos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billets-2",
          label: "Ver el Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets",
          label: "Actualizar el Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-cancel",
          label: "Cancelar el Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-duplicate",
          label: "Duplicar Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-protest",
          label: "Protestar Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billets-pay",
          label: "Marcar Boleto Como Pagado",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-cancel-all",
          label: "Cancelar Boletos en Lote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-send-email",
          label: "Enviar Boleto por Correo Electrónico",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billets-send-sms",
          label: "Enviar Boleto por SMS",
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
          label: "Enviar CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges",
          key: "api/v1/get-discharges",
          label: "Listar CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges-2",
          key: "api/v1/get-discharges-2",
          label: "Información del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-discharges-pay-off",
          label: "Pagar Boletos",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-discharges-reprocess",
          label: "Reprocesar CNAB",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/get-discharges-download",
          label: "Descargar CNAB",
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
          label: "Listar Carnés",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-installments",
          label: "Crear un Carné",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-installments-2",
          label: "Información del Carné",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-installments",
          label: "Eliminar el Carné",
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
          label: "Crear Cartera de Cobro",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts",
          label: "Listar Carteras",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts-2",
          label: "Información de la Cartera",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts",
          label: "Actualizar la Cartera",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-accounts",
          label: "Eliminar la Cartera de Cobro",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-accounts-ask",
          label: "Solicitar Homologación de la Cartera de Cobro",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts-validate",
          label: "Validar Cartera de Cobro",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-accounts-set-default",
          label: "Cambiar Cartera de Cobro predeterminada",
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
          label: "Crear un Cliente",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-customers",
          label: "Listar Clientes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-2",
          label: "Ver el Cliente",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-customers",
          label: "Actualizar Cliente",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-cnpj-cpf",
          label: "Buscar Cliente por CNPJ/CPF",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-customers-email",
          label: "Buscar Cliente por Correo Electrónico",
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
          label: "Listar Eventos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-events-2",
          label: "Información del Evento",
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
          label: "Listar SMS Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-sms-deliveries-2",
          label: "Información del SMS Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-sms-deliveries-resend",
          label: "Reenviar SMS Enviado",
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
          label: "Crear Webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-webhooks",
          label: "Listar Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-webhooks-2",
          label: "Información del Webhook",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-webhooks",
          label: "Actualizar Webhook",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-webhooks",
          label: "Eliminar Webhook",
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
          label: "Listar Correos Electrónicos Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-email-deliveries-2",
          label: "Información del Correo Electrónico Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-email-deliveries-resend",
          label: "Reenviar Correo Electrónico Enviado",
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
          label: "Listar Webhooks Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-webhook-deliveries-2",
          label: "Información del Webhook Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/put-webhook-deliveries-resend",
          label: "Reenviar Webhooks Enviados",
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
          label: "Archivo de Exportación del Lote",
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
          label: "Crear Lote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-batches",
          label: "Listar Lotes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-batches-2",
          label: "Información del Lote",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-batches",
          label: "Eliminar el lote",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/put-bank-billet-batches-add-bank-billets",
          label: "Incluir Boletos en el Lote",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-batches-remove-bank-billet",
          label: "Eliminar Boleto del Lote",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-batches-zip",
          label: "Exportar Lote en Formato .zip",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-batches-pdf",
          label: "Exportar Lote en Formato .pdf",
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
          label: "Listar Registros de Retorno",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-discharges-2",
          label: "Información del Registro de Retorno",
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
          label: "Realizar Pago de Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-payments",
          label: "Listar Pagos de Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-payments-2",
          label: "Información del Pago de Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-payments",
          label: "Eliminar Pago de Boleto",
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
          label: "Listar Registros de Boleto.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-registrations-2",
          label: "Información del Registro de Boleto",
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
          label: "Listar Registros de Remesa",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-remittances-pending",
          label: "Listar Registros de Remesa Pendientes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-bank-billet-remittances-occurrence",
          label: "Crear Pendencias",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/delete-bank-billet-remittances",
          label: "Eliminar Pendencias",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-bank-billet-remittances-2",
          label: "Información del Registro de Remesa",
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
          label: "Listar Importaciones",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-imports",
          label: "Importar",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-imports-2",
          label: "Ver Importación",
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
          label: "Crear CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances",
          key: "api/v1/get-remittances",
          label: "Listar CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances-2",
          key: "api/v1/get-remittances-2",
          label: "Información del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/delete-remittances",
          label: "Eliminar CNAB",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/get-remittances-raw",
          label: "Raw (text/plain) del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/post-remittances-bulk",
          label: "Crear CNABs en Lote",
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
          label: "Cantidad de Boletos.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
