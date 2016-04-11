---
title: Releases
permalink: /releases/
---

Releases of Strata are performed when a set of functionality has stabilized.
To access a release, see the options for [obtaining Strata]({{site.baseurl}}/obtaining_strata).


## Strata v0.12

*11 April 2016*

This release contains a major rework of the security model to introduce positions.
`GenericFuture` and `GenericFutureOption` have gone, with `GenericSecurity` in use instead.
A new `Security` interface is added, with implementations that refer to other securities by identifier.
There is also a new `Position` interface with `SecurityPosition` and `GenericSecurityPosition` implementations.
The next release will be v0.13, not v1.0.

* New security and position domain model
* Replaced generic future/option by generic security
* Inflation swap conventions
* Canadian holidays and indices
* Improved FX rate triangulation
* Enhanced examples

Feel free to ask a question in the forums if you have difficulty porting code from v0.11 to v0.12.


## Strata v0.11

*18 March 2016*

This release contains a major rework of the trade model to introduce reference data.
Holiday calendars are now treated as data, referenced by an identifier.
Securities can also now be referenced by identifier, although only for mark-to-market pricing at present.
While there will no doubt be further trade model tweaks before v1.0, this set of changes should be by far the largest.
The holiday calendar data provided with Strata is now available using `ReferenceData.standard()`.
These changes also caused `StandardId` to change package.
The next release will be v0.12, not v1.0.

* New asset classes - Capital Indexed Bonds
* Refactored trade model treating holidays and securities as reference data
* Added dedicated index observation objects for querying market data
* Type-safe attributes can be attached to trades
* Add Canadian holidays and indices
* Allow holiday calendars to be queried beyond known dates

Feel free to ask a question in the forums if you have difficulty porting code from v0.10 to v0.11.


## Strata v0.10

*29 February 2016*

Additional preparatory work for v1.0. The next release will be v0.11, not v1.0.
The next release will contain a significant refactoring of the trade model to allow holidays
to be managed as reference data.

* New asset classes - CMS, CMS cap/floor and Ibor cap/floor
* Calculation function design simplified, with all functions operating as multi-measure
* Enhance FX conversion of function results
* Enhanced FpML parsing, including inflation swaps
* Control over the date generated for each node in curve calibration
* Synthetic curve calibrator, calibrating on synthetic instruments
* Schedule generation handling all-stub schedules, plus performance tweaks


## Strata v0.9

*14 January 2016*

Additional preparatory work for v1.0.

* Simpler calculation runner concept for calculations with many trades, many measures or many scenarios
* Unified pricing for Swaptions, with present value available via the calculation runner
* Add currency exposure to pricers
* Use data files to define holidays and indices
* Update interpolators and extrapolators
* Efficient data structures for large scenarios


## Strata v0.8

*19 November 2015*

A major update that brings functionality much closer to that needed for v1.0.

* Curve calibration
* New asset classes - FX Forward, FX Swap, FX NDF, Term Deposit, Deliverable Swap Futures, Ibor STIR Futures, Bullet Payment
* Pricing level support for Swaptions, Bonds, FX vanilla options, Bond Futures, Bond Future Options, STIR Future Options (Ibor)
* Loader project, allowing data to be loaded from XML and CSV formats
* Reporting framework promoted from Beta
* Removed dependency on legacy Analytics codebase


## Strata v0.7

*25 June 2015*

The initial release.

* Calculation engine, calculating risk measures, managing market data and scenarios
* Product definitions
* Foundations, including day counts, schedules, holidays and indices
* Asset classes - FRA, Interest Rate Swap, Generic Futures, Generic Future Options, Credit Default Swap
