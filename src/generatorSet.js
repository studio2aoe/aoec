const BuiltInGenerator = require('./builtin')
const NoiseGenerator = require('./noise')
const CustomGenerator = require('./custom')
const Mixer = require('./mixer')

let generatorset = []

const init = (str = 'BBCN') => {
  generatorset = []
  str.split('').forEach(elem => add(elem))
  Mixer.init(generatorset.length)
}

const add = (chr = '') => {
  switch (chr) {
    case 'B':
      generatorset.push(new BuiltInGenerator())
      break
    case 'C':
      generatorset.push(new CustomGenerator())
      break
    case 'N':
      generatorset.push(new NoiseGenerator())
      break
    case 'S':
      // generatorSet.push(new Sampler())
      break
  }
}

const send = (idx, freq, num, inv, volL, volR) => {
  generatorset[idx].setFreq(freq)
  generatorset[idx].setWaveform(num)
  generatorset[idx].setInv(inv)
  generatorset[idx].setVol(volL, volR)
}

const getVoltage = (phase) => {
  let voltageL = 0
  let voltageR = 0
  generatorset.forEach((elem, idx) => {
    let gain = Mixer.getGain(idx)
    voltageL += ((elem.getHexSignal(phase)[0]) - 7.5) / 7.5 * gain
    voltageR += ((elem.getHexSignal(phase)[1]) - 7.5) / 7.5 * gain
  })
  return [voltageL, voltageR]
}

module.exports = {
  init: init,
  send: send,
  getVoltage: getVoltage
}
