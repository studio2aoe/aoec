const assert = require('assert')
const Sequencer = require('../../src/waveform/sequencer')
const Data = require('../../src/waveform/data')

/* Temporary function for test */
const setCurrent = (seq, repeat) => {
  for (let i = 0; i < repeat; i++) seq.next()
}

describe('Test waveform/sequencer.js', () => {
  describe('Text next()', () => {
    it('Go next frame', done => {
      const seq = new Sequencer(new Data())
      setCurrent(seq, 16)
      assert.strictEqual(seq.next(), 17)
      done()
    })
    it('Jump 31 to 0', done => {
      const seq = new Sequencer(new Data())
      setCurrent(seq, 31)
      assert.strictEqual(seq.next(), 0)
      done()
    })
  })
})
