#!/usr/bin/env node

const path = require('path')

var requirer, required
var i0 = 1
var i1 = 2

process.argv.forEach(function(val, index) {
    if (index == 0 && /node(|js)$/.test(val)) {
        i0 = 2
        i1 = 3
    }
    if (index == i0) {
        requirer = path.resolve(val).split('/')
    } else if (index == i1) {
        required = path.resolve(val).split('/')
    }
})

if (requirer && required) {

    for (; ;) {
        var a = requirer[ 0 ]
        var b = required[ 0 ]
        if (a === b) {
            requirer = requirer.slice(1)
            required = required.slice(1)
        } else break
    }

    var jsExts = /\.(js|es6|es5|jsx)$/i

    var result = ""
    for (var i = 1; i < requirer.length; i++) {
        result += "../"
    }
    result += required.join('/')
    if (jsExts.test(result)) {
        result = path.join(path.dirname(result) + '/' + path.basename(result, path.extname(result)))
    }

    var requirerFile = requirer[ requirer.length - 1 ]
    var requiredFile = required[ required.length - 1 ]
    var requiredExt = path.extname(requiredFile)
    var requiredVar =
        jsExts.test(requiredExt)
            ? path.basename(requiredFile, path.extname(requiredFile))
            : path.basename(requiredFile).replace(/\..{1}/g, function(match) {
            return match.toUpperCase().substring(1)
        })

    console.log('// ' + requirerFile)
    console.log('const ' + requiredVar + ' = require(\'' + result + '\')')
}
else {
    console.log('Use: requi requirerFile requiredFile')
}
