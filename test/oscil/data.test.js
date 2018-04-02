/* Require */
const assert = require('assert')
const Data = require('../../src/oscil/data')
const FUNC = require('../../src/oscil/functions')

/* Alias */
const RANGE_32 = new Array(32).fill(null).map((e, i) => i)

describe('Test oscil/data.js', () => {
  describe('Test constructor', () => {
    it('Create empty data', done => {
      const data = new Data()
      RANGE_32.forEach(elem => {
        assert.strictEqual(data.func(elem), FUNC.pulse(4)(elem))
      })
      done()
    })
  })
  describe('Test set func()', () => {
    it('Is set function correctly?', done => {
      const data = new Data({ func: FUNC.triangle })
      RANGE_32.forEach(elem => {
        assert.strictEqual(data.func(elem), FUNC.triangle(elem))
      })
      done()
    })
  })
})
