---
title: Contributions
permalink: /contributions/
---

Contributions to Strata are very welcome.

## Reporting a bug
Please raise all bugs as [Github Issues](https://github.com/OpenGamma/Strata/issues). If possible please include the following (where relevant):

 * A short description of the bug.
 * An explanation as to what caused the problem, please be as detailed as possible.
   * Perhaps attach a stack trace.
   * Perhaps attach or inline sample code that triggers the bug.
   * Perhaps attach input that triggers the bug.
   * If you have knowledge of the domain, perhaps suggest reasons why the problem occured.
 * The version of Strata on which the bug occurred.
 * JDK version and Operating system.

## Submitting a patch
If you have a patch for anything from a bug right through to a full blown feature, the process for inclusion of your code into Strata is essentially the same.

 0. Fork Strata on Github.
 1. From your fork of Strata create a pull request in Github against `OpenGamma/Strata:master`.
 2. If we deem it necessary we'll send you a copy of a legal indemnity form, please sign and return this.
 3. We'll check your patch runs through CI and meets standards (see below on how to get a patch accepted).
 4. If everything is fine your patch will be accepted and be merged to mainline.

## How to get a patch accepted
We have a few basic rules for getting a patch accepted.

 * The patch must not break any existing tests.
 * The patch must not break backwards compatibility.
 * The patch must meet our visual code standards (see [here](https://github.com/OpenGamma/Strata/tree/master/eclipse) on how to get automatic formatting and templating).
 * If the patch is adding new features it must:
   * Come with suitable tests.
   * Come with javadoc and if applicable additional documentation.
   * Not add additional dependencies to Strata.
   * Not use proprietary classes e.g. `sun.misc.Unsafe`.
   * Be platform independent (think file system differences etc.)


