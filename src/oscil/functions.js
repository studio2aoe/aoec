const pulse = duty => id => (id >= duty) ? 0 : 15
const triangle = id => (id < 16) ? id : -id + 31
const sawtooth = id => Math.floor(id / 2)

module.exports = {
  pulse: pulse,
  triangle: triangle,
  sawtooth: sawtooth
}
