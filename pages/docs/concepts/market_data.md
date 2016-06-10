---
title: Market Data
permalink: /market_data/
---

The term "market data" in Strata refers to any value which is observable in the market or is derived solely from
observable market data.

For example, futures prices are observable market data and can be looked up directly from a provider of
market data such as Bloomberg or Reuters. By contrast, a calibrated yield curve is an example of non-observable
market data as it is derived from observable data such as quoted rates and futures prices.

Measures such as present value or PV01 are distinguished from market data because they are derived from portfolio
data as well as market data.


## Containers

In Strata, a _market data container_ holds a set of market data.
There are two main containers:

* [`MarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/MarketData.html) -
holds data without reference to scenarios
* [`ScenarioMarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/scenario/ScenarioMarketData.html) -
holds multi-scenario data

### Single-scenario Market Data

The `MarketData` interface is the main container for market data when not processing scenarios.
It is tied to a single valuation date.

The API is map-like, providing the ability to access each piece of market data using an identifier,
and to return a new `MarketData` instance with a different market data value:

```java
public interface MarketData {

  boolean containsValue(MarketDataId<?> id) {
  <T> T getValue(MarketDataId<T> id);
  <T> Optional<T> findValue(MarketDataId<T> id);
  <T> MarketData withValue(MarketDataId<T> id, T value);
  ...
}
```

The identifier [`MarketDataId`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/MarketDataId.html)
is an interface with implementations such as `CurveId` and `SwaptionVolatilitiesId`.
Applications can write their own identifiers and use them to add additional market data.

For example, to obtain a `Curve` from `MarketData`:

```java
MarketData marketData = loadMarketData();
Curve curve = marketData.getValue(CurveId.of("DefaultGroup", "USD-Discounting"));
```

### Multi-scenario Market Data

The `ScenarioMarketData` interface is the main container for market data when using scenarios.
The simplest way to think of it is as a list of `MarketData` instances, one for each scenario,
however the API does not expose the data in that way. Instead, the API is map-like, but
with each piece of data being a "box" that provides the scenario values for that identifier:

```java
public interface ScenarioMarketData {

  boolean containsValue(MarketDataId<?> id) {
  <T> MarketDataBox<T> getValue(MarketDataId<T> id);
  <T> Optional<MarketDataBox<T>> findValue(MarketDataId<T> id);
  <T> MarketData withValue(MarketDataId<T> id, T value);
  ...
}
```

Each [`MarketDataBox`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/scenario/MarketDataBox.html)
contains the value for each scenario.
The box API exposes the data by scenario index - `MarketDataBox.getValue(int scenarioIndex)`.

```java
public interface MarketDataBox<T> {

  T getValue(int scenarioIndex) {
  ...
}
```

Wrapping the data in a box allows a simple interface for looking up market data that hides whether there
is one value or multiple values. Without the box every function that uses or manipulates market data
would have to handle the two cases separately.

Using a box allows scenario data to be stored more efficiently in some cases. For example, curve data for
multiple scenarios can include one copy of the x-axis data which is used in all scenarios. If a separate
curve were stored for each scenario that data would be unnecessarily stored multiple times.
Similarly, if the same value is to be used for all scenarios, it can be stored once.

There are three ways to access the scenarios in `ScenarioMarketData`.
The first way is to query the box and use `MarketDataBox.getValue(int scenarioIndex)`.
This is simple, exposing the internal data structure of `ScenarioMarketData`.

The second way is to convert the box to a special multi-scenario data type.
This is useful when processing market data in bulk.
For example, where there is dedicated pricing code to price a single instrument against many scenarios in a single go.
The multi-scenario data type is extracted using a 
[`ScenarioMarketDataId`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/scenario/ScenarioMarketDataId.html).

```java
public interface ScenarioMarketData {

  <T,U> U getScenarioValue(ScenarioMarketDataId<T, U> id) {
  ...
}
```

The final way is the simplest when processing once scenario at a time.
It provides a `MarketData` view over `ScenarioMarketData` for a single scenario:

```
public interface ScenarioMarketData {

  Stream<MarketData> scenarios();
  MarketData scenario(int scenarioIndex);
  ...
}
```

## Building

The [`MarketDataFactory`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/MarketDataFactory.html)
interface provides the ability to build market data.

The `MarketDataFactory` API provides two methods that build the data from the following inputs:

* [`MarketDataRequirements`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/MarketDataRequirements.html) -
the requirements
* [`MarketDataConfig`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/MarketDataConfig.html) -
the configuration
* [`ScenarioMarketData`]({{site.baseurl}}/apidocs/com/opengamma/strata/data/scenario/ScenarioMarketData.html) -
 the input data
* [`ReferenceData`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/ReferenceData.html) -
the reference data
* [`ScenarioDefinition`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/ScenarioDefinition.html) -
the scenario definition (optional)


### Requirements

The `MarketDataFactory` API methods take in a set of requirements that specify what market data is needed.
The requirements consist of a set of identifiers, of type `MarketDataId`, that specify the data.

These requirements can be built manually.
However, if the intention is to use the `CalculationRunner`, then they can be obtained from
[`CalculationTasks`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/runner/CalculationTasks.html).
This queries the calculation functions to determine the market data that is needed to perform the calculation.

### Configuration

The `MarketDataFactory` API methods take in a 
[`MarketDataConfig`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/MarketDataConfig.html)
instance providing the necessary configuration.

Configuration is separate from the requirements - the configuration is normally determined up front
before the system starts, whereas the requirements could be based on the needs of a specific set of trades.

Examples of `MarketDataConfig` include how to build curves and root finding tolerances for calibration.

### Input data

The `MarketDataFactory` API methods take in a `ScenarioMarketData` instance representing known data.
Any data that is present on input will not be built or rebuilt.

Reference data is provided to the factory.

### Scenario definition

The `ScenarioDefinition` is used to specify how to create the scenarios.
Each scenario is typically a "bump" or "shift" to the base set of data.
The mechanism supports bumping both observable market data and calibrated data.

### Providers

The default `MarketDataFactory` implementation uses two providers of external data:

* [`ObservableDataProvider`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/ObservableDataProvider.html) -
provides observable market data
* [`TimeSeriesProvider`]({{site.baseurl}}/apidocs/com/opengamma/strata/calc/marketdata/TimeSeriesProvider.html) -
provides time-series of historic market data

These interfaces can be implemented to call Bloomberg, Reuters or any other data system.

### Example

Consider the case where the requirements specify the need for a curve with the name 'USD-Discounting'.
There are two possibilities:

* The curve is already in the input market data, in which case it will be used.
* The curve is not present in the input market data, in which case it will be built.

If the curve has to be built, then a `MarketDataFunction` will be found and used to create the data.
The `MarketDataFunction` for curves uses the `MarketDataConfig` to obtain a definition of the curve.
The configuration specifies the observable market data that the curve is based on, such as quotes
for FRAs and Swaps. The factory will then recursively try to find the quotes, either from the input
market data or by calling `ObservableDataProvider`.

Once all the observable data has been obtained, the curve can be calibrated.
The factory will return a `ScenarioMarketData` instance combining the input data and the calibrated data.
The curve will be available using the same identifier that was specified in the requirements.
