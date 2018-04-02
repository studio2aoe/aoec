/* Require */
const WaveGenerator = require('./super')
const Oscillator = require('../oscil')
const misc = require('../misc')

/* Alias */
const Memory = Oscillator.Memory
const Sequencer = Oscillator.Sequencer
const MEM_SIZE = Oscillator.MEM_SIZE
const checkID = (id) => misc.checkRangedInt(id, 0, MEM_SIZE - 1)

/**
 * @desc Oscillated-waveform generator. it generates function-based waveform.
 */
class OscGenerator extends WaveGenerator {
  constructor () {
    super()
    this.generatorType = 'B'
    this.sequencer = new Sequencer(Memory.read(0))
  }
  setWaveform (id) {
    this.waveNum = checkID(id)
    this.sequencer = new Sequencer(Memory.read(id))
  }
}

module.exports = OscGenerator
