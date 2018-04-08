const Processor = require('./processor')
const Instrument = require('./instrument')
const WaveformMemory = require('./waveform').Memory
const OscillatorMemory = require('./oscil').Memory
const AutomationMemory = require('./automation').Memory
const Mixer = require('./mixer')
const Scheduler = require('./scheduler')

module.exports = {
  Processor: {
    init: Processor.init,
    connect: Processor.connect,
    disconnect: Processor.disconnect,
    play: Processor.play,
    stop: Processor.stop
  },
  Instrument: {
    init: Instrument.init,
    getInst: Instrument.getInst,
    getType: Instrument.getType
  },
  WaveformMemory: {
    write: WaveformMemory.write,
    read: WaveformMemory.read,
    init: WaveformMemory.init
  },
  OscillatorMemory: {
    write: OscillatorMemory.write,
    read: OscillatorMemory.read,
    init: OscillatorMemory.init
  },
  AutomationMemory: {
    write: AutomationMemory.write,
    read: AutomationMemory.read,
    init: AutomationMemory.init
  },
  Mixer: {
    reset: Mixer.reset,
    getGain: Mixer.getGain,
    setGain: Mixer.setGain,
    setDecibel: Mixer.setDecibel
  },
  Scheduler: {
    setFunc: Scheduler.setFunc
  }
}
