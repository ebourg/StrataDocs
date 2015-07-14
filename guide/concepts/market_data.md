---
title: Market Data
permalink: /market_data/
---

Market data is a fundamental aspect of a risk system and most calculations performed by the Strata calculation engine are likely to use market data. Market data is a first class concept in Strata.

## Definition

The term "market data   " in Strata refers to any value which is observable in the market or is derived solely from observable market data. 

For example, FX rates and futures prices are observable market data and can be looked up directly from a provider of market data such as Bloomberg or Reuters. 

A calibrated yield curve is an example of non-observable data as it is derived from observable data such as quoted rates and futures prices.

It is important to note that measures such as present value or PV01 which are calculated for trades or portfolio are not considered to be market data as they are derived from portfolio data as well as market data.

## Concepts

### Market Data Building

In Strata, market data values are assembled in advance of any calculations. This means that all market data needed for a set of calculations is available before any of the calculations are performed. This has a number of advantages: 

* The lifecycle of market data is not tied to the calculations - it can be examined, modified, persisted and restored independently
* Each item of market data is built once even if it is required by multiple calculations
* The calculation engine can modify the data and repeat the calculations to simulate different scenarios without the calculations needing to be aware of it
* It is possible to verify that all market data is available before starting potentially long-running calculations

### Requesting Market Data for Calculations

If market data must be assembled before starting any calculations, it implies that it must be possible to find out what data is required before starting the calculations. The method `CalculationFunction.requirements` provides this information. See "[Adding a New Measure]({{site.baseurl}}/add_measure/)" for details.

### Identifying Market Data

In order for functions to declare the the market data they require and to request it during their calculations, there must be a way to identify market data. This is done using implementations of `MarketDataKey` and `MarketDataId`.

#### Market Data Keys

Market data keys are used by functions to identify a market data value. The type of the market data key identifies the type of the value and the fields of the key identify the value itself. For example, the set of discount factors for USD are identified by an instance of `DiscountFactorsKey` with a currency of USD.

If a function needs discount factors for USD it creates a key:

```java
key = DiscountFactorsKey.of(Currency.USD);
```

The keys are used to build an instance of `FunctionRequirements` in the `requirements` method and to request data from the `CalculationMarketData` argument passed to the `execute` method.

#### Market Data IDs

Market data IDs are very similar to market data keys, but are a system-wide unique identifier. A key is only unique in the context of a particular function.

For example, a set of discount factors is derived from a discount curve. A discount curve is calibrated as part of a curve group. A curve group is built using observable data from an underlying feed of observable data. There can be multiple curve groups in the system.
  
In oder to uniquely identify a set of discount factors the following pieces of information are needed:

* Type (discount factors)
* Currency
* Curve group name
* Market data feed

The class `DiscountFactorsId` contains this information.

#### Market Data Rules

In order to provide the market data for a calculation the system must know the IDs of the required market data. But the functions return a set of market data keys from the `requirements` method, not IDs. Therefore there must be a step to convert the keys into IDs. This is the job of the `MarketDataRules`.
 
Market data rules specify a mapping between market data keys and IDs. Market data rules can be very general and apply to all calculations, for example:

> Use the curve group "Default" as the source of all curves

Or they can be extremely specific:

> When pricing cross-currency swaps where one currency is CHF and the counterparty is "XYZ", use curve group "ABC" built using data from Bloomberg as the source of the discount factors

