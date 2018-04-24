
/* Alias */
const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

for (let signal = 0; signal < TABLE_SIZE; signal++) {
  TABLE[signal] = new Uint8Array(TABLE_SIZE)
  for (let amp = 0; amp < TABLE_SIZE; amp++) {
    if (signal === 0 || amp === 0) TABLE[signal][amp] = 0
    else {
      const value = Math.floor(signal * amp / 15)
      TABLE[signal][amp] = (value > 1) ? value : 1
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
  try {
    return TABLE[vol1][vol2]
  } catch (err) {
    err.message = `Invalid Input: [${vol1}, ${vol2}]`
    throw err
  }
}
