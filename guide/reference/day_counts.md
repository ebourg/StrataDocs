---
title: Reference documentation - Day Counts
permalink: /day_counts/
---

## Introduction

A *day count* is used to convert dates to a numeric representation for financial maths.

A date consists of 12 months of varying lengths and occasional leap days.
As a result of this variation there are many possible ways to convert the amount of time between
two dates into a number. While counting the number of days between two dates is simple, there
are many different ways to convert the amount of time to a fraction of a year.
Each day count specifies a specific set of rules for the conversion.
Different rules are used in different markets and for different products.

The standard approach is based on converting the period between two dates to a *year fraction*.
A year fraction is a floating point number, where one year is represented by 1 and half a year by 0.5.

Most day counts are relatively simple, operating solely on the two dates, returning the year fraction.
Some day counts are more complicated, needing additional information about an associated schedule.

See [Wikipedia](http://en.wikipedia.org/wiki/Day_count_convention) for more background information.


## Day Count

The `strata-basics` project includes a comprehensive implementation of day count conventions.
The key interface is `DayCount` which defines methods to obtain and query a specific day count.

Each day count implementation has a unique name.
This can be used to obtain the day count via the static method `DayCount.of(String)`:

```java
DayCount dayCount = DayCount.of("Act/360");
```

All available day counts can be listed using the static method  `DayCount.extendedEnum()`.

Common day counts can also be obtained using static constants on `DayCounts`:

```java
DayCount dayCount = DayCounts.ACT_360;
```

Once a day count is obtained, two methods are available to obtain the year fraction:

```java
double yf = dayCount.yearFraction(LocalDate, LocalDate);
double yf = dayCount.yearFraction(LocalDate, LocalDate, ScheduleInfo);
```

Both methods convert the period of time between two dates to a floating point number.
The first handles all simple day counts, the second allows additional information about the schedule to be passed in.

> Certain day count implementations cannot give an answer without the schedule information.
> As such, those implementations will throw an exception when called without `ScheduleInfo`.


## Standard Day Counts

The following standard day counts have been implemented.
Each has a string name which acts as a unique key to obtain the day count.
They are also available as constants on the `DayCounts` class.
For more information on each, see the Javadoc of `DayCounts`:

### Actual/360

<table>
<tr><th>Name<td>Act/360
<tr><th>Constant<td>DayCounts.ACT_360
<tr><th>Description<td>Divides the actual number of days by 360.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is always 360.
<tr><th>Also&nbsp;known<td>'French'.
<tr><th>Definition<td>2006 ISDA definitions 4.16e and ICMA rule 251.1(i) part 1
</table>

### Actual/364

<table>
<tr><th>Name<td>Act/364
<tr><th>Constant<td>DayCounts.ACT_364
<tr><th>Description<td>
Divides the actual number of days by 364.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is always 364.
</table>

### Actual/365 Fixed

<table>
<tr><th>Name<td>Act/365F
<tr><th>Constant<td>DayCounts.ACT_365F
<tr><th>Description<td>
Divides the actual number of days by 365.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is always 365.
<tr><th>Also&nbsp;known<td>'English'.
<tr><th>Definition<td>2006 ISDA definitions 4.16d.
</table>

### Actual/365 Actual

<table>
<tr><th>Name<td>Act/365 Actual
<tr><th>Constant<td>DayCounts.ACT_365_ACTUAL
<tr><th>Description<td>
Divides the actual number of days by 366 if a leap day is contained, or by 365 if not.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is 366 if the period contains February 29th, if not it is 365.<br />
The first day in the period is excluded, the last day is included.
<tr><th>Also&nbsp;known<td>'Act/365A'.
</table>

### Actual/365 Long

<table>
<tr><th>Name<td>Act/365L
<tr><th>Constant<td>DayCounts.ACT_365L
<tr><th>Description<td>
Divides the actual number of days by 365 or 366.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is determined by examining the frequency and the period end date (the date of the next coupon).<br />
If the frequency is annual then the denominator is 366 if the period contains February 29th, if not it is 365.<br />
The first day in the period is excluded, the last day is included.<br />
If the frequency is not annual, the the denominator is 366 if the period end date is in a leap year, if not it is 365.
<tr><th>Schedules<td>This day count requires <code>ScheduleInfo</code>.
<tr><th>Also&nbsp;known<td>'Act/365 Leap year'.
<tr><th>Definition<td>2006 ISDA definitions 4.16i and ICMA rule 251.1(i) part 2 as later clarified by ICMA and Swiss Exchange.
</table>

### Actual/365.25

<table>
<tr><th>Name<td>Act/365.25
<tr><th>Constant<td>DayCounts.ACT_365_25
<tr><th>Description<td>
Divides the actual number of days by 365.25.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is always 365.25.    
</table>

### NL/365

<table>
<tr><th>Name<td>NL/365
<tr><th>Constant<td>DayCounts.NL_365
<tr><th>Description<td>
Divides the actual number of days omitting leap days by 365.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period minus the number of occurrences of February 29.<br />
The denominator is always 365.<br />
The first day in the period is excluded, the last day is included.
<tr><th>Also&nbsp;known<td>'Act/365 No Leap'.
</table>

### Actual/Actual ISDA

<table>
<tr><th>Name<td>Act/Act ISDA
<tr><th>Constant<td>DayCounts.ACT_ACT_ISDA
<tr><th>Description<td>
Divides the actual number of days in a leap year by 366 and the actual number of days in a standard year by 365.
<p>
The result is calculated in two parts.<br />
The actual number of days in the requested period that fall in a leap year is divided by 366.<br />
The actual number of days in the requested period that fall in a standard year is divided by 365.<br />
The result is the sum of the two.<br />
The first day in the period is included, the last day is excluded.
<tr><th>Definition<td>2006 ISDA definitions 4.16b.
</table>

### Actual/Actual ICMA

<table>
<tr><th>Name<td>Act/Act ICMA
<tr><th>Constant<td>DayCounts.ACT_ACT_ICMA
<tr><th>Description<td>
Divides the actual number of days by the actual number of days in the coupon period multiplied by the frequency.
<p>
The result is calculated as follows.<br />
First, the underlying schedule period is obtained treating the first date as the start of the schedule period.<br />
Second, if the period is a stub, then nominal regular periods are created matching the
schedule frequency, working forwards or backwards from the known regular schedule date.<br />
An end-of-month flag is used to handle month-ends.<br />
If the period is not a stub then the schedule period is treated as a nominal period below.<br />
Third, the result is calculated as the sum of a calculation for each nominal period.<br />
The actual days between the first and second date are allocated to the matching nominal period.<br />
Each calculation is a division. The numerator is the actual number of days in
the nominal period, which could be zero in the case of a long stub.<br />
The denominator is the length of the nominal period  multiplied by the frequency.<br />
The first day in the period is included, the last day is excluded.
<tr><th>Schedules<td>This day count requires <code>ScheduleInfo</code>.
<tr><th>Also&nbsp;known<td>'ISMA-99'.
<tr><th>Definition<td>
2006 ISDA definitions 4.16c and ICMA rule 251.1(iii) and 251.3 as
<a href="http://www.isda.org/c_and_a/pdf/mktc1198.pdf">later clarified</a> by ISDA.
</table>

### Actual/Actual AFB

<table>
<tr><th>Name<td>Act/Act AFB
<tr><th>Constant<td>DayCounts.ACT_ACT_AFB
<tr><th>Description<td>
Divides the actual number of days by 366 if a leap day is contained, or by 365 if not,
with additional rules for periods over one year.
<p>
The result is a simple division.<br />
The numerator is the actual number of days in the requested period.<br />
The denominator is determined by examining the period end date (the date of the next coupon).<br />
The denominator is 366 if the schedule period contains February 29th, if not it is 365.<br />
The first day in the schedule period is included, the last day is excluded.<br />
Read the Javadoc for a discussion of the algorithm, the
<a href="http://www.banque-france.fr/fileadmin/user_upload/banque_de_france/archipel/publications/bdf_bof/bdf_bof_1999/bdf_bof_01.pdf">original French text</a>
and confusion with the <a href="http://www.isda.org/c_and_a/pdf/ACT-ACT-ISDA-1999.pdf">ISDA clarification</a>.
<tr><th>Definition<td>
Association Francaise des Banques in September 1994 as 'Base Exact/Exact' in 'Definitions Communes plusieurs Additifs Techniques'.
</table>

### 30/360 ISDA

<table>
<tr><th>Name<td>30/360 ISDA
<tr><th>Constant<td>DayCounts.THIRTY_360_ISDA
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If the second day-of-month is 31 and the first day-of-month is 30 or 31, change the second day-of-month to 30.<br />
If the first day-of-month is 31, change the first day-of-month to 30.
<tr><th>Also&nbsp;known<td>'30/360 U.S. Municipal' or '30/360 Bond Basis'.
<tr><th>Definition<td>2006 ISDA definitions 4.16f.
</table>

### 30U/360

<table>
<tr><th>Name<td>`30U/360`
<tr><th>Constant<td>`DayCounts.THIRTY_U_360`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month and the end of February.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If the schedule uses EOM convention and both dates are the last day of February, change the second day-of-month to 30.<br />
If the schedule uses EOM convention and the first date is the last day of February, change the first day-of-month to 30.<br />
If the second day-of-month is 31 and the first day-of-month is 30 or 31, change the second day-of-month to 30.<br />
If the first day-of-month is 31, change the first day-of-month to 30.
<p>
This day count has different rules depending on whether the EOM rule applies or not.<br />
The EOM rule is set in the <code>ScheduleInfo</code> and defaults to true.
<p>
There are two related day counts.<br />
The '30U/360 EOM' rule is identical to this rule when the EOM convention applies.<br />
The '30/360 ISDA' rule is identical to this rule when the EOM convention does not apply.
<tr><th>Schedules<td>This day count assumes EOM convention is true if <code>ScheduleInfo</code> is not specified.
<tr><th>Also&nbsp;known<td>'30/360 US', '30US/360' or '30/360 SIA'.
</table>

### 30U/360 EOM

<table>
<tr><th>Name<td>`30U/360 EOM`
<tr><th>Constant<td>`DayCounts.THIRTY_U_360_EOM`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month and the end of February.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If both dates are the last day of February, change the second day-of-month to 30.<br />
If the first date is the last day of February, change the first day-of-month to 30.<br />
If the second day-of-month is 31 and the first day-of-month is 30 or 31, change the second day-of-month to 30.<br />
If the first day-of-month is 31, change the first day-of-month to 30.
<p>
This day count is not dependent on the EOM flag in <code>ScheduleInfo</code>.
<p>
This is the same as '30U/360' when the EOM convention applies.<br />
This day count would typically be used to be explicit about the EOM rule applying.<br />
In most cases, '30U/360' should be used in preference to this day count.
<tr><th>Also&nbsp;known<td>'30/360 US', '30US/360' or '30/360 SIA'.
</table>

### 30/360 PSA

<table>
<tr><th>Name<td>`30/360 PSA`
<tr><th>Constant<td>`DayCounts.THIRTY_360_PSA`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month and the end of February.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If the first date is the last day of February, change the first day-of-month to 30.<br />
If the second day-of-month is 31 and the first day-of-month is 30 or 31, change the second day-of-month to 30.<br />
If the first day-of-month is 31, change the first day-of-month to 30.
<tr><th>Schedules<td>This day count assumes EOM convention is true if <code>ScheduleInfo</code> is not specified.
<tr><th>Also&nbsp;known<td>'30/360 BMA' (PSA is the Public Securites Association, BMA is the Bond Market Association).
</table>

### 30E/360 ISDA

<table>
<tr><th>Name<td>`30E/360 ISDA`
<tr><th>Constant<td>`DayCounts.THIRTY_E_360_ISDA`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month and the end of February.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If the first day-of-month is 31, change the first day-of-month to 30.<br />
If the second day-of-month is 31, change the second day-of-month to 30.<br />
If the first date is the last day of February, change the first day-of-month to 30.<br />
If the second date is the last day of February and it is not the maturity date, change the second day-of-month to 30.
<tr><th>Schedules<td>This day count requires <code>ScheduleInfo</code>.
<tr><th>Also&nbsp;known<td>'30E/360 German' or 'German'.
<tr><th>Definition<td>2006 ISDA definitions 4.16h.
</table>

### 30E/360

<table>
<tr><th>Name<td>`30E/360`
<tr><th>Constant<td>`DayCounts.THIRTY_E_360`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay is then calculated once day-of-month adjustments have occurred.<br />
If the first day-of-month is 31, it is changed to 30.<br />
If the second day-of-month is 31, it is changed to 30.
<tr><th>Also&nbsp;known<td>'30/360 ISMA', '30/360 European', '30S/360 Special German' or 'Eurobond'.
<tr><th>Definition<td>2006 ISDA definitions 4.16g and ICMA rule 251.1(ii) and 252.2.
</table>

### 30E+/360

<table>
<tr><th>Name<td>`30E+/360`
<tr><th>Constant<td>`DayCounts.THIRTY_EPLUS_360`
<tr><th>Description<td>
A 30/360 style algorithm with special rules for the 31st day-of-month.
<p>
The result is calculated as <code>(360 * deltaYear + 30 * deltaMonth + deltaDay) / 360</code>.<br />
The deltaDay and deltaMonth are calculated once adjustments have occurred.<br />
If the first day-of-month is 31, it is changed to 30.<br />
If the second day-of-month is 31, it is changed to 1 and the second month is incremented.
</table>

### 1/1

<table>
<tr><th>Name<td>`1/1`
<tr><th>Constant<td>`DayCounts.ONE_ONE`
<tr><th>Description<td> An artificial day count that always returns one.
<tr><th>Definition<td>Defined by the 2006 ISDA definitions 4.16a
</table>

