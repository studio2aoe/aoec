/* Require */
const assert = require('assert')
const Data = require('../../src/instrument/data')

/* Sample Data */
const VALID = {
  name: 'VALID_INST',
  inv: false,
  tuneType: 1,
  bank: 2,
  seqA: 3,
  seqD: 4,
  seqE: 5,
  seqW: 6
}

describe('Test instrument/data.js', () => {
  describe('Test constructor', () => {
    it('Create empty data', done => {
      const data = new Data()
      assert.strictEqual(data.name, '')
      assert.strictEqual(data.inv, undefined)
      assert.strictEqual(data.tuneType, undefined)
      assert.strictEqual(data.bank, undefined)
      assert.strictEqual(data.seqA, undefined)
      assert.strictEqual(data.seqD, undefined)
      assert.strictEqual(data.seqE, undefined)
      assert.strictEqual(data.seqW, undefined)
      done()
    })
    it('Are written properties correctly?', done => {
      const data = new Data(VALID)
      assert.strictEqual(data.name, 'VALID_INST')
      assert.strictEqual(data.inv, false)
      assert.strictEqual(data.tuneType, 1)
      assert.strictEqual(data.bank, 2)
      assert.strictEqual(data.seqA, 3)
      assert.strictEqual(data.seqD, 4)
      assert.strictEqual(data.seqE, 5)
      assert.strictEqual(data.seqW, 6)
      done()
    })
  })
})
