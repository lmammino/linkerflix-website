'use strict'

const { extname } = require('path')
const manifest = require('../_includes/assets/manifest.json')

function mapByExtension (manifest) {
  const byExtension = Object.entries(manifest).reduce((acc, [key, value]) => {
    const ext = extname(key).substr(1)
    if (!acc[ext]) {
      acc[ext] = []
    }
    acc[ext].push(`/assets/${value}`)
    return acc
  }, {})
  return byExtension
}

module.exports = mapByExtension(manifest)
