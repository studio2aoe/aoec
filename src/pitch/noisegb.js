const check = require('check-types').assert

const isHexDigit = (value) => {
  const checkInt = check.integer(value)
  const checkRange = check.inRange(value, 0, 15)
  return checkInt && checkRange
}

/**
 * Get frequency of noise note by LSDj style. but it not works to noise period (LFSR tabs)
 * @param {String} note 2-digit Hexadecimal.
 * @param {Number} semi Transpose note by semitone unit
 * @param {Number} cent Detuning pitch by cent unit.
 */
const getFreq = (note, semi = 0, cent = 0) => {
  const digit0 = parseInt(note[0], 16)
  const digit1 = parseInt(note[1], 16)
  isHexDigit(digit0)
  isHexDigit(digit1)
  const s = 15 - digit0
  let r = 7 - digit1 % 8
  if (r === 0) r = 0.5

  const retFreq =
    524288 * (1 / r) * Math.pow(2, -(s + 1)) * Math.pow(2, cent / 1200)

  return (retFreq > 1048576) ? 1048576 : retFreq
}

module.exports = getFreq
