---
title: "n8n"
description: "Community n8n node for the Kobana API"
---

[n8n-nodes-kobana](https://github.com/universokobana/n8n-nodes-kobana) is a community node for [n8n](https://n8n.io) that integrates the Kobana API directly into your workflows, without having to write manual HTTP calls.

The package covers both the **v1** and **v2** of the Kobana API in two nodes:

- **Kobana** — a simplified, field-based interface for the most common operations (boletos, charges, customers, Pix, payments, transfers and more).
- **Kobana Complete** — full API access, with dynamic resource and operation selection, covering every endpoint of both versions.

## Installation

### Community nodes (recommended)

In n8n, go to **Settings › Community Nodes › Install** and install the `n8n-nodes-kobana` package. See the [official community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

### npm

```bash
npm install n8n-nodes-kobana
```

### Local installation (development)

```bash
git clone https://github.com/universokobana/n8n-nodes-kobana
cd n8n-nodes-kobana
npm install
npm run build
npm pack
```

This produces a `.tgz` file that can be installed in your n8n instance's `~/.n8n/custom/` folder:

```bash
cd ~/.n8n/custom/
npm install /path/to/n8n-nodes-kobana-0.0.1.tgz
```

Or, for active development, use `npm link` between the two directories. Restart n8n after installing to load the new nodes.

## Credentials

The node uses your Kobana [access token](/api/overview/authentication/access-token) to authenticate:

1. In n8n, go to **Credentials › New** and select **Kobana API**.
2. Enter your access token.
3. Choose the environment (Sandbox or Production).
4. Save.

## Usage example

To issue a boleto:

1. Add a **Kobana** node to your workflow.
2. Select **Bank Slip** as the resource.
3. Choose **Create** as the operation.
4. Fill in the required fields (amount, due date, customer information).
5. Optionally configure payment instructions, tags and notifications.

The same pattern applies to every other resource covered by the node — Pix charges, payments, transfers, financial accounts and more.

## Learn more

See the [GitHub repository](https://github.com/universokobana/n8n-nodes-kobana) for the full list of supported resources and operations.
