/* Require */
const assert = require('assert')
const Data = require('../../src/automation/data')

/* Sample data */
const VALID = [0, 4, 7, 11]
const INVALID_RANGE = [254, 255, 256, 257]
const INVALID_TYPE = ['FD', 'FE', 'FF', '00']

describe('Test automation/data.js', () => {
  describe('Test constructor', () => {
    it('Create empty data', done => {
      const data = new Data()
      assert.deepStrictEqual(data.list, [0])
      assert.strictEqual(data.name, '')
      assert.strictEqual(data.loopstart, -1)
      assert.strictEqual(data.loopend, -1)
      done()
    })
  })
  describe('Test set list()', () => {
    it('Are written values of list correctly?', done => {
      const data = new Data()
      data.list = VALID
      assert.deepStrictEqual(data.list, VALID)
      done()
    })
    it('Check element range', done => {
      assert.throws(() => new Data({ list: INVALID_RANGE }), TypeError)
      done()
    })
    it('Check element type', done => {
      assert.throws(() => new Data({ list: INVALID_TYPE }), TypeError)
      done()
    })
  })
})
