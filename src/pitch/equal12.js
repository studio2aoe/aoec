/* Alias */

/** Frequency of Pitch Standard (A4=440) */
const STANDARD_A4 = 440

/** Tone name */
const NAME_TO_CENT = Object.freeze({
  'C': 0,
  'D': 200,
  'E': 400,
  'F': 500,
  'G': 700,
  'A': 900,
  'B': 1100,
  'c': 0,
  'd': 200,
  'e': 400,
  'f': 500,
  'g': 700,
  'a': 900,
  'b': 1100
})

/** Halftone sign */
const SIGN_TO_CENT = Object.freeze({
  '#': 100,
  '+': 100,
  'b': -100,
  '-': -100,
  ' ': 0
})

/**
 * Get cent value of musical note.
 * @param {String} note Musical note. (eg. 'A 4', 'C#5', 'Gb2')
 * @param {Number} semi Transpose note by semitone unit
 * @param {Number} cent Detuning pitch by cent unit.
 */
const getCent = (note, semi = 0, cent = 0) => {
  const name = NAME_TO_CENT[note[0]]
  const sign = SIGN_TO_CENT[note[1]]
  const octa = (parseInt(note[2]) + 1) * 1200
  return name + sign + octa + (semi * 100) + cent
}

/**
 * Get frequency of musical note.
 * @param {String} note Musical note. (eg. 'A 4', 'C#5', 'Gb2')
 * @param {Number} semi Transpose note by semitone unit
 * @param {Number} cent Detuning pitch by cent unit.
 */
const getFreq = (note, semi = 0, cent = 0) => {
  const centVal = getCent(note, semi, cent)
  const freqRatio = (centVal - 6900) / 1200
  return STANDARD_A4 * Math.pow(2, freqRatio)
}

module.exports = getFreq
