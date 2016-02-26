# urequ

A simple cli command to know WTF is the correct path to be required when we have a complex project.

## Install

```
npm install -g urequ
```

## Usage

```sh
urequ requirer required
```

### Find a library path

For example, imagine that inside 
```sh
/Users/sullof/Projects/qabra/web/src/server/controller/jokes.es6
``` 
we want to require the library 
```sh
/Users/sullof/Projects/qabra/common/lib/remote/funny.js
```
and we are in a terminal window at 
```
/Users/sullof/Projects/qabra/web
```
Using the shell autocomplete we can easily execute

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
const dataJson = require('../data.json')
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
If there is a statement `'use strict'` the like is inserted after it. After inserting it, you can move it where you like.

### MIT Licence

Version 1.0.0 — 02/25/2016

(c) Francesco Sullo <sullof@gmail.com>

