---
title: Market Data
permalink: /market_data/
---

Market data is a fundamental aspect of a risk system and most calculations performed by Strata 
are likely to use market data. Market data is a first class concept in Strata.

## Definition

The term "market data" in Strata refers to any value which is observable in the market or is derived solely from
observable market data.

For example, futures prices are observable market data and can be looked up directly from a provider of
market data such as Bloomberg or Reuters.

A calibrated yield curve is an example of non-observable market data as it is derived from observable data such as
quoted rates and futures prices.

Measures such as present value or PV01 are distinguished from market data because they are derived from portfolio
data as well as market data.

## Concepts

### Market Data Building

In Strata, market data values are assembled in advance of any calculations.
This means that all market data needed for a set of calculations is available before any of the calculations are performed.
This has a number of advantages: 

* The lifecycle of market data is not tied to the calculations - it can be examined, modified, persisted and restored independently
* Each item of market data is built once even if it is required by multiple calculations
* The calculation engine can modify the data and repeat the calculations to simulate different scenarios without
the calculations needing to be aware of it
* It is possible to verify that all market data is available before starting potentially long-running calculations

### Requesting Market Data for Calculations

If market data must be assembled before starting any calculations, it implies that it must be possible to find out what
data is required before starting the calculations.
The method `CalculationFunction.requirements` provides this information.
See [Adding a New Measure]({{site.baseurl}}/add_measure) for details.

### Identifying Market Data

In order for functions to declare the market data they require and to request it during their calculations,
there must be a way to identify market data. This is done using implementations of 
[`MarketDataKey`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/market/MarketDataKey.html)
and 
[`MarketDataId`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/market/MarketDataId.html)

#### Market Data Keys

Market data keys are used by functions to request a piece of market data. The key contains only the information
that a function cares about to operate as generically as possible.

For example, the function to price a USD swap will need discount factors from a USD discounting curve;
therefore, one of its market data requirements will be an instance of 
[`DiscountCurveKey`]({{site.baseurl}}/apidocs/com/opengamma/strata/market/key/DiscountCurveKey.html)
with a currency of USD. This can be constructed as shown below:

```java
key = DiscountCurveKey.of(Currency.USD);
```

The currency is the only field on this key; together with the type of the key itself, this is all the information
the function needs to specify. The precise details of which USD discounting curve is used to satisfy this
requirement is a separate problem that is solved by market data IDs. 

The keys are used to build an instance of 
[`FunctionRequirements`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/FunctionRequirements.html)
in the `requirements` method and to request data from the
[`CalculationMarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/CalculationMarketData.html)
argument passed to the `execute` method.

#### Market Data IDs

Market data IDs are very similar to market data keys, but are used to uniquely identify the piece of market data
that will be used. They may contain additional fields in order to do this.

In the example above, a function uses a market data key to request a set of USD discount factors.
This keeps things as simple as possible from the function's perspective. However, the USD discount factors
are derived from a USD discounting curve, and there may be multiple such curves to choose from
(because of multiple _curve groups_). Additionally, the same curve may exist multiple times, having been calibrated
from different market observables (perhaps from different sources, or by using observables snapshotted
at different points in time). Therefore, two additional fields are needed to identify precisely the USD discount
factors to use: the curve group name, and the market data feed details.
The _market data rules_ specify these additional fields, and map the market data key (`DiscountCurveKey`)
into a market data ID (`DiscountCurveId`).

#### Market Data Rules

Market data rules specify a mapping between market data keys and market data IDs.
The rules can be very general and apply to all calculations, for example:

> Use the curve group "Default" as the source of all curves

Or they can be extremely specific:

> When pricing cross-currency swaps where one currency is CHF and the counterparty is "XYZ", use curve group
"ABC" built using Bloomberg as the source of the underlying data

### Market Data Boxes

Functions that perform calculations request market data from an instance of 
[`CalculationMarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/CalculationMarketData.html). 
The `getValue` method on this interface returns 
[`MarketDataBox<T>`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/market/MarketDataBox.html), 
where `T` is the type of the market data value used in the calculation for each scenario. The function requests 
the data for a scenario by calling `MarketDataBox.getValue(int scenarioIndex)`, passing in the index of the scenario.

A market data box can contain a single value for the data or it can contain multiple values, one for each 
scenario. If it contains a single value then the same value is used in every scenario.

Wrapping the data in a box allows a simple interface for looking up market data that hides whether there
is one value or multiple values. Without the box every function that uses market data would have to
handle the two cases separately.

The box also takes care of transforming the market data when using it to build other market data values
(see the `apply` methods). This means that market data functions and perturbations don't need
different logic to deal with single and multiple values.

Using a box allows scenario data to be stored more efficiently in some cases. For example, curve data for
multiple scenarios can include one copy of the x-axis data which is used in all scenarios. If a separate
curve were stored for each scenario that data would be unnecessarily stored multiple times.

In some cases a function might need to access the data for all scenarios at the same time. For example, if
part of the calculation is the same for all scenarios it can be done once and reused instead of recalculated
for each scenario. In this case a 
[`ScenarioMarketDataKey`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/market/ScenarioMarketDataKey.html) 
should be used to retrieve the scenario value from the
[`CalculationMarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/CalculationMarketData.html). 
