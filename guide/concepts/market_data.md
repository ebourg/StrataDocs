---
title: Market Data
permalink: /market_data/
---

Market data is a fundamental aspect of a risk system and most calculations performed by the Strata calculation engine are likely to use market data. Therefore market data is a first class concept in Strata.

## Concepts

TODO 
* Define market data
* Market data is built in advance
    * Each item of market data is built once, even if it required by multiple calculations.
    * It is possible to confirm that all market data is available before starting a potentially long-running calculation.
    * The calculation engine can modify the market data before executing the calculations in order to run different scenarios.
* Market data is identified by keys and IDs
* Market data rules are used to select the market data for a calculation (i.e. convert keys to IDs)
