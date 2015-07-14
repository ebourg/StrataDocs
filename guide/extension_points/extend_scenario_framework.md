---
title: Extending the Scenario Framework
permalink: /extend_scenario_framework/
---

## Background

The [scenario framework]({{site.baseurl}}/scenarios/) provides a way to execute the same set of calculations multiple times using different market data. For example, a scenario might be used to calculate the present value of a portfolio of swaps with and without a one basis point shift applied to the curves.

The fundamental concepts in the scenario framework are market data filters and market data perturbations. The scenario framework uses filters and perturbations to produce the market data used in each scenario.

### Market Data Filters

A market data filter contains the logic which decides whether an item of market data should be modified when running a scenario. It might be as simple as checking the type of the market data, for example when applying a shift to all curves. Or it can contain arbitrarily complicated logic that looks at the metadata associated with the market data or even the data value itself.

A market data filter can be thought of as a predicate; the scenario framework passes an item of market data to a filter and the filter returns `true` if it should be modified for the scenario, `false` if not.

### Perturbations

A perturbation contains the logic to modify an item of market data so it can be used in a scenario. In the example above, a perturbation would be applied to each curve to apply the one basis point shift.

If a filter returns `true` for a piece of market data, the scenario framework passes the data to the associated perturbation. The perturbation returns a new item of market data created by applying a transformation the original.

## The MarketDataFilter Interface

Market data filters are implementations of the `MarketDataFilter` interface. 

```java
public interface MarketDataFilter<T, I extends MarketDataId<T>> {

  public abstract Class<?> getMarketDataIdType();

  public abstract boolean apply(I marketDataId, T marketData);
}
```

The type parameter `T` is the type of market data handled by the filter. It is important to note that a market data filter deals with a single type of market data.

The `getMarketDataIdType` method returns the type of market data handled by the filter. The scenario framework only passes market data to a filter if it is of the correct type. This means filter implementations don't have to contain boilerplate code to check the type of the market data and cast it to the expected type.

The `apply` method contains the logic which decides whether the market data should be modified in the scenario. It receives the market data value and the `MarketDataId` which identifies it. The market data ID identifies the value and possibly contains additional metadata used when deciding whether the value should be perturbed.

### Implementing MarketDataFilter

This section demonstrates how to implement `MarketDataFilter` using one of the standard filters included in Strata as an example. The filter is `CurveNameFilter`. It handles curves, and matches if the name of the curve is the same as the curve name in the filter

```java
/**
 * A market data filter which matches a curve by name.
 */
@BeanDefinition
public final class CurveNameFilter implements MarketDataFilter<Curve, CurveId>, ImmutableBean {

  /** The name of the curve matched by this filter. */
  @PropertyDefinition(validate = "notNull")
  private final CurveName curveName;

  ...

  @Override
  public Class<?> getMarketDataIdType() {
    return CurveId.class;
  }

  @Override
  public boolean apply(CurveId curveId, Curve curve) {
    return curve.getName().equals(curveName);
  }
 
  ...
}
```

#### The Class Declaration

The notable features of the class declaration are:
 
* The `@BeanDefinition` annotation and `ImmutableBean`; all data objects in Strata are immutable [Joda Beans]({{site.baseurl}}/core_technologies/). 
* The type parameters; the filter handles instances of `Curve` and curves are identified by instances of `CurveId`.
* The `curveName` field; the filter matches curves if the curve name is equal to `curveName`.

#### The getMarketDataIdType method

Returns `Curve.class` so the scenario framework knows what kind of market data the filter can handle. This class should correspond to the type parameter `T`.

#### The apply method

The `apply` method compares the name of the curve with the curve name field in the filter, returning `true` if they are equal.

## The Perturbation Interface

Perturbations are implementations of the `Perturbation` interface.

```java
public interface Perturbation<T> {

  public abstract T apply(T marketData);
}
```

The type parameter `T` is the type of market data handled by the perturbation. It is important to note that a perturbation deals with a single type of market data.

The `apply` method has an argument for the market data value and returns an object of the same type.

### Implementing Perturbation

This section demonstrates how to implement `Perturbation` using one of the standard perturbations included in Strata as an example. The perturbation is `CurveParallelShift`. It applies a shift to all points on a curve.

```java
/**
 * Perturbation which applies a parallel shift to a curve.
 * <p>
 * The shift can be absolute or relative.
 * An absolute shift adds the shift amount to each point on the curve.
 * A relative shift applies a scaling to each point on the curve.
 * <p>
 * For example, a relative shift of 0.1 (10%) multiplies each value on the curve by 1.1, 
 * and a shift of -0.2 (-20%) * multiplies the rate by 0.8. So for relative shifts the 
 * shifted value is {@code (value x (1 + shift))}.
 */
@BeanDefinition(builderScope = "private")
public final class CurveParallelShift implements Perturbation<Curve>, ImmutableBean {

  /** The type of shift to apply to the Y values of the curve. */
  @PropertyDefinition(validate = "notNull")
  private final ShiftType shiftType;

  /** The amount by which Y values are shifted. */
  @PropertyDefinition(validate = "notNull")
  private final double shiftAmount;
  
  ...

  @Override
  public Curve apply(Curve curve) {
    return ParallelShiftedCurve.of(curve, shiftType, shiftAmount);
  }
  
  ...
}
```

### The Class Declaration

The notable features of the class declaration are:
 
* The `@BeanDefinition` annotation and `ImmutableBean`; all data objects in Strata are immutable [Joda Beans]({{site.baseurl}}/core_technologies/). 
* The type parameter; the perturbation handles instances of `Curve`.
* The `shiftType` field; the shift amount can be added to the curve Y values (`ShiftType.ABSOLUTE`) or it can be used to scale the curve values (`ShiftType.RELATIVE`).
* The `shiftAmount` field; the amount by which the curve Y values are shifted.

### The apply Method

The `apply` method creates an instance of `ParallelShiftedCurve`, a decorator which wraps the curve and applies a shift when Y values are requested.
