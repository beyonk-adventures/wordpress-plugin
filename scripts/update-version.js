'use strict'

const regexReplace = require('regex-replace')
const pkg = require('../package.json')
const { join } = require('path')

const plugin = join(__dirname, '..', 'beyonk.php')
 
const bumpVersion = async () => {
  try {
    await regexReplace(/Version: [0-9]+\.[0-9]+\.[0-9]+/, `Version: ${pkg.version}`, plugin, { fileContentsOnly: true })
  } catch (err) {
    console.error('Unable to bump plugin version', err)
  }
}

bumpVersion()