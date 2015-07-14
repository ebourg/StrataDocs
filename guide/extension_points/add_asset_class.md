---
title: Adding a New Asset Class
permalink: /add_asset_class/
---
Strata includes support for a range of common asset classes, but support for new asset classes can easily be added. Three steps are required to add a new asset class:

* Define classes for the asset class
* Write functions to calculate measures for the new asset class - see [this guide]({{site.baseurl}}/add_measure/).
* Create pricing rules specifying how measures should be calculated for the new asset class - see [here]({{site.baseurl}}/calculation_rules/).

## Defining an Asset Class

### The Trade Model

The Strata trade model has three basic concepts: trades, securities and products.

A trade is the basic element of finance, a transaction between two counterparties.

A security is a standard contract that is traded, such as an equity share or futures contract. Securities are typically created once and shared using an identifier, represented by a [`StandardId`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/id/StandardId.html). They are often referred to as *reference data*. The standard implementation of a security is [`UnitSecurity`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/UnitSecurity.html).

A product is the financial details of the trade or security. A product typically contains enough information to be priced, such as the dates, holidays, indices, currencies and amounts. There is an implementation of [`Product`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/Product.html) for each distinct type of financial instrument.

Trades are typically classified as Over-The-Counter (OTC) and listed.

An OTC trade directly embeds the product it refers to. As such, OTC trades implement [`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/ProductTrade.html).

For example, consider an OTC instrument such as an interest rate swap. The object model consists of a [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/rate/swap/SwapTrade.html) that directly contains a [`Swap`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/rate/swap/Swap.html), where [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/rate/swap/SwapTrade.html) implements [`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/ProductTrade.html).

A listed trade contains a reference to the underlying security that is the basis of the trade. Rather than holding the security directly, a [`SecurityLink`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/SecurityLink.html) is used to loosely connect the trade to the security. The link permits the security to either be located externally, such as in a database, or to be embedded within the link. The security contains details of the actual product.

For example, consider a trade in a listed equity. The object model consists of a [`EquityTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/equity/EquityTrade.html) that contains a link to a [`Security`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/Security.html). The security will directly contain the underlying [`Equity`]({{site.baseurl}}/apidocs/com/opengamma/strata/finance/equity/Equity.html).
 
The key to understanding the model is appreciating the separation of products from trades and securities. In many cases, it is possible to price the product without knowing any trade details. This allows a product to be an underlying of another product, such as a swap within a swaption.

Note that on the listed side, it is often possible to price either against the market or against a model. Details for pricing against the market are primarily held in the security. Details for pricing against the model are primarily held in the product.

### Technology

The built-in asset classes in Strata are all immutable Joda Beans. See the [core technologies]({{site.baseurl}}/core_technologies/) documentation for details. New asset classes should follow the same pattern as the built-in classes to ensure interoperability with the rest of the system.
