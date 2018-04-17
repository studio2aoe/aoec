/* Required */
const assert = require('assert')
const HexBuffer = require('../../src/hexbuffer')

describe('Test for hexbuffer/index.js', () => {
  describe('Test read() and write()', () => {
    it('are hexadecimals written correctly?', done => {
      const length = 32
      const buf = new HexBuffer(length)
      const anyHex = () => Math.floor(Math.random() * 16)
      const expected = [...Array(length).keys()].map(i => anyHex())
      buf.write(expected)
      const actual = buf.read()
      actual.forEach((elem, i) => assert.strictEqual(elem, expected[i]))
      done()
    })
  })
})
