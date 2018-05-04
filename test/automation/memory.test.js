/* Require */
const assert = require('assert')
const Memory = require('../../src/automation/memory')
const Data = require('../../src/automation/data')

describe('Test automation/memory.js', () => {
  describe('Test read()', () => {
    it('if get empty index, return empty data', done => {
      Memory.init()
      const actual = Memory.read('A', 1)
      const expected = new Data()
      assert.deepStrictEqual(actual, expected)
      done()
    })
  })
})
