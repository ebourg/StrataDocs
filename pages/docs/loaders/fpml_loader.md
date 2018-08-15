---
title: FpML loader
permalink: /fpml_loader/
---

The Financial products Markup Language (FpML) loader is used to load trades into the system.
It is one of a number of [loaders]({{site.baseurl}}/loaders) included in Strata.


## Loader

Trades can be loaded using the [`FpmlDocumentParser`]({{site.baseurl}}/apidocs/com/opengamma/strata/loader/fpml/FpmlDocumentParser.html)

```
ResourceLocator locator = ResourceLocator.ofFile(filename);
FpmlPartySelector selector = FpmlPartySelector.matching("MyBank");
FpmlDocumentParser parser = FpmlDocumentParser.of(selector);
List<Trade> trades = parser.parseTrades(locator.getByteSource());
```


### Loader configuration

The FpML loader requires an [`FpmlPartySelector`]({{site.baseurl}}/apidocs/com/opengamma/strata/loader/fpml/FpmlPartySelector.html)
This is necessary as the FpML data structure is neutral as to the direction of a trade.
Instead of referring to "pay" and "receive", it declares "party A pays" and party B receives.
The Strata data model takes the opposite view, with each trade stored with Pay/Receive or Buy/Sell concepts
expressed from "our" point of view. The selector is used to bridge the gap between the two.
As such, the job of the selector is to pick the party that represents "us" in the FpML data.

Advanced use cases may require configuring the FpML loader further.
See [`FpmlTradeInfoParserPlugin`]({{site.baseurl}}/apidocs/com/opengamma/strata/loader/fpml/FpmlTradeInfoParserPlugin.html)
and [`FpmlParserPlugin`]({{site.baseurl}}/apidocs/com/opengamma/strata/loader/fpml/FpmlParserPlugin.html).


## Format

The FpML format is defined at [fpml.org](https://www.fpml.org) and is an XML dialect.
Registration is required to see the formal specification, however these links to working drafts also work:

* [Data document](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-main-5-8_xsd/elements/dataDocument.html) - the overall XML document
* [Swap](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-ird-5-8_xsd/elements/swap.html)
* [FRA](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-ird-5-8_xsd/elements/fra.html)
* [Swaption](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-ird-5-8_xsd/elements/swaption.html)
* [FX single](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-fx-5-8_xsd/elements/fxSingleLeg.html)
* [FX swap](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-fx-5-8_xsd/elements/fxSwap.html)
* [Term deposit](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-fx-5-8_xsd/elements/termDeposit.html)
* [Bullet payment](https://www.fpml.org/spec/fpml-5-8-3-wd-3/html/confirmation/schemaDocumentation/schemas/fpml-ird-5-8_xsd/elements/bulletPayment.html)

The Strata parsers will ignore FpML elements that do not impact on pricing.
However, if the parser detects an FpML element that is known to affect pricing
but is not supported by Strata, an exception will be thrown.
