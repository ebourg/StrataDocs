---
title: Command-line Tool
permalink: /command_line_tool/
---

{% include macros.html %}

Strata includes a command-line tool for quickly exploring the built-in coverage and reporting features. This is distributed as a standalone zip file including the tool as well as example data.

<img alt="Calculation flow diagram" src="{{site.baseurl}}/images/strata_report_tool_screenshot.png" />

## Background

Legacy market risk systems typically require extensive set-up before they can be used to price instruments; usually a database has to be populated with conventions, currencies, holiday data, pricing configuration and market data, before the system can be run as a server, trades loaded, and eventually reports run.

Strata is different. Although, of course, it ultimately needs the same inputs, at its heart it is a stateless library which does not rely on finding these in a database; all the inputs are explicitly supplied through its APIs.

Since so many of the inputs that are necessary for pricing common instruments are standard market conventions, Strata provides these as part of the library and offer easy access to them via built-in constants. This includes common indices and their conventions, currencies and currency pairs, and even holiday calendars generated from rules for the common markets and exchanges. While in a production system these could be sourced from elsewhere and supplemented with more unusual or proprietary data, having the most common data built-in and easily accessible significantly lowers the barrier to evaluation and integration.

The command-line tool illustrates this by making full use of the built-in data and conventions to offer simple, command-line access to the [Reporting API]({{site.baseurl}}/reporting). Only trades and market data need to be supplied for access to any of Strata's coverage.

## Obtaining the tool

### Download

