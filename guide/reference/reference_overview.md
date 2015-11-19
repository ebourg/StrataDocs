---
title: Reference documentation
permalink: /reference_overview/
---

## Overview

The Strata codebase consists of a number of modules.
Detailed reference documentation on each module will expand over time.

Full documentation of the API is available in the [Javadoc]({{site.baseurl}}/apidocs/).
Note that any package with `impl` in the name is considered to be an implementation detail.


## Collect module

The `strata-collect` module provides a standard library for collections and utilities to support the rest of Strata.
The module builds on [Guava](https://github.com/google/guava), Google's high quality library of Java essentials.

The collect module adds features in a number of areas:

* Extended enums - provides support for `enum`-like data structures that are loaded at startup
* Functions - additional Java SE 8 functional interfaces
* Identifiers - a standard way to refer to an identifier
* Ranges - ranges of values
* Result - functional result model
* Time-Series - a series of values over time
* Tuple - pair and triple
* Validate - general utility classes


## Basics module

The `strata-basics` module provides basic concepts used in finance.
For more information, see the following guides:

* [Holidays]({{site.baseurl}}/holidays) - to determine if a date is a working day or a holiday
* [Date adjustments]({{site.baseurl}}/date_adjustments) - adjusting dates relative to holidays
* [Schedules]({{site.baseurl}}/schedules) - building periodic schedules
* [Value adjustments]({{site.baseurl}}/value_adjustments) - adjusting values relative to a schedule
* [Day counts]({{site.baseurl}}/day_counts) - converting date-based periods to numeric year fractions


## Product module

The `strata-product` module contains the main domain model, defining instruments such as
interest rate swaps, FRAs and futures.


## Market module

The `strata-market` includes the representations of the market, including curves and surfaces.


## Pricer module

The `strata-pricer` module provides standard analytics for pricing and risk calculations on financial instruments.
This depends on the `strata-math` module, which is intended to be an implementation detail.


## Calculation module

The `strata-calc` module provides a calculation engine capable of calculating risk analytics.
Given a list of trades and some configuration parameters, it will determine what market data is needed,
obtain it from a source, perform any necessary calibration, and calculate the desired results.


## Function module

The `strata-function` module includes the functions that operate within `strata-calc` to calculate
the desired results.


## Report module

The `strata-report` module provides a small framework for reporting on the results of calculations.
A tool provides the ability to use a report template to drive the calculations necessary to produce a simple report.
