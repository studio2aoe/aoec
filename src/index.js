const Processor = require('./processor')
const TrackList = require('./tracklist')
const InstrumentMemory = require('./instrument').Memory
const WaveformMemory = require('./waveform').Memory
const OscillatorMemory = require('./oscil').Memory
const AutomationMemory = require('./automation').Memory
const TuningMemory = require('./pitch')
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
  TrackList: {
    init: TrackList.init,
    getTrack: TrackList.getTrack,
    getType: TrackList.getType
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
    },
    Tuning: {
      init: TuningMemory.init,
      write: TuningMemory.write
    }
  },
  Mixer: {
    reset: Mixer.reset,
    getGain: Mixer.getGain,
    setGain: Mixer.setGain,
    setDecibel: Mixer.setDecibel,
    getDecibel: Mixer.getDecibel
  },
  Scheduler: {
    setTempo: Scheduler.setTempo,
    getTempo: Scheduler.getTempo,
    getPeriod: Scheduler.getPeriod,
    setFunc: Scheduler.setFunc
  }
}
