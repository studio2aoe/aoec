/* Require */
const HexGenerator = require('./super')
const Waveform = require('../waveform')
const misc = require('../misc')

/* Alias */
const Memory = Waveform.Memory
const Sequencer = Waveform.Sequencer
const MEM_SIZE = Waveform.MEM_SIZE
const checkID = (id) => misc.checkRangedInt(id, 0, MEM_SIZE - 1)

/**
 * @desc Custom-waveform generator. it generates waveform from memory.
 */
class WaveGenerator extends HexGenerator {
  constructor () {
    super()
    this.generatorType = 'C'
    this.sequencer = new Sequencer(Memory.read(0))
  }
  setWaveform (id) {
    this.waveNum = checkID(id)
    this.sequencer = new Sequencer(Memory.read(id))
  }
}

module.exports = WaveGenerator
