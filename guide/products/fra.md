---
title: Products - FRA
permalink: /fra/
---

## Forward Rate Agreement (FRA)

A FRA is a financial instrument that represents the one off exchange of a fixed
rate of interest for a floating rate at a future date.

For example, a FRA might involve an agreement to exchange the difference between
the fixed rate of 1% and the GBP LIBOR rate in 2 months time.


## Key classes

A FRA is represented in Strata using the [`Fra`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/fra/Fra.html) class.
The `Fra` class stores details of the product that was agreed.
The trade details are stored in [`FraTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/fra/FraTrade.html) class.

A `Fra` can be created using a builder as follows:

```java
Fra fra = Fra.builder()
  .buySell(BuySell.BUY)
  .notional(1_000_000)
  .startDate(LocalDate.of(2015, 6, 15))
  .endDate(LocalDate.of(2015, 9, 15))
  .fixedRate(0.01)
  .index(IborIndices.GBP_LIBOR_3M)
  .build();
```


## Pricing

The `strata-pricer` module provides pricing support for FRAs:

* [`DiscountingFraProductPricer`]({{site.baseurl}}/apidocs/com/opengamma/strata/pricer/fra/DiscountingFraProductPricer.html) class.
* [`DiscountingFraTradePricer`]({{site.baseurl}}/apidocs/com/opengamma/strata/pricer/fra/DiscountingFraTradePricer.html) class.

The following [pricing methods]({{site.baseurl}}/apidocs/com/opengamma/strata/pricer/fra/DiscountingFraProductPricer.html)
are available:

* present value
* present value sensitivity
* forecast value
* forecast value sensitivity
* par rate
* par spread
* par spread sensitivity
* cash flows
* explain present value


## Product model

The following table summarizes the fields on `Fra` that can be used to control the product.
For more detail on the meaning of each field, see the
[Javadoc]({{site.baseurl}}/apidocs/com/opengamma/strata/product/fra/Fra.html);

| Property name     | Description | Optional   |
|-------------------|-------------|------------|
| buySell           | Whether the FRA is buy or sell | Required |
| currency          | The primary currency | Defaults to the currency of the index |
| notional          | The notional amount | Required |
| startDate         | The start date | Required |
| endDate           | The end date | Required |
| businessDayAdjustment | The holiday adjustment to the start/end date | Optional |
| paymentDate       | The payment date | Defaults to the `startDate` |
| fixedRate         | The fixed rate of interest | Required |
| index             | The Ibor index to observe | Required |
| indexInterpolated | The second Ibor index to observe, when interpolating | Optional |
| fixingDateOffset  | The offset to the fixing date | Defaults to the offset of the index |
| dayCount          | The day count | Defaults to the day count of the index |
| discounting       | The approach to FRA discounting | Defaults based on the currency |

The fixed interest rate must be specified in decimal form.
A 5% rate is specified as 0.05.

Three methods of FRA discounting are supported - 'None', 'ISDA' and 'AFMA'.
These correspond to the ISDA 2006 definitions.

