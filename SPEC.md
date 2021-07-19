# aoec: chiptune style soundchip

# Soundchips
Generate the sound sample

# Traits
All of the aoec soundchips must implement `aoec::Play`,
and should implement `aoec::Control`

## `aoec::Play`
- `clock(&mut self)`: Clock the soundchip to generate the next sample
- `read_sample(&self, ch: usize) -> f32`: Read the current sample of given channel

## `aoec::Control`
The setters and getters of these parameters:
  - Frequency (freq): the pitch of sound, determine clock speed
  - Volume (vol): the volume of sound
  - Muting (mute): If the soundchip is mute
  - Custom parameters (param): Usually used to change the timbre

- `set_freq(&mut self)`
- `set_vol(&mut self, ch: usize, vol: u8)`
- `set_mute(&mut self, mute: bool)`
- `set_param(&mut self, key: usize, value: u32)`

- `get_freq(&self) -> f32`
- `get_vol(&self, ch: usize) -> u8`
- `get_mute(&self) -> bool`
- `get_param(&self, key: usize) -> u32`

# Structs
Actual soundchip structs implementing above traits.

## `aoec::BuiltIn`
- Generating mathmatically oscillated, built-in waveform
- Noise (GB like), Pulse (with duty cycle), Triangle, Sawtooth (positive, negative)

## `aoec::Custom`
- Generating the 32-sample length custom waveform (It likes the wave track of Gameboy)
- The memory limit is 65536-waveforms (ID `0x0000` \~ ID `0xFFFF`)

## `aoec::Sample`
- Generating custom length waveform (It likes the DPCM sampler of NES)

---

# Subchips
The structs to support the aoec soundchips

## `aoec::OSC`  (private): Calculate clock speed from given frequency
## `aoec::DAC`  (private): Convert the sound sample from hex to f32
## `aoec::LFSR` (private): Generates the random number for noise waveform

---

# Memory
The memory structs

## `aoec::WaveformMemory` (private): The memory stores custom waveforms
## `aoec::SampleMemory`   (private): The memory stores PCM samples
