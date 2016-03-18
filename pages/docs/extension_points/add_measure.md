---
title: Adding a New Measure
permalink: /add_measure/
---
## Measures

In Strata, measures define the values that can be calculated for a trade or other calculation target.
For example, Strata provides a standard set of measures including present value and PV01 (see the
[`Measures`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/config/Measures.html) class).
When a user requests a calculation they specify the measures that should be calculated and the rules defining
how they should be calculated.

The set of measures calculated by Strata is extensible.
Users can add new measures for the built-in asset classes and can also add support for the built-in measures
for new asset classes.

## Calculation Functions

Measures are calculated by implementations of
[`CalculationFunction`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/runner/function/CalculationFunction.html).
Adding a new measure to Strata requires three steps:

* Create a function to calculate the measure
* Create a `Measure` instance to identify the measure and 
* Provide pricing rules linking the `Measure` to the function

### The CalculationFunction Interface

The interface `CalculationFunction` is implemented by all classes that calculate values for measures.
It contains four methods:

```java
public interface CalculationFunction<T extends CalculationTarget> {

  Set<Measure> supportedMeasures();

  Currency naturalCurrency(T target, ReferenceData refData);

  FunctionRequirements requirements(T target, Set<Measure> measures, ReferenceData refData);

  Map<Measure, Result<?>> calculate(T target, Set<Measure> measures, CalculationMarketData marketData, ReferenceData refData);

}
```

### Supported measures

Each function implementation will handle one or more measures.
The `supportedMeasures` method specifies which measures are supported.

### Natural currency

The `naturalCurrency` method provides the "natural" currency of the specified target.

For single-currency trades, the "natural" currency is the currency of the trade.

For cross-currency trades, the choice of "natural" currency is more arbitrary.
It may be currency of the fixed leg, the currency of the first leg, the base
currency in terms of the standard market ordering, or anything other choice that is consistent.


### Requirements

The `requirements` method provides the ability to determine the market data needed
for the combination of the trade and measures. This can be used to validate that the
market data is available before pricing, or to drive the process of creating the market data.
More details can be found [here]({{site.baseurl}}/market_data/).

#### Function requirements

The `requirements` method has a parameter for the calculation target and returns an instance of `FunctionRequirements`.
The requirements specify the market data required by the function to calculate a value for the target.

Market data is identified by implementations of `MarketDataKey`.
The function creates a market data key for each piece of market data it requires and populates a set of
`FunctionRequirements`. The requirements contain three types of values:

* Single values, for example a curve or a quoted price
* Time series of quoted values
* Output currencies

##### Single Market Data Values

Single market data values are individual items are market data used in the calculations, and they can be of any type.
A their simplest they might be a `double` value representing a quoted price or rate.
They can also be complex values derived from underlying data, for example a curve.

Single market data values can be values that are directly observable in the market, for example rates or prices,
or they can be derived from other underlying market data, for example calibrated curves or volatility surfaces.

##### Time Series

Time series contain multiple values of an item of observable market data over a ranges of dates.
For example, a series of index rates used for historical fixings.

The values in a time series are always of type `double`.

##### Output Currencies

The Strata calculation engine is able to automatically convert currency values into different currencies for
the purposes of reporting. In order to perform this conversion the required FX rates must be available in the environment. 

The engine must know which currencies are included in the results in order to provide the correct FX rates.
Therefore if the result of the function includes any currency value, the currencies should be included in
the set of output currencies.

#### Example requirements Implementation

The code below shows an example of a `requirements` method taken from the Strata class `FraCalculationFunction`.
It demonstrates how to create a set of `FunctionRequirements` for the data required to calculate the price of a FRA.

A FRA references one or two indices and one currency. In order to calculate the price of a FRA the
following market data is required:

* A time series of historical rates for each of the indices
* A forward curve for predicting the future values of the rates for each of the indices
* A discount curve for the currency used for discounting future values

