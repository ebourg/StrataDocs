---
title: Calculation Flow
permalink: /calculation_flow/
---

{% include macros.html %}

{{note}} Strata 0.9 is a next-generation technology preview, and the details on this page are subject to change. {{end}}

## Overview

Strata's functionality is built around a well-defined calculation flow, with stages that each serve one purpose.
This is a key mechanism for achieving a separation of concerns between different parts of Strata, and ensuring that calculations fail fast.

<img alt="Calculation flow diagram" src="{{site.baseurl}}/images/calculation_flow.png" style="width:800px; height:240px;" />

The stages can be accessed and run individually, perhaps persisting the output to feed into the next stage for later
use, or they can be run sequentially through APIs that abstract across multiple stages.

## Calculation setup

At its core, Strata calculations operate on a list of trades, a list of columns and some rules.
The setup stage primarily involves choosing the columns and defining the calculation rules.

Each column is normally a thin wrapper around the risk measure to be calculated, such as present value or par rate.
When necessary, the column can also contain overrides to the default set of calculation rules,

The calculation rules have three parts:

* pricing rules - select the appropriate function to invoke
* market data rules - select the market data to use
* reporting currency - select the currency to convert to

The final part of setup is creating a suitable set of market data.
In many cases, the market data is known and can simply be assembled.

Where the market data is not known, Strata offers the option of using the calculation functions
to determine the data that is required for a specific set of trades, columns and rules.
To achieve this, create an instance of `CalculationTasks` and call `getRequirements()`.
These requirements allow the _market environment_ to be built in the next stage.

## Market data building

The second stage takes the market data requirements and attempts to build a market environment containing the required data.
There are several potential sources of market data for the environment being built:

* The market environment input to this stage. This can contain market data of any type that is being supplied externally,
which will always be used in preference to sourcing data from elsewhere.
If this is complete then sourcing data from elsewhere becomes irrelevant, and this input can be thought of as a market data 'snapshot'.
* If the requirement is for an historical time-series, the _time-series provider_.
* _Market data functions_, which can construct derived market data to satisfy a requirement.
For example, a market data function would be used to calibrate a curve from par rates if the calibrated curve is
not already in the supplied market environment.
* The _observable market data function_, which sources market data that is directly observable from a source.
Depending on the implementation in use, this could source the data from an external provider such as Bloomberg.

For example, if there is a requirement for a USD discounting curve, then there are two possibilities:

* The calibrated curve is already in the supplied market environment, in which case it will be used.
* The calibrated curve is not present in the supplied market environment, and a market data function is found which
can construct this, in which case it is used. This function will in turn have requirements for the necessary par rates,
driven by the curve configuration that it reads. These will attempt to be satisfied recursively.
If the par rates are not in the supplied market environment then, since it is very unlikely that a market data function
would be available to derive these, they will fall to the _observable market data function_ to source.

After this stage, no more market data needs to be sourced for the calculations to be executed.
It may be useful to inspect the results of this stage in advance of a long-running calculation job to check
for market data errors before executing the calculations.

This stage is implemented by `MarketDataFactory` in the method `buildMarketData`.

## Scenario building

This optional stage allows the market environment built in the previous stage to be used as the basis for applying
one or more sets of perturbations. The result of this stage is a _scenario market environment_ which satisfies
the original market data requirements across one or more scenarios.

Building the market environment for the scenarios up-front is a key part of allowing
[vector-based calculations]({{site.baseurl}}/performance/). It also means that, going into the next stage, all
necessary data has already been sourced or built, so the calculations can proceed as quickly as possible.

The scenarios are specified by the _scenario definition_ input which describes the perturbations to be applied.

This stage is implemented by `MarketDataFactory` in the method `buildMarketData` method taking
a `ScenarioDefinition`.

## Calculation runner

This stage runs the calculations necessary to produce the measures originally requested.
It can be invoked either with a standard _market environment_, or with a _scenario market environment_.

The output is the set of calculation results.
This a table containing the input trades as the rows and the requested measures as the columns.
Each 'cell' then contains one result, or one result for each scenario in the case of a _scenario market
environment_ being used.

This stage is implemented by the `CalculationRunner` component.

## Report runner

The final, optional stage allows the calculation results to be transformed into a report.
This transformation is driven by an input _report template_.

While the set of calculation results are provided as a simple table structure at a trade level, the
calculated values in the 'cells' are often not directly suitable for reporting even at this same trade level.
For example, a value corresponding to a curve sensitivity measure in a multi-curve environment may contain the
sensitivities to every curve in a nested data structure, or if multiple scenarios are present then each 'cell'
will contain a result for each scenario in a list.

A report is a user-facing table structure, designed for a particular purpose, which is suitable for backing a
grid in a UI, or for rendering directly as text or CSV.

The report runner extracts the necessary information from the input calculation results and outputs the report
defined by the report template.

This stage is implemented by `ReportRunner` in the method `runReport`.
