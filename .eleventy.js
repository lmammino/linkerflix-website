'use strict'

module.exports = function (config) {
  config.addPassthroughCopy({ 'src/_includes/assets': 'assets' })
  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}
