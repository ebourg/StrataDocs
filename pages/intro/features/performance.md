---
title: Performance
permalink: /performance/
---

{% include macros.html %}

{{note}} Strata 0.11 is a next-generation technology preview.
The results presented here include those from a closed source implementation of vector based pricers that are backed by Strata. {{end}}


## Target use-cases

Many market risk use-cases involve runnning hundreds or thousands of market data scenarios against every trade,
for example in calculating initial margin (IM), or in Monte-Carlo simulations.
Strata was designed with this firmly in mind, to ensure that it is possible to price a trade against many different
scenarios in an efficient manner, and then to distribute the computation over many trades efficiently across CPU cores.


## Lightweight calculation runner

The Strata calculation runner is very lightweight, and carries little overhead in comparison to a thread-distributed
loop, which means small numbers of trades and scenarios can be handled with little start up cost.

## Indicative performance

### Scalar pricing

Strata's built-in pricers are scalar pricers: they loop over the supplied scenarios, performing one calculation at a time.

In our testing, a basic desktop computer (**Intel Core 2 Quad circa 2006/7**) running Strata using its built-in pricers
calculated the present value of 1000 USD swaps for a single scenario, on a **single CPU core**, in approximately 50ms.
This is summarised in the table below.

| Trade count |  Scenario count |  Run time (s) | PVs/core/s |
|:-----------:|:---------------:|:-------------:|:----------:|
| 1000        |              1  |     0.05      |   20,000   |


### Vector pricing

Strata also supports vector-based pricing as a first class concept: extension points allow pricers to be written which
operate on multiple scenarios at once, producing a vector of results. By employing applied mathematics, the market data
from the scenarios can be compactly represented in vector form, allowing pricing to proceed on entire vectors of
market data in almost the same way as the trade could be priced for a single scenario.
This batching of calculations can lead to a considerable increase in performance versus scalar pricing.

Vector-based pricing is particularly useful in initial margin (IM) calculations, where common methodologies
involve thousands of scenarios.

Internal testing showed significant performance gains by using our own vector-based pricer implementations in Strata
for the present value calculations required to compute initial margin (IM) using two methodologies.
The figures below were obtained on a **16 core, 2Ghz machine** for USD swaps with uniformly distributed
maturities and an average maturity of 15 years.

|  Methodology  | Trade count |  Scenario count |  Run time (s) | PVs/core/s |
|:-------------:|:-----------:|:---------------:|:-------------:|:----------:|
| A             |   202,000   |           1700  |     117       |   183,000  |
| B             |   202,000   |           5000  |     159       |   397,000  |

Strata already has the necessary extension points to enable these implementations.
A closed source prototype has been developed to prove the capability and to provide these numbers.
