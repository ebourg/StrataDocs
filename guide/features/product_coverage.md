---
title: Product Coverage
permalink: /product_coverage/
---

{% assign x = '<i class="fa fa-check"></i>' %}

Strata 0.7 includes the following product coverage:

| Asset class               | Types                                           | PV    | PV01   | Bucketed PV01 | Gamma PV01 | Par Rate | CS01 | Bucketed CS01 | Cashflows |
|---------------------------|-------------------------------------------------|:-----:|:------:|:-------------:|:----------:|:--------:|:----:|:-------------:|:---------:|
| **Swap**                  | Vanilla, OIS, variable notional, cross-currency | {{x}} | {{x}}  |     {{x}}     |   {{x}}    |  {{x}}   |      |               |  {{x}}    |
| **FRA**                   |                                                 | {{x}} | {{x}}  |     {{x}}     |   {{x}}    |  {{x}}   |      |               |  {{x}}    |
| **CDS**                   | Single name, index                              | {{x}} | {{x}}  |     {{x}}     |            |          | {{x}}|    {{x}}      |           |
| **Generic Future**        |                                                 | {{x}} |        |               |            |          |      |               |           |
| **Generic Future Option** |                                                 | {{x}} |        |               |            |          |      |               |           |

A <i class="fa fa-check"></i> for a measure in the coverage grid means:

* A fully-documented trade model exists for the asset class.
* A calculation function exists for this measure with analytics support as necessary.
* The measure is wired-up and available out-of-the-box under the standard measure name above.
* The examples project contains a pricing example requesting this measure.
* The [command-line tool](command-line tool) distribution includes example data for requesting this measure.