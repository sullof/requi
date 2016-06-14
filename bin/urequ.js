#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

var requirer, requirerPath,
    required, requiredPath,
    varName

var i0 = 1
var i1 = 2
var i2 = 3

process.argv.forEach(function(val, index) {
    if (index == 0 && /node(|js)$/.test(val)) {
        i0 = 2
        i1 = 3
        i2 = 4
    }
    if (index == i0) {
        requirerPath = path.resolve(val)
        requirer = requirerPath.split('/')
    } else if (index == i1) {
        requiredPath = path.resolve(val)
        required = requiredPath.split('/')
    } else if (index == i2) {
        varName = val
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
        varName
            ? varName
            : jsExts.test(requiredExt)
            ? path.basename(requiredFile, path.extname(requiredFile))
            : path.basename(requiredFile).replace(/\..{1}/g, function(match) {
            return match.toUpperCase().substring(1)
        })

    if (requiredVar.indexOf('-') !== -1) {
        var temp = requiredVar.split('-')
        requiredVar = temp.reduce(function (rvar, elem) {
            if (!rvar) {
                return elem
            } else {
                return rvar + elem.substring(0,1).toUpperCase() + elem.substring(1)
            }
        }, '')
    }

    console.log('// ' + requirerFile)
    var str = 'const ' + requiredVar + ' = require(\'' + result + '\')'
    console.log(str)

    if (varName && fs.existsSync(requirerPath) && fs.existsSync(requiredPath)) {
        var content = fs.readFileSync(requirerPath).toString()
        if (new RegExp(requiredVar + '[\\s\\t\\n\\r]*=').test(content)) {
            console.log('A variable "' + requiredVar + '" is already required in "' + requirerFile)
        }
        else {

            var re = /^[\s\t\n\r]*("|'|`)use strict("|'|`)[\s\t\n\r;]*/
            var beginning = ''
            if (re.test(content)) {
                content = content.replace(re, function(match) {
                    beginning = match
                    return ""
                })
            }
            content = beginning + "\n" + str + "\n" + content
            fs.writeFileSync(requirerPath, content)
        }
    }
}
else {
    var pkg = require('../package.json')
    console.log('urequ '+ pkg.version+'\nUsage: urequ requirer requiredFile')
}



const makeSubmission = require('helpers/makeSubmission')

const giveMe = require('giveme')

const errors = giveMe('common/errors')
const Logger = giveMe('NodeLogger')
const BPromise = giveMe('common/promise')
const promisify = BPromise.promisify

const InterstitialForm = giveMe('InterstitialForm')
const InterstitialLayout = giveMe('Layout')
const Submission = giveMe('Submission')

const simpleLayoutJson = giveMe('shared/layouts/simple')