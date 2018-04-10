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
    list: [32],
    loopstart: -1,
    loopend: -1
  }
)

aoec.Scheduler.setTempo(30)
aoec.Instrument.init('OOCN')
const inst0 = aoec.Instrument.getInst(0)
inst0.setNote('A 4')
inst0.setVol(15, 15)
inst0.setAutomation('W', 1)
inst0.setAutomation('A', 1)
inst0.setAutomation('E', 0)
/*
const inst3 = aoec.Instrument.getInst(3)
inst3.setNote('AF ')
inst3.setVol(15, 15)
inst3.setAutomation('A', 1)
inst3.setAutomation('E', 0)
inst3.setTuneType(1)
*/
/* Play */
aoec.Processor.play()
