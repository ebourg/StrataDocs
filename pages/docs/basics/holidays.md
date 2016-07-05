---
title: Holidays
permalink: /holidays/
---

A key problem when working with dates is the impact of holidays and weekends.
To manage this complexity, a *holiday calendar* is used.

A holiday calendar implementation keeps track of which dates are holidays and which are weekends.
Different countries have different holiday dates and thus different calendars.
It is not unusual for individual exchanges or other financial entities to have their own calendar.


## Holiday Calendar

The `strata-basics` module includes a holiday calendar interface and some common implementations.
The key interface is ``HolidayCalendar`` which defines methods to query the calendar.

Each holiday calendar implementation has a unique name.
This can be used to obtain the holiday calendar via the static method ``HolidayCalendar.of(String)``:

```java
HolidayCalendar holCal = HolidayCalendar.of("GBLO");
```

All available holiday calendars can be listed using the static method  ``HolidayCalendar.extendedEnum()``.

Common holiday calendars can also be obtained using static constants on ``HolidayCalendars``:

```java
HolidayCalendar holCal = HolidayCalendars.GBLO;
```

Once a holiday calendar is obtained, various methods are available to query the calendar.
Some key methods are shown here, see the Javadoc for more information:

```java
// is the date a holiday/weekend or a business day
boolean holiday = holCal.isHoliday(LocalDate);
boolean busday  = holCal.isBusinessDay(LocalDate);
    
// next/previous business day
LocalDate nextDay = holCal.next(LocalDate);
LocalDate nextDay = holCal.nextOrSame(LocalDate);
LocalDate prevDay = holCal.previous(LocalDate);
LocalDate prevDay = holCal.previousOrSame(LocalDate);
    
// last business day of month
boolean lastBusDay   = holCal.isLastBusinessDayOfMonth(LocalDate);
LocalDate lastBusDay = holCal.lastBusinessDayOfMonth(LocalDate);
    
// number of business days
int days = holCal.daysBetween(LocalDate, LocalDate)
```

Note that when querying dates, there is no difference between a holiday and a weekend.


## Standard Holiday Calendars

Some common standard holiday calendars are provided.

### Location calendars

The following calendars are available for specific locations.
The intention of providing these calendars is to allow the system to be easily evaluated.
When using this library in production, OpenGamma strongly recommends replacing the data provided
with data from an external vendor of holiday information.

The holiday dates are based on original research and typically cover 1950 to 2099.
Future and past dates are an extrapolations of the known holiday dates.

| Name | Holidays                                         | Weekends          | ISDA reference      |
|------|--------------------------------------------------|-------------------|---------------------|
| CATO | Toronto (Canada) holidays                        | Saturday/Sunday   |                     |
| CHZU | Zurich (Switzerland) holidays                    | Saturday/Sunday   |                     |
| EUTA | TARGET interbank payment (Europe) holidays       | Saturday/Sunday   | section 1.8 (2006)  |
| FRPA | Paris (France) holidays                          | Saturday/Sunday   |                     |
| GBLO | London (UK) holidays                             | Saturday/Sunday   |                     |
| JPTO | Tokyo (Japan) holidays                           | Saturday/Sunday   |                     |
| NOOS | Oslo (Norway) holidays                           | Saturday/Sunday   |                     |
| NYFD | Federal Reserve Bank of New York holidays        | Saturday/Sunday   | section 1.9 (2006)  |
| NYSE | New York Stock Exchange holidays                 | Saturday/Sunday   | section 1.10 (2006) |
| USGS | United States Government Securities              | Saturday/Sunday   | section 1.11 (2006) |
| USNY | New York (USA) holidays                          | Saturday/Sunday   |                     |

### Simple calendars

The following simple calendars are also available.

| Name       | Holidays             | Weekends          |
|------------|----------------------|-------------------|
| NoHolidays | No holiday dates     | No weekends       |
| Sat/Sun    | No holiday dates     | Saturday/Sunday   |
| Fri/Sat    | No holiday dates     | Friday/Saturday   |
| Thu/Fri    | No holiday dates     | Thursday/Friday   |

