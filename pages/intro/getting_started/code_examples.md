---
title: Code Examples
permalink: /code_examples/
---

After exploring the [command-line tool]({{site.baseurl}}/command_line_tool),
Strata's programmatic examples are the next port of call. The example code is part of the main Strata repository.
To obtain this, see [obtaining Strata]({{site.baseurl}}/obtaining_strata).

The `strata-examples` module includes simple, standalone examples which run out-of-the-box.
These illustrate:

* Programmatic use of the supported [asset classes]({{site.baseurl}}/product_coverage) in the
`com.opengamma.strata.examples` package, such as `SwapPricingExample`.
* Extended examples of the programmatic use of the API in the `com.opengamma.strata.examples.finance` package,
such as `SwapPricingWithCalibrationExample`.
* The use of the declarative scenario API to run a historical simulation, producing P&L vectors which
could be used to calculate historical VaR, such as in `HistoricalScenarioExample`.
* Trade construction, such as in `SwapTradeExample`.
* Schedule generation implemented as a demo JavaFX UI by `ScheduleGui`.

This module also contains the code for the [command-line tool]({{site.baseurl}}/command_line_tool).
