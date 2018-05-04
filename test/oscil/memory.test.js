/* Require */
const assert = require('assert')
const Memory = require('../../src/oscil/memory')
const Data = require('../../src/oscil/data')
const FUNC = require('../../src/oscil/functions')

/* Alias */
const RANGE_32 = new Array(32).fill(null).map((e, i) => i)

/* Test */
describe('Test oscil/memory.js', () => {
  describe('Test read()', () => {
    it('if get empty index, return empty data', done => {
      Memory.init()
      const actual = Memory.read(0xFF)
      const expected = new Data()
      RANGE_32.forEach(elem => {
        assert.strictEqual(actual.func(elem), FUNC.pulse(4)(elem))
      })
      assert.deepStrictEqual(actual, expected)
      done()
    })
  })
})
