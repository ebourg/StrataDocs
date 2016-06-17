---
title: Product Model
permalink: /product_model/
---

The product model in Strata, defined in `strata-product`, provides Java classes representing
a broad range of common asset classes. It is a _data only_ design.
There is little to no behaviour in the classes.
Logic for pricing and risk is provided separately in the `strata-pricer` project.
Applications will typically use `strata-measure` to access risk measures.


## Concepts

The Strata product model has four basic concepts: products, securities, trades and positions.


### Product

A [product]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Product.html)
is the financial details of the instrument. A product typically contains enough information
to be priced, such as the dates, holidays, indices, currencies and amounts.
There is an implementation of [`Product`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Product.html)
for each distinct type of financial instrument.

The `Product` interface is a marker and has no methods:

```java
public interface Product {
}
```

### Security

A [security]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Security.html)
is a standard contract that is traded, such as an equity share or futures contract.
Securities are typically created once and shared using an identifier, represented by a
[`SecurityId`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/SecurityId.html).
They are often referred to as *reference data*.

A security always has an associated product.
The security refers to any underlying securities by identifier.
By contrast, the associated product refers to any underlying products directly, as embedded objects.

The `Security` interface is as follows:

```java
public interface Security {

  SecurityInfo getInfo();
  SecurityId getSecurityId();
  Currency getCurrency();
  ImmutableSet<SecurityId> getUnderlyingIds();

  SecuritizedProduct createProduct(ReferenceData refData);
  Trade createTrade(TradeInfo tradeInfo, double quantity, double tradePrice, ReferenceData refData);

}
```

The `SecurityInfo` instance provides a place to add information about the trade,
such as the identifier and currency, which are also exposed directly.
The underlying identifiers can be obtained, which is useful for securities that are based on other securities.
The last two methods allow the product and trade to be obtained from the security.


### Trade

A [trade]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Trade.html)
is the basic element of finance, a transaction between two counterparties.

The `Trade` interface is minimal:

```java
public interface Trade extends CalculationTarget {

  TradeInfo getInfo();

}
```

The `TradeInfo` instance provides a place to add information about the trade,
such as the counterparty and trade date.
The `CalculationTarget` super-interface allows trades to be processed by the Calculation API.


### Position

A [position]({{site.baseurl}}/apidocs/com/opengamma/strata/product/Position.html)
consists of a quantity of a security. It is used with securities as there is no need to
distinguish individual security trades from one another in most cases.

The `Position` interface is as follows:

```java
public interface Position extends SecurityQuantity, CalculationTarget {

  PositionInfo getInfo();
  SecurityId getSecurityId();
  double getQuantity();

}
```

The `PositionInfo` instance provides a place to add information about the trade,
such as the position identifier.
The position also provides access to the security identifier and quantity.
The `CalculationTarget` super-interface allows trades to be processed by the Calculation API.


## Design

The key to understanding the design is appreciating the separation of products from trades and securities.


### OTC trades

An OTC trade directly embeds the product it refers to. As such, OTC trades implement
[`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/ProductTrade.html).

For example, consider an OTC instrument such as an interest rate swap.
The object model consists of a [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/SwapTrade.html)
that directly contains a [`Swap`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/Swap.html),
where [`SwapTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/SwapTrade.html) implements
[`ProductTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/ProductTrade.html).


### Listed trades (in securities)

A listed trade can be defined in three different ways.

The first approach is to use [`SecurityTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/SecurityTrade.html).
A `SecurityTrade` stores just the security identifier, quantity and trade price.
When the trade needs to be priced, the identifier can be resolved to a `Security` using
[`ReferenceData`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/ReferenceData.html).
The reference data could be backed by an in-memory store or a database.

The second approach is to use the generic security trade 
[`GenericSecurityTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/GenericSecurityTrade.html).
This contains a `GenericSecurity`, which has just enough information about the security to be able
to convert the market quote to a monetary value.
This approach avoids the need to use reference data.

The third approach is to use a more specific trade type, such as
[`BondFutureTrade`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/bond/BondFutureTrade.html).
These types include the product details directly so that no reference data is needed.

For example, consider a bond future.
In the first approach, the application would create a `SecurityTrade` using the identifier of the future.
The reference data would be populated, mapping the identifier to an instance of `BondFutureSecurity`
and additional identifiers for each of the underlying `FixedCouponBondSecurity` instances.

In the second approach, the application would create a `GenericSecurityTrade` wrapping a `GenericSecurity`.
The `GenericSecurity` would be created with the correct data to describe relationship between
the price of the security and a monetary value.

In the third approach, the trade would be defined using `BondFutureTrade`. In this case,
the trade directly holds the product model of the `BondFuture` and each underlying `FixedCouponBond`.
There is thus no need to populate the reference data with securities.


### Positions (in securities)

A position in a security can be thought of as an aggregated quantity of an underlying security.
Two approaches are supported for positions.

The first approach is to use [`SecurityPosition`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/SecurityPosition.html).
A `SecurityPosition` stores just the security identifier and quantity.
When the trade needs to be priced, the identifier can be resolved to a `Security` using
[`ReferenceData`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/ReferenceData.html).
The reference data could be backed by an in-memory store or a database.

The second approach is to use the generic security position 
[`GenericSecurityPosition`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/GenericSecurityPosition.html).
This contains a `GenericSecurity`, which has just enough information about the security to be able
to convert the market quote to a monetary value.
This approach avoids the need to use reference data.


## Resolved form

In most cases, each trade and product has a parallel _resolved_ form.
For example, `Swap` and `ResolvedSwap`.

The unresolved form is a description of the trade or product that could live in long-term persistence, such as a database.
The resolved form is a short-lived representation designed for pricing.

Conversion from the unresolved to resolved form requires a `ReferenceData` instance.
This is primarily used to resolve holiday calendars and securities.
