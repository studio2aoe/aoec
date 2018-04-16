const aoec = require('../../src')

const testInst2 = () => {
  const inst2 = aoec.Instrument.getInst(2)
  inst2.setNote('A 4')
  inst2.setVol(15, 15)
  inst2.setAutomation('w', 1)
  inst2.setAutomation('A', 1)
  inst2.setAutomation('E', 0)
}

module.exports = testInst2
