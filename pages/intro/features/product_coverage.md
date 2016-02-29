---
title: Product Coverage
permalink: /product_coverage/
---

Strata includes coverage for the following products:

<table class="product-coverage">
  <thead>
    <tr>
      <th class="asset">Asset class</th>
      <th>PV</th>
      <th>PV01</th>
      <th>Bucketed PV01</th>
      <th>Gamma PV01</th>
      <th>Par Rate/Spread</th>
      <th>CS01</th>
      <th>Bucketed CS01</th>
      <th>Cashflows</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/swap">Swap</a><br />
    Including Vanilla, OIS, Basis, Cross Currency and Variable Notional</td>
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
    <td class="asset"><a href="{{site.baseurl}}/fra">FRA</a></td>
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
    <td class="asset">CDS<br />Single Name, Index</td>
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
    <td class="asset"><a href="{{site.baseurl}}/fx_single">FX Forward/Spot</a></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset">FX NDF</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/fx_swap">FX Swap</a></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
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
  <tr>
    <td class="asset">STIR Future (Ibor)</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset">Deliverable Swap Future</td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/term_deposit">Term Deposit</a></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td><i class="fa fa-check"></i></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/bullet_payment">Bullet Payment</a></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td><i class="fa fa-check"></i></td>
    <td></td>
    <td></td>
    <td class="na"></td>
    <td class="na"></td>
    <td></td>
  </tr>
  </tbody>
</table>

A <i class="fa fa-check"></i> for a measure in the coverage grid means:

* A fully-documented trade model exists for the asset class.
* A calculation function exists for this measure with analytics support as necessary.
* The measure is wired-up and available out-of-the-box under the standard measure name above.
* The examples project contains a pricing example requesting this measure.
* The [command-line tool]({{site.baseurl}}/command_line_tool) distribution includes example data for requesting this measure.


## Additional coverage

The following asset classes can be priced using the API of the `strata-pricer` module.
They are not currently exposed through the scenario-aware calculation API.
Work is ongoing to provide complete end-to-end support for them.

<table class="product-coverage">
  <thead>
    <tr>
      <th class="asset">Asset class</th>
      <th>Models</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/swaption">Swaption</a> (Physical)</td>
    <td>Normal, Black, SABR</td>
  </tr>
  <tr>
    <td class="asset"><a href="{{site.baseurl}}/swaption">Swaption</a> (Cash-settled)</td>
    <td>Normal, Black, SABR</td>
  </tr>
  <tr>
    <td class="asset">Fixed Coupon Bond</td>
    <td>Discounting</td>
  </tr>
  <tr>
    <td class="asset">Bond Future</td>
    <td>Discounting</td>
  </tr>
  <tr>
    <td class="asset">Bond Future Option</td>
    <td>Black</td>
  </tr>
  <tr>
    <td class="asset">STIR Future (Ibor)</td>
    <td>Hull-White</td>
  </tr>
  <tr>
    <td class="asset">STIR Future Option (Ibor)</td>
    <td>Normal</td>
  </tr>
  <tr>
    <td class="asset">FX Vanilla Option</td>
    <td>Black</td>
  </tr>
  <tr>
    <td class="asset">CMS, including cap/floor</td>
    <td>SABR</td>
  </tr>
  <tr>
    <td class="asset">Ibor cap/floor</td>
    <td>Normal, Black</td>
  </tr>
  </tbody>
</table>


## Curve calibration

Strata includes a full implementation of the multi-curve framework for curve calibration.
The following asset classes can be used when defining curves:

* Ibor Fixing
* Term Deposit
* FRA
* STIR Future (Ibor)
* Vanilla Swap (Fixed vs Ibor)
* OIS (Fixed vs Overnight)
* Basis Swap (Ibor vs Ibor)
* Three Leg Basis Swap (Euribor)
* Cross-currency Swap (Ibor vs Ibor)
* FX Swap
