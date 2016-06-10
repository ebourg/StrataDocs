---
title: Reference Data
permalink: /reference_data/
---

The term "reference data" in Strata refers to information that tends to change slowly,
such as holiday calendars and information about securities.
By contrast, [market data]({{site.baseurl}}/market_data), such as quotes, tend change quickly.


## Container

Strata provides a single container for reference data -
[`ReferenceData`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/ReferenceData.html)

The API is map-like, providing the ability to access each piece of reference data using an identifier:

```java
public interface ReferenceData {

  boolean containsValue(ReferenceDataId<?> id) {
  <T> T getValue(ReferenceDataId<T> id);
  <T> Optional<T> findValue(ReferenceDataId<T> id);
  ...
}
```

The identifier [`ReferenceDataId`]({{site.baseurl}}/apidocs/com/opengamma/strata/basics/ReferenceDataId.html)
is an interface with implementations such as `HolidayCalendarId` and `SecurityId`.
Applications can write their own identifiers and use them to add additional reference data.

For example, to obtain a `Security` from `ReferenceData`:

```
ReferenceData refData = loadReferenceData();
Security security = refData.getValue(SecurityId.of("OG-Ticker", "IBM"));
```

## Standard reference data

Strata provides a standard set of reference data, including data for [common holiday calendars]({{site.baseurl}}/holidays).
This can be accessed using `ReferenceData.standard()` and is ideal for getting the system up and running.
