const assert = require('assert')
const Sequencer = require('../../src/automation/sequencer')

/* Temporary function for test */
const setCurrent = (seq, repeat) => {
  for (let i = 0; i < repeat; i++) seq.next()
}

describe('Test automation/sequencer.js', () => {
  describe('Test next()', () => {
    it('Go next frame', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: 3, loopend: 6
      })
      setCurrent(seq, 4)
      assert.strictEqual(seq.next(), 5)
      done()
    })
    it('Hold on last index', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: -1, loopend: -1
      })
      setCurrent(seq, 11)
      assert.strictEqual(seq.next(), 11)
      done()
    })
    it('Hold on loopend', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: -1, loopend: 6
      })
      setCurrent(seq, 6)
      assert.strictEqual(seq.next(), 6)
      done()
    })
    it('Jump from last', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: 3, loopend: -1
      }) 
      setCurrent(seq, 11)
      assert.strictEqual(seq.next(), 3)
      done()
    })
    it('Jump from loopend', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: 3, loopend: 6
      })
      setCurrent(seq, 6)
      assert.strictEqual(seq.next(), 3)
      done()
    })
    it('If sequencer released, ignore loop', done => {
      const seq = new Sequencer({
        list: new Array(12), loopstart: 3, loopend: 6
      })
      seq.release()
      setCurrent(seq, 6)
      assert.strictEqual(seq.next(), 7)
      setCurrent(seq, 11)
      assert.strictEqual(seq.next(), 11)
      done()
    })
  })
})
