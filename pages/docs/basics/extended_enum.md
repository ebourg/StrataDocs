---
title: Extended Enums
permalink: /extended_enum/
---

The Java `enum` concept is great for data that is constant and never changes.
However, sometimes there is a need for data that rarely changes, but sometimes does.
There is also a need for constants that can be extended by end-users.
The "Extended Enum" concept covers these use cases.

Strata includes the following extended enums (and many others):

* [`BusinessDayConvention`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/date/BusinessDayConvention.html)
* [`DayCount`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/date/DayCount.html)
* [`HolidayCalendar`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/date/HolidayCalendar.html)
* [`RollConvention`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/schedule/RollConvention.html)
* [`IborIndex`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/index/IborIndex.html)
* [`OvernightIndex`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/index/OvernightIndex.html)
* [`FraConvention`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/fra/type/FraConvention.html)
* [`FixedIborSwapConvention`]({{site.baseurl}}/apidocs/com/opengamma/strata/product/swap/type/FixedIborSwapConvention.html)

Each extended enum consists of:

* an interface, which is the primary type used in the application
* one or more implementation classes, which may be package-scoped
* a helper class of constants, typically named as the plural form of the interface's name


## Using an Extended Enum

An extended enum instance is a normal Java class, and using it in application code is simple.

```java
// find using the unique name
DayCount dayCount = DayCount.of("Act/365F");

// constants may be supplied for common names
DayCount dayCount = DayCounts.ACT_365F;

// a list of all names can also be obtained
Map<String,DayCount> dayCounts = DayCount.extendedEnum().lookupAll();
```

Once obtained, any method on the extended enum interface can be used.


## Unique name

The key concept of an extended enum is that it has a _unique name_ by which it is referred.
The instance of the extended enum may contain other state and methods but it can always be referred to by name.
As such, all extended enums implement the interface [`Named`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/named/Named.html).

The extended enum may be implemented using a [Joda-Bean](http://www.joda.org/joda-beans/), however this is not required.
If it is, then the extended enum will implement the [Joda-Convert](http://www.joda.org/joda-convert/) annotations
`@FromString` and `@ToString` to ensure that when written to XML/JSON/Binary, only the string name is used.

Each extended enum is managed by a single instance of [`ExtendedEnum`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/named/ExtendedEnum.html).
The instance is typically defined as a private static constant.
Most extended enums will make the constant available via a static `extendedEnum()` method.

### Alternate names

In addition to the unique name, each extended enum instance may have zero to many _alternate names_.
This can be used for backwards compatibility, where the unique name is changed.
It can also be used where there is more than one name commonly used for the concept.

The standard `of(String)` lookup method matches alternate names.

### External names

Extended enums often refer to standard industry concepts.
For example, the ISDA FpML specification includes long lists of standard codes for concepts such as day counts and indices.
These external code lists can be tied to extended enums.
When they are, the name used is called the _external name_.

For example, Strata includes external names that map the FpML names to the following extended enums:

* `BusinessDayConvention`
* `DayCount`
* `RollConvention`

There may be multiple groups of external names to handle different external providers of data.
For example, the mapping used by FpML may differ from that used by Bloomberg.

External names are made available via the static `extendedEnum().externalNames(String group)` method.
The standard `of(String)` lookup method does not match external names.

## Adding or replacing Extended Enums

The key feature of extended enums is that application code can add to the known set, or replace the existing ones.
This means that the definition of a holiday calendar supplied by Strata can be replaced if necessary.

It is intended that extended enums are known at system startup.
While it is possible to add or replace instances after the system has started, doing so would require use of
concurrent data structures that could slow the application down.

### Ini files

Each extended enum is defined by one or more `.ini` files.
The ini file must be located on the classpath in one of two specific locations,
`com/opengamma/strata/config/base` or `com/opengamma/strata/config/application`.
The "base" location is intended for use by Strata.
The "application" location is intended for use by application code.
The list of known locations can be expanded by setting the system property
`com.opengamma.strata.config.directories` on the command line.

For example, if the extended enum interface is `com.opengamma.strata.basics.date.DayCount`,
then an application ini file must be named: `com/opengamma/strata/config/application/DayCount.ini`.

The [`ResourceConfig`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/io/ResourceConfig.html) class
is responsible for loading and combining the ini files.

The ini file typically has the following format (described below):

```
[chain]
chainNextFile = false

[providers]
com.opengamma.strata.basics.date.StandardDayCounts = constants
com.opengamma.strata.basics.date.Business252DayCount = instance

[alternates]
Actual/Actual ISDA = Act/Act ISDA

[externals.FpML]
30/360 = 30/360 ISDA
```

### Ini file chain

The list of known locations provides a deterministic ordering to the loading of ini files.
The "base" location is lower priority than the "application" location.
There must only ever be one ini file in each location on the classpath.

The `[chain]` section is used to control how the files link together.
The `chainNextFile` property is a boolean, "true" or "false".
When processing more than one ini file, processing will continue to the next file if the flag is true,
and ignore lower priority files if the flag is false.

The default value for `chainNextFile` is true, thus the whole `[chain]` section is normally omitted.

### Ini file providers

The extended enum instances are made available via _providers_ defined in the `[providers]` section.
Each entry in the section has a `key=value` form, where the key is a full class name and the value is the provider type.
The three types of provider are:

* `constants` - the class contains public static final constants of the extended enum type
* `lookup` - the class implements [`NamedLookup`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/named/NamedLookup.html)
with a no-args constructor
* `instance` - the class has a static field named `INSTANCE` that is of type
[`NamedLookup`]({{site.baseurl}}/apidocs/com/opengamma/strata/collect/named/NamedLookup.html)

When initializing, the providers are loaded and used to find the extended enum instances.

In the example above, two providers are specified. Both are non-public classes.
`StandardDayCounts` defines a set of public static final constants of type `DayCount`.
`Business252DayCount` defines public static final constant `INSTANCE` of type `NamedLookup<DayCount>`.
Both will be used to lookup extended enums.

### Ini file alternate names

The `[alternates]` section defines alternate names for the extended enum.
Each entry in the section has a `key=value` form, where the key is the alternate name and the value is the unique name.

In the example above, the name "Actual/Actual ISDA" in FpML has the same meaning as the name "Act/Act ISDA" in Strata.

### Ini file external names

The `[externals.XXX]` section defines external names for the extended enum, where `XXX` is the name of the group.
Each entry in the section has a `key=value` form, where the key is the external name and the value is the unique name.

In the example above, the name "30/360" in FpML has the same meaning as the name "30/360 ISDA" in Strata.

