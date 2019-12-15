
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./devfractal-ui-api.cjs.production.min.js')
} else {
  module.exports = require('./devfractal-ui-api.cjs.development.js')
}
