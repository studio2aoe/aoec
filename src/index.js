const Processor = require('./processor')
const WaveGenerator = require('./wavegenerator')
const WaveformMemory = require('./waveform').Memory
const OscillatorMemory = require('./oscil').Memory
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
  WaveGenerator: {
    init: WaveGenerator.init,
    list: WaveGenerator.list,
    string: WaveGenerator.string
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
