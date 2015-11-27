# DFP Debugger

> When = revenue, so don't waste time debugging manually

Chrome Extension allowing easy Google DFP debugging.

<!-- RM-IGNORE -->
## Table of Contents
<!-- /RM-IGNORE -->

<!-- RM() -->

* [Installation](#installation)
* [Output](#output)
* [Author](#author)
* [License](#license)


<!-- /RM -->

Once enabled prints to console information about what you requested from DFP and what you got in response. Shows more than you can get from Publisher Console.

## Installation

Clone repository

```
git clone git@github.com:TimeIncOSS/dfpdebugger.git
```

Go in your browser to `chrome://extensions`, click on `Load Unpacked Extension` and select project folder on the drive.

You will set nice T in the extensions bar. Just click it and reload page. All output will be visible in [Chrome developer console](https://developer.chrome.com/devtools/docs/console).


## Output

Nice header to recognise output

```
============================
DFP Debugger
============================
```

Call that what analysed

```
https://securepubads.g.doubleclick.net/gampad/ads?gdfp_req=1&correlator=XXXXXXX&ga_sid=XXXXXXX&ga_hid=XXXXXXX&ga_fc=true&dpt=1
```

Requested custom targeting parameters for ad unit

```
----------------------------
Requested Custom Parameters
----------------------------

type : XXXXXXX
section : XXXXXXX
site : XXXXXXX
env : XXXXXXX
browwidth : XXXXXXX
browheight : XXXXXXX
============================
```

Requested slots with size and targeting

```
----------------------------
Requested Slots
----------------------------
Sizes: 300x250, 300x600, 300x1050

name = XXXXXXX
----------------------------
Sizes: 728x90, 970x250

name = XXXXXXX
============================
```

Creatives recieved from DFP

```
----------------------------
Received Creatives
----------------------------
Size: 970 x 250

AdUnit: /XXXXXXX/XXXXXXX/home
Line Items: XXXXXXX
  https://www.google.com/dfp/XXXXXXX#delivery/LineItemDetail/lineItemId=XXXXXXX

Creatives: XXXXXXX
  https://www.google.com/dfp/XXXXXXX#delivery/CreativeDetail/creativeId=XXXXXXX

Empty: false
Type: html
----------------------------
Size: 300 x 250

AdUnit: /XXXXXXX/XXXXXXX/home
Line Items: 

Creatives: 

Empty: true
Type: html
----------------------------
============================
```

## Author

 * Łukasz Marek Sielski [github](https://github.com/sielay) [npm](https://github.com/sielay) [linkedin](https://uk.linkedin.com/in/sielay) [mail](mailto:lukaszsielski@gmail.com)
   * Table of Contents created with [RoadMarks](https://www.npmjs.com/package/roadmarks)

## License

Copyright (c) 2015 Time Inc. UK

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
