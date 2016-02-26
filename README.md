# urequ

A simple cli command to know which fucking path we have to require when we have a complex project.

## Install

```
npm install -g urequ
```

## Usage

```sh
urequ requirer required
```

### Find a library path

For example, imagine that we have the script `/Users/sullof/Projects/qabra/web/src/server/controller/jokes.es6` and we want to require, inside `jokes.es6` the library at `/Users/sullof/Projects/qabra/common/lib/remote/funny.js`, and we are with the terminal in `/Users/sullof/Projects/qabra/web`.

Using the autocomplete we can easily execute

```sh
urequ src/server/controller/jokes.es6 ../common/lib/remote/funny.js`
```

which will return

```javascript
//jokes.es6
const funny = require('../../../../../common/lib/remote/funny')
```

If the requiring file is not a javascript file the result is a bit different. For example:

```sh
urequ src/server/controller/jokes.es6 src/server/data.json`
```
will return
```javascript
//jokes.es6
const funnyJson = require('../data.json')
```

### Inject a require statement

If you like, you can inject the line at the top of the requirer, specifying the name of the constant.
For example:
```sh
urequ src/server/controller/jokes.es6 src/server/data.json Data`
```
will inject at the top of `jokes.es6` the line
```javascript
const Data = require('../data.json')
```

### MIT Licence

Version 1.0.0 — 02/25/2016

(c) Francesco Sullo <sullof@gmail.com>

