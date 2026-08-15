---
title: "n8n"
description: "Node comunitario de n8n para la API de Kobana"
---

[n8n-nodes-kobana](https://github.com/universokobana/n8n-nodes-kobana) es un node comunitario de [n8n](https://n8n.io) para integrar la API de Kobana directamente en tus workflows, sin necesidad de escribir llamadas HTTP manualmente.

El paquete cubre las **v1** y **v2** de la API de Kobana en dos nodes:

- **Kobana** — interfaz simplificada, basada en campos, para las operaciones más comunes (boletos, cobranzas, clientes, Pix, pagos, transferencias y más).
- **Kobana Complete** — acceso completo a la API, con selección dinámica de recurso y operación, cubriendo todos los endpoints de ambas versiones.

## Instalación

### Nodes de la comunidad (recomendado)

En n8n, ve a **Settings › Community Nodes › Install** e instala el paquete `n8n-nodes-kobana`. Consulta la [guía oficial de instalación de community nodes](https://docs.n8n.io/integrations/community-nodes/installation/).

### npm

```bash
npm install n8n-nodes-kobana
```

### Instalación local (desarrollo)

```bash
git clone https://github.com/universokobana/n8n-nodes-kobana
cd n8n-nodes-kobana
npm install
npm run build
npm pack
```

Esto genera un archivo `.tgz` que puede instalarse en la carpeta `~/.n8n/custom/` de tu instancia de n8n:

```bash
cd ~/.n8n/custom/
npm install /ruta/a/n8n-nodes-kobana-0.0.1.tgz
```

O, para desarrollo activo, usa `npm link` entre los dos directorios. Reinicia n8n después de instalar para cargar los nuevos nodes.

## Credenciales

El node usa tu [token de acceso](/api/overview/authentication/access-token) de Kobana para autenticar:

1. En n8n, ve a **Credentials › New** y selecciona **Kobana API**.
2. Ingresa tu token de acceso.
3. Elige el ambiente (Sandbox o Producción).
4. Guarda.

## Ejemplo de uso

Para emitir un boleto:

1. Agrega un node **Kobana** a tu workflow.
2. Selecciona **Bank Slip** (Boleto) como recurso.
3. Elige **Create** como operación.
4. Completa los campos obligatorios (monto, vencimiento, datos del cliente).
5. Opcionalmente configura instrucciones de pago, tags y notificaciones.

El mismo patrón se aplica a los demás recursos cubiertos por el node — cobranzas Pix, pagos, transferencias, cuentas financieras, entre otros.

## Saber más

Consulta el [repositorio en GitHub](https://github.com/universokobana/n8n-nodes-kobana) para la lista completa de recursos y operaciones soportadas.
