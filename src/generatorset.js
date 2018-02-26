const BuiltInWaveform = require('./builtin')
const NoiseWaveform = require('./noise')
const CustomWaveform = require('./custom')
const Mixer = require('./mixer')

let generatorSet = []

const init = (str = 'BBCNS') => {
  generatorSet = []
  str.split('').forEach(elem => addGenerator(elem))
  Mixer.init(generatorSet.length)
}

const addGenerator = (chr = '') => {
  switch (chr) {
    case 'B':
      generatorSet.push(new BuiltInWaveform())
      break
    case 'C':
      generatorSet.push(new CustomWaveform())
      break
    case 'N':
      generatorSet.push(new NoiseWaveform())
      break
    case 'S':
      // generatorSet.push(new Sampler())
      break
  }
}

const getPhaseValue = (phase) => {
  let phaseValueL = 0
  let phaseValueR = 0
  generatorSet.forEach((elem, idx) => {
    let gain = Mixer.getGain(idx)
    phaseValueL += ((elem.getPhaseValue(phase)[0]) / 15) * gain
    phaseValueR += ((elem.getPhaseValue(phase)[1]) / 15) * gain
  })

  return [phaseValueL, phaseValueR]
}

const send = (idx, freq, num, inv, volL, volR) => {
  generatorSet[idx].setFreq(freq)
  generatorSet[idx].setWaveform(num)
  generatorSet[idx].setInv(inv)
  generatorSet[idx].setVol(volL, volR)
}

const getGenerator = () => {
  return generatorSet
}

module.exports = {
  init: init,
  send: send,
  addGenerator: addGenerator,
  getPhaseValue: getPhaseValue,
  getGenerator: getGenerator
}
