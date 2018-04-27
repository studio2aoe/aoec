const Processor = require('./processor')
const Instrument = require('./instrument')
const InstrumentMemory = require('./instrument/memory')
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
  Memory: {
    Waveform: {
      init: WaveformMemory.init,
      read: WaveformMemory.read,
      write: WaveformMemory.write
    },
    Oscillator: {
      init: OscillatorMemory.init,
      read: OscillatorMemory.read,
      write: OscillatorMemory.write
    },
    Automation: {
      init: AutomationMemory.init,
      read: AutomationMemory.read,
      write: AutomationMemory.write
    },
    Instrument: {
      init: InstrumentMemory.init,
      read: InstrumentMemory.read,
      write: InstrumentMemory.write
    }
  },
  Mixer: {
    reset: Mixer.reset,
    getGain: Mixer.getGain,
    setGain: Mixer.setGain,
    setDecibel: Mixer.setDecibel
  },
  Scheduler: {
    setTempo: Scheduler.setTempo,
    getTempo: Scheduler.getTempo,
    getPeriod: Scheduler.getPeriod,
    setFunc: Scheduler.setFunc
  }
}
