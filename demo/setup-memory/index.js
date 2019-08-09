/* Require */
const aoec = require('../../src/index.js')

const setupMemory = () => {
  aoec.Memory.Oscillator.init()
  aoec.Memory.Waveform.init()
  aoec.Memory.Automation.init()
  aoec.Memory.Instrument.init()

  aoec.Memory.Waveform.write(16,
    {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    }
  )

  aoec.Memory.Automation.write('E', 0,
    {
      list: [0xFF, 0xEE, 0xDD, 0xCC,
        0xBB, 0xAA, 0x99, 0x88,
        0x77, 0x66, 0x55, 0x44,
        0x33, 0x22, 0x11, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00],
      loopstart: 0,
      loopend: 23
    }
  )

  aoec.Memory.Automation.write('E', 1,
    {
      list: [0x44],
      loopstart: -1,
      loopend: -1
    }
  )

  aoec.Memory.Automation.write('A', 1,
    {
      list: [0, 7, 10],
      loopstart: 0,
      loopend: 2
    }
  )

  aoec.Memory.Automation.write('W', 1,
    {
      list: [16],
      loopstart: -1,
      loopend: -1
    }
  )

  aoec.Memory.Instrument.write(1,
    {
      tuneType: 0,
      bank: 0,
      seqA: 1,
      seqE: 0,
      seqW: 1
    }
  )
}

module.exports = setupMemory
