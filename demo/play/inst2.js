const aoec = require('../../src')

const testInst2 = () => {
  const inst2 = aoec.TrackList.getTrack(2)
  inst2.setNote('A 4')
  inst2.setVol(15, 15)
  inst2.setBank(0)
  inst2.setW(1)
  inst2.setA(1)
  inst2.setE(0)
}

module.exports = testInst2
