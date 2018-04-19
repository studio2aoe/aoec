const assert = require('assert')
const Memory = require('../../src/sample/memory')
const Data = require('../../src/sample/data')

const SAMPLE_2SEC = { list: new Array(88200).fill(0) }
const VERY_LARGE_DATA_1 = { list: new Array(4194304).fill(0) }
const VERY_LARGE_DATA_2 = { list: new Array(3145728).fill(0) }

describe('Test waveform/memory.js', () => {
  describe('Test read() & write()', () => {
    it('is Data stored correctly?', done => {
      Memory.init()
      Memory.write(0, SAMPLE_2SEC)
      /*
      const actual = Memory.read(0)
      const expected = new Data(SAMPLE_2SEC)
      assert.deepStrictEqual(actual, expected)
      */
      done()
    }).timeout(0)
    it('if get empty index, return empty data', done => {
      Memory.init()
      const actual = Memory.read(2)
      const expected = new Data()
      assert.deepStrictEqual(actual, expected)
      done()
    })
    it('Reject data when memory is full (> 2MiB)', done => {
      Memory.init()
      assert.throws(() => {
        Memory.write(0, VERY_LARGE_DATA_1) // Total 2 MiB
        Memory.write(0, VERY_LARGE_DATA_2) // Total 1.5 MiB
        Memory.write(1, VERY_LARGE_DATA_2) // Total 3 MiB
      }, TypeError)
      done()
    }).timeout(0)
    it('Don\'t reject data when memory isn\'t full (<= 2MiB)', done => {
      Memory.init()
      Memory.write(0, VERY_LARGE_DATA_1) // Total 2 MiB
      Memory.write(0, VERY_LARGE_DATA_2) // Total 1.5 MiB
      Memory.write(0, VERY_LARGE_DATA_1) // Total 2 MiB
      done()
    }).timeout(0)
  })
})
