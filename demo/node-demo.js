const aoec = require('../src/index.js')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

/* Setup Audio Context */
const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

/* Setup Master */
const master = AUDIO_CONTEXT.createGain()
master.connect(AUDIO_CONTEXT.destination)
master.gain.setValueAtTime(0.5, master.context.currentTime)

/* Setup Processor */
aoec.Processor.init(AUDIO_CONTEXT, 4096)
aoec.Processor.connect(master)

/* Setup Memory */
aoec.Memory.Oscillator.init()
aoec.Memory.Waveform.init()
aoec.Memory.Automation.init()

aoec.Memory.Waveform.write(16,
  {
    list: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
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

aoec.Memory.Automation.write('w', 1,
  {
    list: [16],
    loopstart: -1,
    loopend: -1
  }
)

aoec.Instrument.init('OOCN')
aoec.Scheduler.setTempo(30)

const testInst0 = () => {
  const inst0 = aoec.Instrument.getInst(0)
  inst0.setNote('A 4')
  inst0.setVol(15, 15)
  inst0.setAutomation('W', 1)
  inst0.setAutomation('A', 1)
  inst0.setAutomation('E', 0)
}

const testInst2 = () => {
  const inst2 = aoec.Instrument.getInst(2)
  inst2.setNote('A 4')
  inst2.setVol(15, 15)
  inst2.setAutomation('w', 1)
  inst2.setAutomation('A', 1)
  inst2.setAutomation('E', 0)
}

const testInst3 = () => {
  const inst3 = aoec.Instrument.getInst(3)
  inst3.setNote('AF ')
  inst3.setVol(15, 15)
  inst3.setAutomation('A', 1)
  inst3.setAutomation('E', 0)
  inst3.setTuneType(1)
}

const testInst = (id) => {
  switch (id) {
    case 0:
      testInst0()
      break
    case 2:
      testInst2()
      break
    case 3:
      testInst3()
      break
  }
}

testInst(3)

/* Play */
aoec.Processor.play()
