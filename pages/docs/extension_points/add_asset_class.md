---
title: Adding a New Asset Class
permalink: /add_asset_class/
---
Strata includes support for a range of common asset classes, but support for new asset classes can easily be added.
Three steps are required to add a new asset class:

* Define classes for the asset class
* Writing the pricing logic
* Providing a function to integrate the new asset class into the Calculation API


## Defining an Asset Class

Once the [product model]({{site.baseurl}}/product_model) design is understood, the process
of creating the asset class is relatively simple

For an OTC product "Foo", the following classes will be needed:

* FooTrade - implements ProductTrade
* Foo - implements Product
* ResolvedFooTrade - implements ResolvedTrade
* ResolvedFoo - implements ResolvedProduct

See `FraTrade`, `Fra`, `ResolvedFraTrade` and `ResolvedFra` for an example to copy.

For a listed security "Moo", the following classes will be needed:

* MooTrade - implements SecuritizedProductTrade
* MooSecurity - implements Security
* Moo - implements SecuritizedProduct
* ResolvedMooTrade - implements ResolvedTrade
* ResolvedMoo - implements ResolvedProduct

See `BondFutureTrade`, `BondFutureSecurity`, `BondFuture`, `ResolvedBondFutureTrade` and `ResolvedBondFuture` for an example to copy.
Note that the primary difference between `BondFutureSecurity` and `BondFuture` is that
`BondFutureSecurity` refers to the underlying securities by identifier, whereas `BondFuture` refers
directly to the `FixedCouponBond` products.


### Technology

The built-in asset classes in Strata are all immutable Joda Beans.
See the [core technologies]({{site.baseurl}}/core_technologies/) documentation for details.
New asset classes should follow the same pattern as the built-in classes to ensure interoperability with the rest of the system.


## Writing the pricing logic

The pricing logic should typically follow the design pattern of the `strata-pricer` project.
This will typically involve new market data structures.


## Providing a new calculation function

See [this guide]({{site.baseurl}}/add_measure/).

