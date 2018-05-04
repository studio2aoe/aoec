const assert = require('assert')
const Memory = require('../../src/waveform/memory')
const Data = require('../../src/waveform/data')

describe('Test waveform/memory.js', () => {
  describe('Test read()', () => {
    it('if get empty index, return empty data', done => {
      Memory.init()
      const actual = Memory.read(2)
      const expected = new Data()
      assert.deepStrictEqual(actual, expected)
      done()
    })
  })
})
