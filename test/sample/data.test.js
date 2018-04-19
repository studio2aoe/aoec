/* Require */
const assert = require('assert')
const Data = require('../../src/sample/data')

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

const TOO_LARGE_DATA = [...Array(4194305).keys()]
  .map(() => Math.floor(Math.random() * 16))

describe('Test waveform/data.js', () => {
  describe('Test constructor', () => {
    it('Create empty data', done => {
      const data = new Data()
      assert.deepStrictEqual(data.list, [])
      assert.strictEqual(data.name, '')
      done()
    })
  })
  describe('Test set list()', () => {
    it('Is set length of list correctly?', done => {
      const data = new Data({ list: VALID })
      assert.deepStrictEqual(data.length, VALID.length)
      done()
    })
    it('Reject TOO LARGE DATA (> 2MiB)', done => {
      assert.throws(() => new Data({
        list: TOO_LARGE_DATA
      }), TypeError)
      done()
    })
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
  })
})
