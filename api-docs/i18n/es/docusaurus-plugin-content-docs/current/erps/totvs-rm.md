---
title: "TOTVS RM"
description: "Módulo Oficial TOTVS RM"
---

Módulo Oficial TOTVS RM

:::warning[Boleto Simples]

Los módulos están bajo el nombre de Boleto Simples y serán migrados y actualizados poco a poco.

:::

[TOTVS](https://www.totvs.com) es la empresa líder del mercado brasileño de ERP. Posee varios sistemas de gestión, entre ellos RM.

La integración realiza la generación de boletos a partir de los títulos registrados en cuentas a cobrar y permite el pago automático mediante la programación de procesos.

### Código Fuente

El código fuente de este módulo no está disponible.

### Requisitos

- RM 12.1.28.216 o superior

### Descargar

- [BoletoSimplesTOTVS-RM](https://kobana-public.s3.sa-east-1.amazonaws.com/BoletoSimples-TOTVSRM.zip)

### Instalación

⦁ Accede al menú Servicios Globales/Metadatos/Proyecto, donde deben importarse los proyectos de metadatos disponibles en el archivo:

"BoletoSimples-TOTVSRM.TotvsMD".

![1.png](/img/guias/modulos-totvs-rm/1.png)

Después de la importación, debe ejecutarse el proceso "Generar Proyecto de Metadatos" para cada uno de los proyectos importados.

![2.png](/img/guias/modulos-totvs-rm/2.png)

⦁ Accede al menú Gestión Financiera/Personalización/Parámetros Boleto Simples, donde deben definirse los siguientes campos:

**Estatus:**  define si la integración está activa o inactiva.

**Ambiente:** define el ambiente que está siendo integrado con Boleto Simples.

**Token de Acceso:** debe informarse el token de acceso del ambiente de Boleto Simples.

**Usar Cuenta Caja asociada al convenio del boleto:** define si se usará la cuenta caja asociada al convenio del boleto en el momento del pago realizado por el proceso 'Consulta de Estatus Boleto Simples'.

**Cuenta Caja:** define la cuenta caja que será usada en el momento del pago del boleto, si el parámetro anterior estuviese desmarcado.

**Medio de Pago:** define el medio de pago que será usado en el pago realizado por el proceso 'Consulta de Estatus Boleto Simples'.

![3.png](/img/guias/modulos-totvs-rm/3.png)

⦁ Accede al menú Gestión/Fórmula Visual/Fórmula Visual donde deben importarse las fórmulas visuales responsables de la integración con Boleto Simples, disponibles en el archivo:

"BoletoSimples-TOTVSRM.TotvsWF"

![4.png](/img/guias/modulos-totvs-rm/4.png)

Debe marcarse la opción *"Importar Disparadores"*, en la pestaña Parámetros, para cada una de las fórmulas visuales.

**Utilización:**

⦁   Después de guardar el registro en el registro de convenio de TOTVS Gestión Financiera, se realiza la integración incluyendo una cartera en Boleto Simples. Si el convenio ya ha sido integrado con Boleto Simples, la información alterada en el convenio será modificada en Boleto Simples.

⦁   Después de la ejecución del proceso de inclusión de boleto en TOTVS Gestión Financiera se realiza la integración incluyendo el boleto en Boletos Simples, si el convenio asociado al boleto está integrado. El estatus del envío del boleto en TOTVS Gestión Financiera será alterado a Remitido.

⦁   Para actualizar el estatus del boleto en TOTVS Gestión Financiera debe ejecutarse la fórmula visual "Consulta Estatus del Boleto", menú Gestión/Fórmula Visual/Ejecutar, donde se consultará el estatus del boleto en Boleto Simples. Si el boleto tuviera estatus de "Pagado" o "Cancelado" en Boleto Simples se realizará el pago o cancelación del boleto en TOTVS Gestión Financiera respectivamente. Esta fórmula visual puede ser programada. Se genera un registro de cada ejecución en la carpeta RM.NET\\Procesos\\FV.

### Descargo de Responsabilidad

TOTVS RM®️ y TOTVS®️ son marcas registradas de TOTVS®️.
