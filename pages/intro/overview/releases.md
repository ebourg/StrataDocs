---
title: Releases
permalink: /releases/
---

Releases of Strata are performed when a set of functionality has stabilized.
To access a release, see the options for [obtaining Strata]({{site.baseurl}}/obtaining_strata).

## Strata v1.1

*7 October 2016*

This release contains [61 fixed issues](https://github.com/OpenGamma/Strata/milestone/11?closed=1) -
15 of which are bug fixes.

The key features are:

* Measure-level and Calc-level API support for all asset classes
[#1263](https://github.com/OpenGamma/Strata/issues/1263), 
[#1344](https://github.com/OpenGamma/Strata/issues/1344), 
[#1331](https://github.com/OpenGamma/Strata/issues/1331)
* Additional holiday calendars and indices for SEK, DKK and PLN
[#1373](https://github.com/OpenGamma/Strata/issues/1373),
[#1326](https://github.com/OpenGamma/Strata/issues/1326)
* Enhanced performance for swap pricing
[#1293](https://github.com/OpenGamma/Strata/issues/1293),
[#1329](https://github.com/OpenGamma/Strata/issues/1329)
* More flexible loaders
[#1267](https://github.com/OpenGamma/Strata/issues/1267),
[#1269](https://github.com/OpenGamma/Strata/issues/1269),
[#1245](https://github.com/OpenGamma/Strata/issues/1245),
[#1249](https://github.com/OpenGamma/Strata/issues/1249),
[#1282](https://github.com/OpenGamma/Strata/issues/1282)
* Support FpML parameterized notional schedule
[#1242](https://github.com/OpenGamma/Strata/issues/1242)
* Enhanced explain present value
[#1256](https://github.com/OpenGamma/Strata/issues/1256),
[#1270](https://github.com/OpenGamma/Strata/issues/1270),
[#1362](https://github.com/OpenGamma/Strata/issues/1362)
* Better error messages
[#1280](https://github.com/OpenGamma/Strata/issues/1280),
[#1275](https://github.com/OpenGamma/Strata/issues/1275),
[#1225](https://github.com/OpenGamma/Strata/issues/1225),
[#1254](https://github.com/OpenGamma/Strata/issues/1254)
* FRA payment dates are now calculated correctly
[#1301](https://github.com/OpenGamma/Strata/issues/1301)

Feel free to give us feedback or ask a question in the [forums](http://forums.opengamma.com/).

#### Compatibility

This release is backwards compatible except for bond pricing.
For bonds, it was necessary to rename `BondGroup` to `RepoGroup` and to change
`LegalEntityDiscountingProvider` from a class to an interface.
Migration will mostly consist of simple renames.
See this [pull request](https://github.com/OpenGamma/Strata/pull/1368) for more details.

In addition, 14 methods were marked as deprecated, all with documented replacements.

As an advance warning, the CDS code is likely to change in a backwards incompatible way
in release v1.2. However, it remains our goal to avoid incompatibility as far as reasonably possible.


## Strata v1.0

*15 July 2016*

The first full release of Strata, after two years of development.
Strata is already in use in production and has now reached the point where v1.0 is appropriate.

The key features are:

* Measure-level API - a high level API calculating measures for one trade
* Calc-level API - a high level API calculating measures for a mixed portfolio of trades
* Pricer-level API - a low level API performing calculations for one trade
* Market data structures - representations of curves, surfaces and other kinds of market data
* Product domain model - beans representing different financial instruments
* Conventions, indices, and holiday calendars for common markets

The supported asset classes are:

* Swap - including Vanilla, OIS, Basis, Inflation, Cross Currency and Variable Notional
* Deliverable Swap Future (DSF)
* Constant Maturity Swap (CMS)
* Ibor cap/floor
* Swaptions
* Forward Rate Agreement (FRA)
* FX forward/spot - including Non-Delivered Forward (NDF)
* FX swap
* FX options - vanilla and single barrier
* STIR futures/options
* Bonds - Fixed coupon and Capital indexed
* Bond futures/option
* Term deposit
* Bullet payment
* CDS - currently being reviewed and subject to incompatible change

Feel free to give us feedback or ask a question in the [forums](http://forums.opengamma.com/).
   
  

----

## Strata v0.16

*5 July 2016*

This release prepares the way for v1.0, which will be the next release.
This primarily involved fixing bugs and mistakes in the API.

* Calculation API tightened to clearly separate scenario from non-scenario
* DSF based on standard market price, not decimal/fractional price
* Curve calibration with a Fed-Fund swap
* More control over IborFuture curve nodes
* Add calendar and indices for Norway
* Fixed inflation swap conventions
* Scenario generation API refactored
* New surface interpolators - surface data must now be sorted
* Renamed term deposit conventions
* Renamed scenario return types, eg. CurrencyValuesArray to CurrencyScenarioArray
* Restructured examples
* Removed implementation-specific classes from public API

Feel free to ask a question in the forums if you have difficulty porting code from v0.15 to v0.16.


## Strata v0.15

*17 June 2016*

This release contains a new measures API.
The measures API is intended to be the main access to the functionality of Strata.
Applications currently using the pricer API should consider using the measures API instead.

For example, consider using `SwapTradeCalculations` instead of `DiscountingSwapTradePricer`.

* New measures API
* Extended set of measures access via the calculation API
* Renamed PV01 measures
* Add a calculator to obtain the notional equivalent
* Add currency exposure and current cash to some instruments
* Add support for known amount stubs on swaps (fixed and ibor legs)

Feel free to ask a question in the forums if you have difficulty porting code from v0.14 to v0.15.


## Strata v0.14

*9 June 2016*

This release contains a major simplification of the calculation API.
The "rules" part of the calculation API has been replaced with a "parameter" concept,
for example `RatesMarketDataLookup` that selects from the complete set of market data.
The new design is far simpler, with logic moved out of the framework and into code that applications
can control and extend. The results model now includes column headers.
The calculation runner and market data factory are both affected.

There has also been significant refactoring of packages, module structure and market data.
Separate curve and surface sensitivity objects have been combined.
Scenario market data is now more widely available, with the `MarketDataKey` concept removed.
The `strata-function` project has been renamed to `strata-measure`.
The goal has been to provide a structure that will last Strata in the long term.
v1.0 is approaching and expected at the end of June and will provide backwards compatible API stability.

* Simplified and extensible calculation API
* Curve sensitivity rebucketing
* FX single barrier option trade model and pricer
* FX vanilla option Vanna Volga pricer
* SABR swaption calibrator
* Additional swap conventions
* Abstraction for market data parameters

Feel free to ask a question in the forums if you have difficulty porting code from v0.12 to v0.14.


## Strata v0.12

*11 April 2016*

This release contains a major rework of the security model to introduce positions.
`GenericFuture` and `GenericFutureOption` have gone, with `GenericSecurity` in use instead.
A new `Security` interface is added, with implementations that refer to other securities by identifier.
There is also a new `Position` interface with `SecurityPosition` and `GenericSecurityPosition` implementations.
The next release will be v0.14, not v1.0.

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
