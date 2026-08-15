#!/usr/bin/env node
/**
 * One-off deterministic translation of docs/api/overview/webhooks/payloads.mdx.
 *
 * The file is ~3600 lines of which >95% is verbatim JSON example payloads
 * that must NOT be translated (they're literal API response shapes). LLM
 * agents kept truncating/summarizing a file this size. Instead: translate
 * only the known small set of Portuguese lines (intro prose, the field
 * table, `### ` section headings, two `TabItem label=` strings) via exact
 * string substitution, and copy every other line byte-for-byte.
 *
 * Run once per target locale from `docs/`:
 *   node scripts/translate-payloads.mjs en
 *   node scripts/translate-payloads.mjs es
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'docs/api/overview/webhooks/payloads.mdx');

const lang = process.argv[2];
if (!['en', 'es'].includes(lang)) {
  console.error('usage: node scripts/translate-payloads.mjs <en|es>');
  process.exit(1);
}

const HEADINGS = {
  en: {
    '### Addon': '### Addon',
    '### Assinatura': '### Subscription',
    '### Boleto': '### Boleto',
    '### Caixa Postal — Arquivo (File)': '### Mailbox — File',
    '### Caixa Postal — Canal (Channel)': '### Mailbox — Channel',
    '### Caixa Postal — Entrada (Entry)': '### Mailbox — Entry',
    '### Carnê': '### Carnê (Installment Booklet)',
    '### Carteira': '### Bank Billet Account',
    '### Cliente': '### Customer',
    '### Cobrança — Pagamento': '### Charge — Payment',
    '### Comando': '### Command',
    '### Conexão': '### Connection',
    '### Consulta de Boleto (Data Query)': '### Boleto Query (Data Query)',
    '### Consulta de QR Code Pix (Data Query)': '### Pix QR Code Query (Data Query)',
    '### Conta (Account)': '### Account',
    '### Conta de E-mail': '### Email Account',
    '### Conta Financeira': '### Financial Account',
    '### Extrato': '### Statement',
    '### DDA — Boleto': '### DDA — Boleto',
    '### DDA — Conta': '### DDA — Account',
    '### EDI — Caixa (EDI Box)': '### EDI — Box (EDI Box)',
    '### EDI — Linha de Remessa': '### EDI — Batch Line',
    '### Exportação': '### Export',
    '### Importação': '### Import',
    '### Lote de Pagamentos': '### Payment Batch',
    '### Lote de Transferências': '### Transfer Batch',
    '### Pagamento': '### Payment',
    '### Pagamento — operações': '### Payment — operations',
    '### Pagamento de Boleto': '### Boleto Payment',
    '### Ping': '### Ping',
    '### Pix': '### Pix',
    '### Pix — operações': '### Pix — operations',
    '### Pix Automático — Conta': '### Automatic Pix — Account',
    '### Pix Automático — Localização': '### Automatic Pix — Location',
    '### Pix Automático — Pix (Cobrança)': '### Automatic Pix — Pix (Charge)',
    '### Pix Automático — Recorrência': '### Automatic Pix — Recurrence',
    '### Pix Automático — Solicitação': '### Automatic Pix — Request',
    '### Plano': '### Plan',
    '### Registro de Boleto (Registration)': '### Boleto Registration (Registration)',
    '### Registro de Remessa': '### Batch Registration',
    '### Registro de Retorno': '### Return File Registration',
    '### Remessa': '### Batch (Remessa)',
    '### Restrição de Crédito': '### Credit Restriction',
    '### Retorno': '### Return File',
    '### Saldo (Balance)': '### Balance',
    '### Saque (Withdrawal)': '### Withdrawal',
    '### Token de Acesso': '### Access Token',
    '### Transação': '### Transaction',
    '### Transferência': '### Transfer',
    '### Usuário': '### User',
    '### Webhook': '### Webhook',
    '### \\*.updated': '### \\*.updated',
  },
  es: {
    '### Addon': '### Addon',
    '### Assinatura': '### Suscripción',
    '### Boleto': '### Boleto',
    '### Caixa Postal — Arquivo (File)': '### Buzón — Archivo (File)',
    '### Caixa Postal — Canal (Channel)': '### Buzón — Canal (Channel)',
    '### Caixa Postal — Entrada (Entry)': '### Buzón — Entrada (Entry)',
    '### Carnê': '### Carnê (Cuaderno de Cuotas)',
    '### Carteira': '### Cartera de Cobranza',
    '### Cliente': '### Cliente',
    '### Cobrança — Pagamento': '### Cobranza — Pago',
    '### Comando': '### Comando',
    '### Conexão': '### Conexión',
    '### Consulta de Boleto (Data Query)': '### Consulta de Boleto (Data Query)',
    '### Consulta de QR Code Pix (Data Query)': '### Consulta de Código QR Pix (Data Query)',
    '### Conta (Account)': '### Cuenta',
    '### Conta de E-mail': '### Cuenta de Correo',
    '### Conta Financeira': '### Cuenta Financiera',
    '### Extrato': '### Extracto',
    '### DDA — Boleto': '### DDA — Boleto',
    '### DDA — Conta': '### DDA — Cuenta',
    '### EDI — Caixa (EDI Box)': '### EDI — Buzón (EDI Box)',
    '### EDI — Linha de Remessa': '### EDI — Línea de Lote',
    '### Exportação': '### Exportación',
    '### Importação': '### Importación',
    '### Lote de Pagamentos': '### Lote de Pagos',
    '### Lote de Transferências': '### Lote de Transferencias',
    '### Pagamento': '### Pago',
    '### Pagamento — operações': '### Pago — operaciones',
    '### Pagamento de Boleto': '### Pago de Boleto',
    '### Ping': '### Ping',
    '### Pix': '### Pix',
    '### Pix — operações': '### Pix — operaciones',
    '### Pix Automático — Conta': '### Pix Automático — Cuenta',
    '### Pix Automático — Localização': '### Pix Automático — Ubicación',
    '### Pix Automático — Pix (Cobrança)': '### Pix Automático — Pix (Cobranza)',
    '### Pix Automático — Recorrência': '### Pix Automático — Recurrencia',
    '### Pix Automático — Solicitação': '### Pix Automático — Solicitud',
    '### Plano': '### Plan',
    '### Registro de Boleto (Registration)': '### Registro de Boleto (Registration)',
    '### Registro de Remessa': '### Registro de Lote',
    '### Registro de Retorno': '### Registro de Archivo de Retorno',
    '### Remessa': '### Lote (Remessa)',
    '### Restrição de Crédito': '### Restricción de Crédito',
    '### Retorno': '### Archivo de Retorno',
    '### Saldo (Balance)': '### Saldo',
    '### Saque (Withdrawal)': '### Retiro',
    '### Token de Acesso': '### Token de Acceso',
    '### Transação': '### Transacción',
    '### Transferência': '### Transferencia',
    '### Usuário': '### Usuario',
    '### Webhook': '### Webhook',
    '### \\*.updated': '### \\*.updated',
  },
};

const INTRO = {
  pt: [
    'Payload é o conteúdo que é enviado na notificação. Cada evento possui um payload diferente. Em seguida o que você pode esperar de cada evento.',
    '',
    'A regra é que todos os payloads possuem as chaves `event_code`, `webhook`, `object`, `changes`.',
    '',
    '|  |  |',
    '| --- | --- |',
    '| event\\_code | Código do evento que originou a notificação. |',
    '| webhook | Informações do webhook para o qual a notificação foi criada. |',
    '| object | Informações do recurso relativo ao evento. |',
    '| changes | Mudanças realizadas no recurdo (no caso de eventos \\*.updated) |',
    '| errors | Informações de erros relativo ao evento. |',
  ].join('\n'),
  en: [
    'The payload is the content sent in the notification. Each event has a different payload. Below is what you can expect from each event.',
    '',
    'The rule is that every payload has the keys `event_code`, `webhook`, `object`, `changes`.',
    '',
    '|  |  |',
    '| --- | --- |',
    '| event\\_code | Code of the event that triggered the notification. |',
    '| webhook | Information about the webhook the notification was created for. |',
    '| object | Information about the resource related to the event. |',
    '| changes | Changes made to the resource (for \\*.updated events) |',
    '| errors | Error information related to the event. |',
  ].join('\n'),
  es: [
    'El payload es el contenido que se envía en la notificación. Cada evento tiene un payload diferente. A continuación, lo que puedes esperar de cada evento.',
    '',
    'La regla es que todos los payloads tienen las claves `event_code`, `webhook`, `object`, `changes`.',
    '',
    '|  |  |',
    '| --- | --- |',
    '| event\\_code | Código del evento que originó la notificación. |',
    '| webhook | Información del webhook para el cual se creó la notificación. |',
    '| object | Información del recurso relativo al evento. |',
    '| changes | Cambios realizados en el recurso (para eventos \\*.updated) |',
    '| errors | Información de errores relativa al evento. |',
  ].join('\n'),
};

const TABITEM_LABELS = {
  en: {
    'payment.tax.* (sub-objeto &quot;tax&quot;; &quot;tax.data&quot; varia por kind: darf/gps/fgts/gru)':
      'payment.tax.* (sub-object &quot;tax&quot;; &quot;tax.data&quot; varies by kind: darf/gps/fgts/gru)',
    'transfer.ted.register.*, transfer.pix.*, transfer.internal.* (envelope de comando)':
      'transfer.ted.register.*, transfer.pix.*, transfer.internal.* (command envelope)',
  },
  es: {
    'payment.tax.* (sub-objeto &quot;tax&quot;; &quot;tax.data&quot; varia por kind: darf/gps/fgts/gru)':
      'payment.tax.* (subobjeto &quot;tax&quot;; &quot;tax.data&quot; varía según kind: darf/gps/fgts/gru)',
    'transfer.ted.register.*, transfer.pix.*, transfer.internal.* (envelope de comando)':
      'transfer.ted.register.*, transfer.pix.*, transfer.internal.* (envoltorio de comando)',
  },
};

let src = readFileSync(SRC, 'utf8');

if (!src.includes(INTRO.pt)) {
  console.error('intro block not found verbatim in source — file may have changed, aborting');
  process.exit(1);
}
src = src.replace(INTRO.pt, INTRO[lang]);

const headingMap = HEADINGS[lang];
const lines = src.split('\n').map((line) => {
  if (Object.prototype.hasOwnProperty.call(headingMap, line)) return headingMap[line];
  return line;
});
let out = lines.join('\n');

for (const [pt, translated] of Object.entries(TABITEM_LABELS[lang])) {
  out = out.replaceAll(`label="${pt}"`, `label="${translated}"`);
}

const destDir = resolve(ROOT, `i18n/${lang}/docusaurus-plugin-content-docs/current/api/overview/webhooks`);
mkdirSync(destDir, { recursive: true });
const dest = resolve(destDir, 'payloads.mdx');
writeFileSync(dest, out);

const srcLines = readFileSync(SRC, 'utf8').split('\n').length;
const outLines = out.split('\n').length;
console.log(`wrote ${dest} — ${outLines} lines (source: ${srcLines})`);
