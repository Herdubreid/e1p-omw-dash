---
title: Installation
nav_order: 2
---

### Install latest build

[Download the latest `home.zip`](https://github.com/Herdubreid/e1p-omw-dash/releases/latest) and uploaded to `E1`.

#### Note on Date Conversion

Dates are returned as `Unix Time Stamp` when extracted with an AIS Aggregate, but without the `Time Zone`, so they default to `GMT`.  If the system is not running in `GMT`, then the date needs to be adjusted in [state.ts]():

```ts
/** App State */

export const TIMEZONE_ADJUST = 0; /*36000 = AEST to GMT*/;
export const DATE_FORMAT = 'MM/DD/YYYY'; /* US date format */

```

### Build from source

Go to the [Github page](https://github.com/Herdubreid/e1p-dash) and either download the source as a zip file or clone with `git`:

```bash
$ git clone https://github.com/Herdubreid/e1p-dash
```

Install components with `npm` from the source root directory:

```bash
$ npm install
```

Build a production bundle with `npm`:

```bash
$ npm run build
```

Zip up the build output in the `/dist` folder and upload to `E1`.

### Run standalone

In addition to the source code, a configured [e1pagehelper.js](https://gist.github.com/Herdubreid/5daff3c5108a732b24ea1c735e1e721e) is required to run a standalone `E1 Page`.  After updating it with user, password and ais-url, place it in a in the parent folder of the source under `/jde/e1pages`.  The install directory tree should look like this:

```
/e1p-omw-dash     <-- Source folder
    /docs
    /node_modules
    /src
/jde
    /e1pages
        e1pagehelper.js
```

From the source folder, start it with `npm`:

```bash
$ npm start
```

By default a browser page will open `http://localhost:8080`, expecting an `index.html` page.  Just append it with `/home.html` to display the page.
