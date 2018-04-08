
/* Alias */
const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

for (let signal = 0; signal < TABLE_SIZE; signal++) {
  TABLE[signal] = new Uint8Array(TABLE_SIZE)
  for (let amp = 0; amp < TABLE_SIZE; amp++) {
    if (signal === 0 || amp === 0) TABLE[signal][amp] = 0
    else {
      let value = Math.floor(signal * amp / 15)
      value = (value > 1) ? value : 1
      TABLE[signal][amp] = value
    }
  }
}

/**
 * Get mixed volume
 * @param {Number} vol1 Hexadecimal
 * @param {Number} vol2 Hexadecimal
 * @return {Number} Mixed volume (Hexadecimal)
 */
module.exports = (vol1, vol2) => {
  return TABLE[vol1][vol2]
}
