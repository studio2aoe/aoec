/* Require */
const assert = require('assert')
const Data = require('../../src/waveform/data')

/* Sample data */
const VALID = [
  0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
  0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0
]

const INVALID_RANGE = [
  13, 14, 15, 16, 0xF, 0xF, 0xF, 0xF,
  0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0
]

const INVALID_TYPE = [
  'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F',
  'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F',
  '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0'
]

const INVALID_SIZE_0 = [0xF, 0xF, 0x0, 0x0]

describe('Test waveform/data.js', () => {
  describe('Test constructor', () => {
    it('Create empty data', done => {
      const data = new Data()
      assert.deepStrictEqual(data.list, new Array(32).fill(0))
      assert.strictEqual(data.name, '')
      done()
    })
  })
  describe('Test set list()', () => {
    it('Are written values of list correctly?', done => {
      const data = new Data({ list: VALID })
      assert.deepStrictEqual(data.list, VALID)
      done()
    })
    it('Check element range', done => {
      assert.throws(() => new Data({
        list: INVALID_RANGE
      }), TypeError)
      done()
    })
    it('Check element type', done => {
      assert.throws(() => new Data({
        list: INVALID_TYPE
      }), TypeError)
      done()
    })
    it('Check element number', done => {
      assert.throws(() => new Data({ list: INVALID_SIZE_0 }), TypeError)
      done()
    })
  })
})
