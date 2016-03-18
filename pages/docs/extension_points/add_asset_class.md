---
title: Adding a New Asset Class
permalink: /add_asset_class/
---
Strata includes support for a range of common asset classes, but support for new asset classes can easily be added.
Three steps are required to add a new asset class:

* Define classes for the asset class
* Write functions to calculate measures for the new asset class - see [this guide]({{site.baseurl}}/add_measure/).
* Create pricing rules specifying how measures should be calculated for the new asset class.

## Defining an Asset Class

### The Trade Model

The Strata trade model has three basic concepts: trades, securities and products.

A trade is the basic element of finance, a transaction between two counterparties.

A security is a standard contract that is traded, such as an equity share or futures contract.
Securities are typically created once and shared using an identifier, represented by a
[`SecurityId`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/SecurityId.html).
They are often referred to as *reference data*.

A product is the financial details of the trade or security. A product typically contains enough information
to be priced, such as the dates, holidays, indices, currencies and amounts.
There is an implementation of [`Product`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Product.html)
for each distinct type of financial instrument.

Trades are typically classified as Over-The-Counter (OTC) and listed.

An OTC trade directly embeds the product it refers to. As such, OTC trades implement
[`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/ProductTrade.html).

For example, consider an OTC instrument such as an interest rate swap.
The object model consists of a [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/SwapTrade.html)
that directly contains a [`Swap`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/Swap.html),
where [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/SwapTrade.html) implements
[`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/ProductTrade.html).

A listed trade can be defined in two ways.

The first approach is to use [`SecurityTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/SecurityTrade.html).
A `SecurityTrade` stores just the security identifier, quantity and trade price.
When the trade needs to be priced, the identifier can be resolved to a `Security` using
[`ReferenceData`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/market/ReferenceData.html).
The reference data could be backed by an in-memory store or a database.

The second approach is to use a more specific trade type, such as
[`BondFutureTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/bond/BondFutureTrade.html).
These types include the product details directly so that no reference data is needed.
As such, this approach avoids the need to use the Strata `Security` classes.

For example, consider a bond future.
In the first approach, the application would create a `SecurityTrade` using the identifier of the future.
The reference data would be populated, mapping the identifier to an instance of `BondFutureSecurity`
and additional identifiers for each of the underlying `FixedCouponBondSecurity` instances.

In the second approach, the trade would be defined using `BondFutureTrade`. In this case,
the trade directly holds the product model of the `BondFuture` and each underlying `FixedCouponBond`.
There is thus no need to populate the reference data with securities.

The key to understanding the model is appreciating the separation of products from trades and securities.
It is often possible to price either against the market or against a model.
Details for pricing against the market are held in the security.
Details for pricing against the model are held in the product.


### Technology

The built-in asset classes in Strata are all immutable Joda Beans.
See the [core technologies]({{site.baseurl}}/core_technologies/) documentation for details.
New asset classes should follow the same pattern as the built-in classes to ensure interoperability with the rest of the system.
