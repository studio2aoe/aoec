const assert = require('assert')
const Memory = require('../../src/instrument/memory')
const Data = require('../../src/instrument/data')

describe('Test instrument/memory.js', () => {
  describe('Test read', () => {
    it('Return for empty index', done => {
      Memory.init()
      const actual = Memory.read(2)
      const expected = new Data()
      assert.deepStrictEqual(actual, expected)
      done()
    })
  })
})