```java
@Override
public FunctionRequirements requirements(FraTrade trade, Set<Measure> measures, ReferenceData refData) {
  Fra fra = trade.getProduct();

  // Create a set of all indices referenced by the FRA
  Set<IborIndex> indices = new HashSet<>();

  // The main index is always present
  indices.add(fra.getIndex());

  // The index used for linear interpolation is optional
  fra.getIndexInterpolated().ifPresent(indices::add);

  // Create a key identifying the rate of each index referenced by the FRA
  Set<ObservableKey> indexRateKeys = indices.stream()
      .map(IndexRateKey::of)
      .collect(toImmutableSet());

  // Create a key identifying the forward curve of each index referenced by the FRA
  Set<MarketDataKey<?>> indexCurveKeys = indices.stream()
      .map(IborIndexCurveKey::of)
      .collect(toImmutableSet());

  // Create a key identifying the discount factors for the FRA currency
  Set<DiscountCurveKey> discountFactorsKeys = ImmutableSet.of(DiscountCurveKey.of(fra.getCurrency()));

  return FunctionRequirements.builder()
      .singleValueRequirements(Sets.union(indexCurveKeys, discountFactorsKeys))
      .timeSeriesRequirements(indexRateKeys)
      .outputCurrencies(fra.getCurrency())
      .build();
}
```

The logic of the method performs the following steps:

1. Builds a set containing the indices referenced by the FRA
1. Builds a set of `IndexRateKey` instances for the indices to identify the time series of index rates
1. Builds a set of `IborIndexCurveKey` instances identifying the forward curve for each index
1. Creates a `DiscountCurveKey` identifying the discount curve for the FRA currency
1. Creates a set of `FunctionRequirements` containing the keys and with the FRA currency as the output currency 

### Calculate

The `calculate` method calculates a value for each of the specified measures for the calculation target (normally a trade).
The method parameters are the calculation target, measures and an instance of `CalculationMarketData` containing
the market data required for the calculation.

To perform efficient calculations, the interface is designed to handle multiple measures and multiple scenarios efficiently.
In order to achieve this, the `calculate` method is expected to calculate multiple values.
This may allow functions to avoid repeating common calculations when a value is calculated for the
same target across multiple scenarios and measures.

In simple cases, or when integrating with existing calculation libraries, the underlying calculations are
likely to produce one value at a time. In fact the default pricers included with Strata behave this way.
In this case it is the job of the `calculate` method to unpack the scenario market data, call the underlying
calculations repeatedly and pack the results into a single return value.

#### Looking up Market Data

A function requests market data by calling the following methods on `CalculationMarketData`:

* `getValue`
* `getTimeSeries`

The single argument to these methods is the market data key identifying the market data required.
The return value of `getTimeSeries` is a `LocalDateDoubleTimeSeries`. The return value of `getValue`
is a `MarketDataBox` which provides a market data value for each scenario. The market data value for
each scenario is provided by `MarketDataBox.getValue(int scenarioIndex)`.

If the market data doesn't contain a value for the key an exception will be thrown.
The exception will be caught by the engine and the results will contain an error explaining the calculation
failed because the market data was not available.

#### Return Values

As explained above, the `calculate` method performs calculations for all scenarios at once.
The calculated values can be divided into two categories:

* Aggregate values, for example the average, maximum or minimum value across all scenarios.
* Individual values, one for each scenario. 

If the calculation produces an aggregate value there is are no restrictions on the return type of `calculate`.

If the calculation produces a value for each scenario the calculate method should return an implementation of
`ScenarioResult`. This allows the calculation engine to handle the results more intelligently in the
common case of running a single scenario.

If the calculated value contains currency amounts the return value should implement `CurrencyConvertible`.
Convertible values can be automatically converted to the reporting currency.

### Function Design Guidelines

The Strata calculation engines performs calculations in parallel so it is possible a function will be executed
concurrently on multiple threads with different targets. Therefore functions implementations must be thread safe.

It is strongly recommended that functions should be completely stateless, receiving everything required to
perform the calculation via method arguments. This not only ensures they are thread safe but makes it
immediately obvious they are safe.

If a function needs to store any configuration parameters as fields, the fields should be final
and the configuration objects should be immutable.
