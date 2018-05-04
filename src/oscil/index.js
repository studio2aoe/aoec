const Memory = require('./memory')
const Sequencer = require('./sequencer')
const WAVE_SIZE = require('./const').WAVE_SIZE
const MEM_SIZE = require('./const').MEM_SIZE

module.exports = {
  Memory: Memory,
  Sequencer: Sequencer,
  WAVE_SIZE: WAVE_SIZE,
  MEM_SIZE: MEM_SIZE
}
