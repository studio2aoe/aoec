const aoec = require('../../src')

const testInst3 = () => {
  const inst3 = aoec.Instrument.getInst(3)
  inst3.setNote('AF ')
  inst3.setVol(15, 15)
  inst3.setE(0)
  inst3.setTuneType(1)
}

module.exports = testInst3