The tool is distributed as a standalone zip file including example data. The `strata-report-tool` package can be found under Downloads on the [releases](https://github.com/OpenGamma/Strata/releases) page.

### Source code

The tool is implemented by a simple Java class, `ReportRunnerTool`, which wraps the Reporting API. The code can be found in the `strata-examples` module. See [obtaining strata]({{site.baseurl}}/obtaining_strata) for more information on obtaining the source code.

## Usage

### Package contents

{{tip}}This assumes the tool is being run from the downloadable distribution. If you have built the tool from source code, then the example data is located in the strata-examples resources directory.{{end}}

After downloading and unzipping the package, the distribution contains the following top-level items:

* `strata-report-tool.jar` -- the self-contained JAR file used to run the tool from the command line.
* `example-marketdata` -- a complete market environment containing curves, historical fixings, quotes and credit data. This is sufficient to calculate every measure on the example portfolios. When running the tool, the `-m` option can be pointed to this directory.
* `example-portfolios` -- a set of example portfolios containing trades for all supported asset classes. When running the tool, the `-p` option can be pointed to a specific portfolio  in this directory.
* `example-reports` -- a set of example report templates for controlling the output of the tool. When running the tool, the `-t` option can be pointed to a specific template in this directory.

### Running the tool

{{note}}The tool requires the Java (SE) 8 Runtime Environment.{{end}}

The self-contained JAR file, `strata-report-tool.jar` can be run from the command line as follows:

```
$ java -jar strata-report-tool.jar 

The following options are required: -p, --portfolio -d, --date -t, --template 

Usage: ReportRunnerTool [options]
  Options:
  * -d, --date
       Valuation date, YYYY-MM-DD
    -f, --format
       Report output format, ascii or csv
       Default: ASCII_TABLE
       Possible Values: [ASCII_TABLE, CSV]
    -h, --help
       Displays this message
       Default: false
    -i, --id
       An ID by which to select a single trade
    -m, --marketdata
       Market data root directory
  * -p, --portfolio
       Portfolio input file
  * -t, --template
       Report template input file
    -v, --version
       Prints the version of this tool
       Default: false
```

Running the tool without any arguments causes the help message to be displayed. The following arguments are required:

* `-d` -- the valuation date. The example market data environment supports a valuation date of `2014-01-22` (i.e. 22 January 2014).
* `-p` -- the portfolio file, such as one from the `example-portfolios` directory described above.
* `-t` -- the report template, such as one from the `example-reports` directory described above.

The tool has a market data environment built-in which is identical to the one distributed with the tool in the `example-marketdata` directory. If the `-m` argument is not specified then this built-in market data will be used. This can be useful if you have made modifications to the `example-marketdata` directory.

For example, running the tool with only the required arguments above might generate the following output:

```
$ java -jar strata-report-tool.jar -p example-portfolios/swap-portfolio.xml -t example-reports/swap-report-template.ini -d 2014-01-22

+--------------------------------------+------+-----------+--------+---------+-----------+---------+
| Description                                            | Pay Ccy |   Pay Notional | Fixed Rate | Current Par |            NPV |        PV01 |
+--------------------------------------+------+-----------+--------+---------+-----------+---------+
| Fixed vs Libor 3m                                      | USD     | 100,000,000.00 |       0.01 |        0.02 |   5,965,705.04 |   62,626.50 |
| Libor 3m + spread vs Libor 6m                          | USD     | 100,000,000.00 |            |             |      76,158.72 |     (96.39) |
| Fed Funds averaged + spread vs Libor 3m                | USD     | 100,000,000.00 |            |             |     186,121.20 |    (363.58) |
| Fixed vs libor 3m (with fixing)                        | USD     | 100,000,000.00 |       0.01 |        0.02 |   3,137,260.06 |   60,119.30 |
| Fixed vs ON (with fixing)                              | USD     | 100,000,000.00 |       0.00 |        0.00 |     (5,205.55) |    1,479.54 |
| Fixed vs Libor 3m (3m short initial stub)              | USD     | 100,000,000.00 |       0.01 |        0.01 |   (176,762.08) | (17,383.85) |
| Fixed vs Libor 3m (1m short initial stub)              | USD     | 100,000,000.00 |       0.01 |        0.01 |   (257,815.61) | (18,147.04) |
| Fixed vs Libor 6m (interpolated 3m short initial stub) | USD     | 100,000,000.00 |       0.01 |        0.01 |   (306,666.41) | (17,368.99) |
| Fixed vs Libor 6m (interpolated 4m short initial stub) | USD     | 100,000,000.00 |       0.01 |        0.01 |   (397,613.88) | (18,130.42) |
| Zero-coupon fixed vs libor 3m                          | USD     | 100,000,000.00 |       0.01 |             |   6,487,398.31 |   66,071.59 |
| Compounding fixed vs fed funds                         | USD     | 100,000,000.00 |       0.00 |        0.00 |     (6,502.04) |    1,671.28 |
| Compounding fed funds vs libor 3m                      | USD     | 100,000,000.00 |            |             | (1,260,939.21) |      171.76 |
| Compounding libor 6m vs libor 3m                       | USD     | 100,000,000.00 |            |             |   (830,813.63) |      427.99 |
| GBP Libor 3m vs USD Libor 3m                           | GBP     |  61,600,000.00 |            |             |   4,360,136.12 |  (2,934.31) |
| USD fixed vs GBP Libor 3m                              | USD     | 100,000,000.00 |       0.03 |        0.02 | (6,547,782.15) |   67,906.38 |
| USD fixed vs GBP Libor 3m (notional exchange)          | USD     | 100,000,000.00 |       0.03 |        0.02 | (5,489,286.95) |   67,742.37 |
+--------------------------------------+------+-----------+--------+---------+-----------+---------+
```

### Report format

By default, the tool renders the report as a table as shown above, but it can be obtained in a CSV format by specifying `-f csv`.

```
$ java -jar strata-report-tool.jar -p example-portfolios/swap-portfolio.xml -t example-reports/swap-report-template.ini -d 2014-01-22 -f csv

"Description","Pay Ccy","Pay Notional","Fixed Rate","Current Par","NPV","PV01"
"Fixed vs Libor 3m","USD","100000000","0.015","0.0241098064","5965705.0407268815","62626.5033839196"
"Libor 3m + spread vs Libor 6m","USD","100000000","","","76158.7208160684","-96.3878307797"
"Fed Funds averaged + spread vs Libor 3m","USD","100000000","","","186121.1983528566","-363.5828422031"
"Fixed vs libor 3m (with fixing)","USD","100000000","0.015","0.0196904651","3137260.0589058623","60119.2995759158"
"Fixed vs ON (with fixing)","USD","100000000","0.00123","0.0009123287","-5205.5514991904","1479.5434520172"
"Fixed vs Libor 3m (3m short initial stub)","USD","100000000","0.01","0.0110175997","-176762.082663286","-17383.8509901587"
"Fixed vs Libor 3m (1m short initial stub)","USD","100000000","0.01","0.0114197805","-257815.6084561301","-18147.0433087943"
"Fixed vs Libor 6m (interpolated 3m short initial stub)","USD","100000000","0.01","0.0117654445","-306666.4118736032","-17368.9866674772"
"Fixed vs Libor 6m (interpolated 4m short initial stub)","USD","100000000","0.01","0.0121896442","-397613.8810997743","-18130.4237549759"
"Zero-coupon fixed vs libor 3m","USD","100000000","0.015","","6487398.306028347","66071.5937847396"
"Compounding fixed vs fed funds","USD","100000000","0.00123","0.0008461987","-6502.0395017498","1671.2823439047"
"Compounding fed funds vs libor 3m","USD","100000000","","","-1260939.2081384026","171.7612162457"
"Compounding libor 6m vs libor 3m","USD","100000000","","","-830813.6340759397","427.9881710255"
"GBP Libor 3m vs USD Libor 3m","GBP","61600000","","","4360136.116458949","-2934.3110826031"
"USD fixed vs GBP Libor 3m","USD","100000000","0.03","0.0201365606","-6547782.148463136","67906.3786529991"
"USD fixed vs GBP Libor 3m (notional exchange)","USD","100000000","0.03","0.0217310552","-5489286.948898683","67742.369948856"
```

This can be saved to a file, for example to open with Microsoft Excel, using standard output redirection:

```
$ java -jar strata-report-tool.jar -p example-portfolios/swap-portfolio.xml -t example-reports/swap-report-template.ini -d 2014-01-22 -f csv > swap-report.csv
```

## Report templates

The tool outputs the result of running a report. The report is controlled through the use of a _report template_. This defines the structure and format of a report in a way that can be reused across different portfolios, asset classes and market environments.

The Reporting API currently supports two types of report:

* Trade report -- a table showing calculated measures (the columns) for each trade (the rows).
* Cashflow report -- a table showing the cashflows for a single trade.

The input file for a report template uses a standard INI format. This contains section names in square brackets (e.g. `[Present Value]`), each followed by `key = value` pairs.

Every report template must start with a `Settings` section which specifies the type of the report, for example:

```
[Settings]
reportType = trade
```

### Trade report template

Trade reports are represented by a table showing trade-level calculated measures. The report template must specify `reportType = trade`.

Trade reports are highly configurable using a simple dot-based notation for drilling into objects.

### Cashflow report template

Cashflow reports are represented by a table showing individual cashflows for a single trade. The report template must specify `reportType = cashflow`.

Cashflow reports are not currently parameterised, so no further configuration can be specified in the report template. The behaviour is to output all available fields for every relevant cashflow.

Cashflow reports are available for all asset classes which support the `ExplainPresentValue` measure.


## Portfolios

{{note}}Strata will support FpML as its standard trade input format in a future release. This will be reflected here in the input to the command-line tool.{{end}}

Portfolio files currently consist of a list of trades in an XML representation. It is not recommended to construct portfolios by hand in this format, but it is possible to create new trades using the example portfolios as a guide.

The indices, day count conventions, and holiday calendars in the example portfolios refer to Strata's built-in data.


## Market environment

{{note}}The structure of the market environment directory may be subject to change in order to ensure consistency as input formats for additional types of market data are added.{{end}}

The market environment can be read from a directory, specified on the command line. This directory must contain subdirectories and files in a prescribed structure and format, and this completely defines the market data available to the tool. The data files have been designed for ease-of-use, and are generally in a CSV format.

{{tip}}A common technique when using the command-line tool to evaluate Strata is to assemble several market environment directories containing different data, and to select the required environment by passing the corresponding directory to the -m option when running the tool.{{end}}

The market environment directory may contain the following subdirectories:

* `curves` -- contains calibrated curves and curve settings
* `historical-fixings` -- contains historical fixing data
* `quotes` -- contains quote data
* `credit` -- contains additional data for pricing credit instruments

While this currently only covers certain types of market data, Strata's built-in data may be used for other inputs such as index definitions or holiday calendars. Support for other types of market data will be added in future Strata releases in order to offer full control over all possible inputs.

### Curves

The `curves` directory must contain two files with specific names:

* `groups.csv` -- defines the curve groups
* `settings.csv` -- contains settings for each curve

Any other files in this directory are assumed to contain curves. Curves can be divided between files as appropriate, using any file name.

#### Curve files

A curve file contains one or more calibrated curves. Curve files are CSV-formatted with the following header row:

```
Valuation Date,Group Name,Curve Name,Date,Value,Label
```

The fields are described below.

| Field          | Description                                                                                                                           |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Valuation Date | The valuation date of the curve, in the form `yyyy-mm-dd`.                                                                            |
| Group Name     | The curve group name. This must match a group defined in the curve groups file.                                                       |
| Curve Name     | The name of the curve within the group.                                                                                               |
| Date           | The date of the curve point, in the form `yyyy-mm-dd`.                                                                                |
| Value          | The curve point value. The curve settings file specifies whether the values for a curve correspond to discount factors or zero rates. |
| Label          | A description of the curve point used to identify it in bucketed sensitivity results.                                                 |

#### Curve groups

Curve groups assign purposes to curves. For example, they allow a curve to be identified as a USD discounting curve, or a forecasting curve for 3-month Libor.

The [market data rules]({{site.baseurl}}/calculation_rules) specify the name of the curve group to use for a given trade. In Strata 0.7, a fixed set of rules are used by the command-line tool which always use a single curve group with the name `Default`. The use of multiple curve groups would be the mechanism by which, for example, a different discounting curve could be used for different counterparties, or the same measure could be displayed side-by-side showing the effect of using different curves.

There must be a single file called `groups.csv` which defines all available curve groups. This is a CSV-formatted file with the following header row:

```
Group Name,Curve Type,Reference,Curve Name
```

The fields are described below.

| Field      | Description                                                                                                                                                                                                                                                  |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Group Name | The name of the curve group.                                                                                                                                                                                                                                 |
| Curve Type | `Discount` for a discounting curve, or `Forward` for a forward curve.                                                                                                                                                                                        |
| Reference  | The reference for which the curve is used. For `Discount` curve types, this is the ISO currency code of the curve. For `Forward` curve types, this is the name of the corresponding index. The example market data uses Strata's built-in index definitions. |
| Curve Name | The name of the curve. This must correspond to a curve defined in this group in a curve file.                                                                                                                                                                |

The curve groups file allows a single curve to be used for multiple purposes.

#### Curve settings

There must also be a single file called `settings.csv` which specifies settings for each curve in the curves files. This is again a CSV-formatted file, with the following header row:

```
Group Name,Curve Name,Value Type,Day Count,Interpolator,Left Extrapolator,Right Extrapolator
```

The fields are described below.

| Field              | Description                                                                                                                         |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Group Name         | The name of the curve group containing the curve.                                                                                   |
| Curve Name         | The name of the curve.                                                                                                              |
| Value Type         | Either `DF` or `Zero`, indicating that the values are discount factors or zero rates respectively.                                  |
| Day Count          | A supported day count convention name.                                                                                              |
| Interpolator       | A supported interpolator name. This corresponds to the interpolator to be used when reading from the curve.                         |
| Left Extrapolator  | A supported extrapolator name. This corresponds to the extrapolator to be used when reading beyond the earliest point on the curve. |
| Right Extrapolator | A supported extrapolator name. This corresponds to the extrapolator to be used when reading beyond the latest point on the curve.   |

Each curve must occur exactly once in this file, or it will be ignored.

### Historical fixings

The `historical-fixings` directory contains CSV-formatted files with historical fixing data. 

These are simple files with the following header row:

```
Reference,Date,Value
```

The fields are described below.

| Field     | Description                                                                                                                                   |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Reference | The name of the index definition to which the fixing data corresponds. The example market data refers to Strata's built-in index definitions. |
| Date      | The date of the fixing, in the form `yyyy-mm-dd`.                                                                                             |
| Value     | The numeric fixing value.                                                                                                                     |

The values for each index define a fixing series. Each fixing series must be contained within a single CSV file, but a single file may contain multiple series. Historical fixing data may be divided among severval files as appropriate, and any file name is permitted.


### Quotes

The `quotes` directory must contain a single file, `quotes.csv`. This is a simple CSV-formatted file with the following header row:

```
Date,Scheme,Ticker,Value
```

The fields are described below.

| Field  | Description                                                                          |
|--------|--------------------------------------------------------------------------------------|
| Date   | The valuation date to which the quote value corresponds, in the format `yyyy-mm-dd`. |
| Scheme | The scheme of the `StandardId` which identifies the quote.                           |
| Ticker | The value of the `StandardId` which identifies the quote.                            |
| Value  | The numeric quote value.                                                             |

This file may be used to specify a snapshot of quotes for market observables.

### Credit

The `credit` directory contains market data needed for pricing credit products. It must contain a subdirectory for each valuation date that the market environment is to be used for, named in the format `yyyy-mm-dd`.

For each valuation date, data files may be specified for three types of credit data:

* Yield curves
* Single-name CDS
* Index CDS

#### Yield curves

{{note}}Strata's built-in credit coverage uses an implementation of the ISDA standard model. The rates curves required by this model have their own definition file format, described here. However, they are a more constrained form of the rates curves used elsewhere in Strata, and the two formats will likely be aligned in the future.{{end}}

A file named `cds.yieldCurves.csv` defines the interest rates curves to be used in CDS pricing. 

This is a CSV file with the following header row:

```
Valuation Date,Tenor,Instrument Type,Rate,Curve Convention
```

The fields are described below.

| Field            | Description                                   |
|------------------|-----------------------------------------------|
| Valuation Date   | The curve date, in the form `yyyy-mm-dd`      |
| Tenor            | The point tenor, as a standard ISO tenor.     |
| Instrument Type  | `M` for _money-market_, or `S` for _swap_.    |
| Curve Convention | A supported ISDA yield curve convention name. |

#### Single-name CDS

Two files are required for pricing single-name CDS trades:

* `singleName.creditCurves.csv`
* `singleName.staticData.csv`

The `creditCurves` file contains curve data in the standard Markit format. The intention is for this to be downloaded directly through a Markit subscription.

The `staticData` file contains supplementary data for each name. This is a CSV file with the following header row:

```
RedCode,Convention
```

The fields are described below.

| Field      | Description                                                                                          |
|------------|------------------------------------------------------------------------------------------------------|
| RedCode    | The RED code of the name.                                                                            |
| Convention | A supported CDS market convention name, used to build underlying CDS instruments in the credit cuve. |

#### Index CDS

Two files are required for pricing CDS index trades:

* `index.creditCurves.csv`
* `index.staticData.csv`

The `creditCurves` file contains curve data in the standard Markit format. The intention is for this to be downloaded directly through a Markit subscription.

The `staticData` file contains supplementary pricing settings for each index. This is a CSV file with the following header row:

```
RedCode,From Date,Convention,Recovery Rate,Index Factor
```

The fields are described below.

| Field         | Description                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------|
| RedCode       | The RED code of the index.                                                                                          |
| From Date     | The valuation date from which the settings apply.                                                                   |
| Convention    | A supported CDS market convention name, used to build underlying CDS instruments in the credit cuve.                |
| Recovery Rate | The recovery rate, of the form `x%`. Unlike for single names, this is not part of the Markit curve file.            |
| Index Factor  | The scaling to apply to all present value calculation for the version of the index effective as of the 'from date'. |
