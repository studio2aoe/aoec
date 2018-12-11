const aoec = require('../../src')

const testInst0 = () => {
  const inst0 = aoec.TrackList.getTrack(0)
  inst0.setNote('A 4')
  inst0.setVol(15, 15)
  inst0.setW(1)
  inst0.setA(1)
  inst0.setE(0)
}

module.exports = testInst0
