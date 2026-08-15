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
          label: "Crear una Suscripción",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-assinaturas",
          label: "Listar Suscripciones",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-da-assinatura",
          label: "Información de la Suscripción",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-a-assinatura",
          label: "Actualizar la Suscripción",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-a-assinatura",
          label: "Eliminar la Suscripción",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/gerar-proxima-cobranca",
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
          id: "api/v1/criar-um-boleto",
          label: "Crear un Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-boletos",
          label: "Listar Boletos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-o-boleto",
          label: "Ver el Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-o-boleto",
          label: "Actualizar el Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/cancelar-o-boleto",
          label: "Cancelar el Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/duplicar-boleto",
          label: "Duplicar Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/protestar-boleto",
          label: "Protestar Boleto",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/marcar-boleto-como-pago",
          label: "Marcar Boleto Como Pagado",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/cancelar-boletos-em-lote",
          label: "Cancelar Boletos en Lote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/enviar-boleto-por-e-mail",
          label: "Enviar Boleto por Correo Electrónico",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/enviar-boleto-por-sms",
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
          id: "api/v1/enviar-cnab",
          label: "Enviar CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-cna-bs",
          key: "api/v1/listar-cna-bs",
          label: "Listar CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-cnab",
          key: "api/v1/informacoes-do-cnab",
          label: "Información del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/quitar-boletos",
          label: "Pagar Boletos",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/reprocessar-cnab",
          label: "Reprocesar CNAB",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/download-do-cnab",
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
          id: "api/v1/listar-carnes",
          label: "Listar Carnés",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-um-carne",
          label: "Crear un Carné",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-carne",
          label: "Información del Carné",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-o-carne",
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
          id: "api/v1/criar-carteira-de-cobranca",
          label: "Crear Cartera de Cobro",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-carteiras",
          label: "Listar Carteras",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-da-carteira",
          label: "Información de la Cartera",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-a-carteira",
          label: "Actualizar la Cartera",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-a-carteira-de-cobranca",
          label: "Eliminar la Cartera de Cobro",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/solicitar-homologacao-da-carteira-de-cobranca",
          label: "Solicitar Homologación de la Cartera de Cobro",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/validar-carteira-de-cobranca",
          label: "Validar Cartera de Cobro",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/alterar-carteira-de-cobranca-padrao",
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
          id: "api/v1/criar-um-cliente",
          label: "Crear un Cliente",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-clientes",
          label: "Listar Clientes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-o-cliente",
          label: "Ver el Cliente",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-cliente",
          label: "Actualizar Cliente",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/busca-cliente-por-cnpj-cpf",
          label: "Buscar Cliente por CNPJ/CPF",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/busca-cliente-por-e-mail",
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
          id: "api/v1/listar-eventos",
          label: "Listar Eventos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-evento",
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
          id: "api/v1/listar-sms-enviados",
          label: "Listar SMS Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-sms-enviado",
          label: "Información del SMS Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-sms-enviado",
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
          id: "api/v1/criar-webhook",
          label: "Crear Webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-webhooks",
          label: "Listar Webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-webhook",
          label: "Información del Webhook",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/atualizar-webhook",
          label: "Actualizar Webhook",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-webhook",
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
          id: "api/v1/listar-e-mails-enviados",
          label: "Listar Correos Electrónicos Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-e-mail-enviado",
          label: "Información del Correo Electrónico Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-e-mail-enviado",
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
          id: "api/v1/listar-webhooks-enviados",
          label: "Listar Webhooks Enviados",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-webhook-enviado",
          label: "Información del Webhook Enviado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/reenviar-webhooks-enviados",
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
          id: "api/v1/arquivo-de-exportacao-do-lote",
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
          id: "api/v1/criar-lote",
          label: "Crear Lote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-lotes",
          label: "Listar Lotes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-lote",
          label: "Información del Lote",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-o-lote",
          label: "Eliminar el lote",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/incluir-boletos-no-lote",
          label: "Incluir Boletos en el Lote",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/v1/excluir-boleto-do-lote",
          label: "Eliminar Boleto del Lote",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/exportar-lote-no-formato-zip",
          label: "Exportar Lote en Formato .zip",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/exportar-lote-no-formato-pdf",
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
          id: "api/v1/listar-registros-de-retorno",
          label: "Listar Registros de Retorno",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-retorno",
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
          id: "api/v1/efetuar-pagamento-de-boleto",
          label: "Realizar Pago de Boleto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-pagamentos-de-boleto",
          label: "Listar Pagos de Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-pagamento-de-boleto",
          label: "Información del Pago de Boleto",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/excluir-pagamento-de-boleto",
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
          id: "api/v1/listar-registros-de-boleto",
          label: "Listar Registros de Boleto.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-boleto",
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
          id: "api/v1/listar-registros-de-remessa",
          label: "Listar Registros de Remesa",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/listar-registros-de-remessa-pendentes",
          label: "Listar Registros de Remesa Pendientes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-pendencias",
          label: "Crear Pendencias",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/excluir-pendencias",
          label: "Eliminar Pendencias",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-registro-de-remessa",
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
          id: "api/v1/listar-importacoes",
          label: "Listar Importaciones",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/importar",
          label: "Importar",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/visualizar-importacao",
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
          id: "api/v1/criar-cnab",
          label: "Crear CNAB",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/v1/listar-cna-bs-remittances",
          key: "api/v1/listar-cna-bs-remittances",
          label: "Listar CNABs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/informacoes-do-cnab-remittances",
          key: "api/v1/informacoes-do-cnab-remittances",
          label: "Información del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/apagar-cnab",
          label: "Eliminar CNAB",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/v1/raw-text-plain-do-cnab",
          label: "Raw (text/plain) del CNAB",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/v1/criar-cna-bs-em-lote",
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
          id: "api/v1/contagem-de-boletos",
          label: "Cantidad de Boletos.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
