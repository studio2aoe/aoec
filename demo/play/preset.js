const aoec = require('../../src')

const testPreset = () => {
  const inst2 = aoec.Instrument.getInst(2)
  inst2.setNote('E 4')
  inst2.setVol(15, 15)
  inst2.setInst(1)
}

module.exports = testPreset
