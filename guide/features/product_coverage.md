---
title: Product Coverage
permalink: /product_coverage/
---

{% assign x = '<i class="fa fa-check"></i>' %}

Strata 0.7 includes the following product coverage:

<table class="product-coverage">
  <thead>
    <tr>
      <th class="asset">Asset class</th>
      <th>PV</th>
      <th>PV01</th>
      <th>Bucketed PV01</th>
      <th>Gamma PV01</th>
      <th>Par Rate</th>
      <th>CS01</th>
      <th>Bucketed CS01</th>
      <th>Cashflows</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td class="asset">Vanilla Swap</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td><i class="fa fa-check"></i></td>
    </tr>
  <tr>
    <td class="asset">OIS</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td><i class="fa fa-check"></i></td>
  </tr>
  <tr>
    <td class="asset">Variable-Notional Swap</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td><i class="fa fa-check"></i></td>
  </tr>
  <tr>
    <td class="asset">Cross-Currency Swap</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td><i class="fa fa-check"></i></td>
  </tr>
  <tr>
  <td class="asset">FRA</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td><i class="fa fa-check"></i></td>
  </tr>
  <tr>
    <td class="asset">Single-Name CDS</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset">Index CDS</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset">Generic Future</td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
  </tr>
  <tr>
    <td class="asset">Generic Future Option</td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
    <td class="na"></td>
  </tr>
  </tbody>
</table>

A <i class="fa fa-check"></i> for a measure in the coverage grid means:

* A fully-documented trade model exists for the asset class.
* A calculation function exists for this measure with analytics support as necessary.
* The measure is wired-up and available out-of-the-box under the standard measure name above.
* The examples project contains a pricing example requesting this measure.
* The [command-line tool]({{site.baseurl}}/command_line_tool) distribution includes example data for requesting this measure.
