# aoec v0.4.0
- Web-audio-based chiptune sound engine
- This is part of aoetracker

## Index
- [Goal](#goal)
- [Implemented](#implemented)
- [To do](#to-do)
- [Require](#require)
- [How to load](#how-to-load)
- [How to use](#how-to-use)
  - [`Processor` module](#processor-module)
  - [`Instrument` module](#instrument-module)
  - [Each instrument object (from `Instrument.getInst()`)](#each-instrument-object-from-instrumentgetinst)
  - [`Memory.Automation` module](#memoryautomation-module)
  - [`Memory.Waveform` module](#memorywaveform-module)
  - [`Memory.Oscillator` module](#memoryoscillator-module)
  - [`Memory.Instrument` module](#memoryinstrument-module)
  - [`Memory.Tuning` module](#memorytuning-module)
  - [`Mixer` module](#mixer-module)
  - [`Scheduler` module](#scheduler-module)
- [License](#license)

## Goal

### PSG-like chiptune sound
- GB, NES style 4-bit quantized sound
- It doesn't emulate any chip but works just similar way

## Implemented
- `Processor`: `ScriptProcessorNode` based. Convert hex signal to audio signal and output to destination.
- `Instrument`: Create 4-bit quantized (hexadecimal) audio signal.
  - Type `O`: Oscillator track. generate function-based signal. It works like pulse track, but it can oscillate other waveforms. (eg. triangle, sawtooth)
  - Type `W`: Waveform track. generate memory-based signal. It works like Famicom N163 extension or Gameboy WAV track.
  - Type `N`: Noise track. generate random signal from 15-bit linear feedback shift register. It works like noise track of Famicom & Gameboy.
- `Memory`: Store waveform, oscillator function, automation sequence, instrument preset.
- `Mixer`: Control gain of each track.
- `Scheduler`: Control automation sequence and tempo

## To do
- Create GUI demonstration
- `Instrument` type `S`: PCM Sampler track. generate sample-based signal. It works like Famicom DPCM or Gameboy WAV track.
- `Processor` implementation based on `AudioWorklet`

## Require
- Implementation of Web Audio API (need support `ScriptProcessorNode`)
    - Modern web browser (Tested on Chrome, Firefox)
    - NodeJs runtime (Tested on NodeJs 8.x LTS + npm web-audio-api + npm speaker)

## How to load

### Load on Browser
- Download `aoec.bundle.js` on release
- Load on browser
- Use `aoec` module

```html
<script src="./js/aoec.bundle.js"/>
<script>
    var AUDIO_CONTEXT = new window.AudioContext()
    aoec.Processor.init(AUDIO_CONTEXT, 4096)

    /* ... */    
</script>
```

### Load on NodeJs runtime
- Install `aoec` module and Web Audio API implementation (I'll use `web-audio-api` and `speaker`)
-
```sh
$ npm install --save aoec web-audio-api speaker
```

- Load modules and setup AudioContext
- use `aoec` module

```javascript
const aoec = require('aoec')
const Speaker = require('speaker')
const WebAudioAPI = require('web-audio-api')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

aoec.Processor.init(AUDIO_CONTEXT, 4096)

/* ... */
```

### Load on NodeJs and bundle for browser (eg. webpack)
- Install and load `aoec` module
- Web Audio API implementation isn't need (using implementation on browser)

```javascript
const aoec = require('aoec')

const AUDIO_CONTEXT = new window.AudioContext()
aoec.Processor.init(AUDIO_CONTEXT, 4096)

/* ... */
```

- AOEC is writted on ES6. if transpiling is needed, aoec should be transpiled also.

```javascript
const path = require('path')
const webpack = require('webpack')

const config = {
  /* ... */
  module: {
    rules: [
      // Transpile ES6
      {
        test: /\.js/,
        include: [
          path.resolve(__dirname, 'src'), // add your source to transpile
          path.resolve(__dirname, 'node_modules', 'aoec') // add aoec module to transpile
        ],
        use: [
          { loader: 'babel-loader', options: { presets: [ 'env' ] } },
          { loader: 'eslint-loader' }
        ]
      }
    ]
  },

  /* ... */
}

/* ... */
```

## How to use

### `Processor` module

#### `Processor.init`
- Initialize processor module.
- First parameter is AudioContext object.
- Second parameter is buffer size of ScriptProcessorNode, it must be 2^n integer 256 to 16384.

```javascript
const AUDIO_CONTEXT = new window.AudioContext()

aoec.Processor.init(AUDIO_CONTEXT, 4096)

```

#### `Processor.connect`
- Connect processor to other audio node.
- First parameter is destination.

```javascript
aoec.Processor.connect(AUDIO_CONTEXT.destination)
```

#### `Processor.disconnect`
- Disconnect processor from connected node.

```javascript
aoec.Processor.disconnect()
```

#### `Processor.play`
- Run processor and play sound.

```javascript
aoec.Processor.play()
```

#### `Processor.stop`
- Stop processor and clear buffer.

```javascript
aoec.Processor.stop()
```

### `Instrument` module

#### `Instrument.init`
- Initialize instruments(tracks).
- Parameter is type string, it determines how many tracks are created and type of each track.
  - `O` is Oscillator track
  - `W` is Waveform track
  - `N` is Noise track
  - `S` is Sampler track (Not implemented)

```javascript
aoec.Instrument.init('OOWN') // It creates 2 Oscil, 1 Wave, 1 Noise tracks.
```

#### `Instrument.getInst`
- Access instrument object to control instrument.
- Parameter is ID of instrument

```javascript
const Inst0 = aoec.Instru,ent.getInst(0)
const Inst1 = aoec.Instrument.getInst(1)
const Inst2 = aoec.Instrument.getInst(2)
const Inst3 = aoec.Instrument.getInst(3)
```

#### `Instrument.getType`
- Get type of instrument.
- Parameter is ID of instrument.

```javascript
const Type1 = aoec.Instrument.getType(1) // It will returns 'O' (Oscil) because instruments are initialized by 'OOWN'.
const Type2 = aoec.Instrument.getType(2) // return 'W' (Waveform)
const Type3 = aoec.Instrument.getType(3) // return 'N' (Noise)
```

### Each instrument object (from `Instrument.getInst()`)

#### `setNote`
- Set pitch notation of instrument.
- Parameter is note string, it's syntax differs by tuning function.

```javascript
inst1.setNote('A 4') // A on 4th octave (=440Hz). space on second char means no transpose.
inst1.setNote('A#4') // Sharp (transpose +1 semitone) is expressed by # or +
inst1.setNote('Gb4') // Flat (transpose -1 semitone) is expressed by b or -
```

#### `setVol`
- Set volume of instrument.
- It needs two parameters, each param is left channel / right channel volume value.
- volume value must be 0x0 to 0xF
- If param is invalid, volume isn't changed. (eg. undefined)

```javascript
inst1.setVol(0xF, 0xB) // Set volume Left: 15, Right: 11
inst3.setVol(undefined, 0x8) // Set volume only Right: 8, left volume isn't changed.
```

#### `setVolL`, `setVolR`
- Set Left or Right volume only.
- Parameter is volume value.
- If param is invalid, volume isn't changed. (eg. undefined)

```javascript
inst1.setVolL(0xF) // It is same to inst1.setVol(0xF)
inst1.setVolR(0xF) // It is same to inst1.setVol(undefined, 0xF)
```

#### `setInv`
- Set inversed waveform
- Parameter is boolean, it means 'is waveform inversed?'

```javascript
inst1.setInv(true)
```

#### `setTuneType`
- Set tuning type (tuning function) of track. it determines pitch notation method.
- Parameter is ID of tuning type, it must be 0x0 to 0xF
  - `0` is 12-Equal Temperament, default tuning function.
  - `1` is Gameboy style noise pitch notation
  - See [`Memory.Tuning`](#memorytuning-module) section.

```javascript
inst3.setTuneType(1)
inst3.setNote('A 4') // It not works
inst3.setNote('AF ') // 16384Hz, It is proper to noise snare.
```

#### `setBank` (Type `W` only)
- Set waveform bank id. It determines first 2 hex-digit of waveform memory ID
- Parameter is ID of bank, it must be 0x00 to 0xFF

```javascript
inst2.setBank(0xF) // Using 16th bank
```

#### `setA`, `setD`, `setE`, `setW`
- Set automation sequence of type `A`, `D`, `E`, `W`
  - `A` is Arpeggio, controls pitch by semitone unit. it is used for make arpeggio
  - `D` is Detune, controls pitch by cent unit. it is used for make vibrato
  - `E` is Envelope, controls volume. it is used for make envelope.
  - `W` is Waveform, controls waveform type. it is used for make timbre
- Paramter is ID of automation sequence, it must be 0x00 to 0xFF
- See [`Memory.Automation`](#memoryautomation-module) section.

```javascript
inst0.setA(4)
inst1.setD(5)
inst2.setE(6)
inst3.setW(7)
```

#### `setQuickA`, `setQuickD`, `setQuickE`, `setQuickW`
- Set automation sequence directly.
- Parameter is automation sequence object
- See [`Memory.Automation`](#memoryautomation-module) section.

```javascript
inst0.setQuickA({
  name: 'Power chord',
  list: [0, 7, 12],
  loopstart: 0,
  loopend: 2
})
```

#### `setInst`
- Set instrument preset. it stores tune type, bank, automation `A`, `D`, `E`, `W`.
- Parameter is ID of instrument preset.
- See [`Memory.Instrument`](#memoryinstrument-module) section.

```javascript
inst1.setInst(3)
```

#### `release`
Release automation from loop. some automations have and repeat loop, but when the automations released, them will ignore loop and be processing to end of automation.

```javascript
inst1.release()
```

### `Memory.Automation` module
It has 4 memory for automation type `A`, `D`, `E`, `W`, each memory can store 256 automation sequence.

#### `Memory.Automation.init`
- Initialize memory, all memories will be erased.

#### `Memory.Automation.read`
- Read sequence from memory.
- First param is automation type, Second is sequence id.

#### `Memory.Automation.write`
- Write sequence to memory.
- First param is automation type, Second is sequence id, Third is sequence data.

#### How to write sequence data
- Sequence data object is composed 4 properties: `name`, `list`, `loopstart`, `loopend`.
  - `name` is name of automation sequence. It must be string type, max 32-bytes.
  - `list` is automation sequence data. Each value must be unsigned byte integer (0 to 255)
    - Type `A`: Change pitch by semitone (100cent, 1/12 octave) unit.
    - Type `D`: Change pitch by cent (1/100 semitone, 1/1200 octave) unit.
    - Type `E`: Change volume. Each hex digit is Left / Right volume. (eg. 0xDF: Left 13 and Right 15)
    - Type `W`: Change waveform. it works differently by track types
      - `O` track: Load function from memory, ID is `W` value.
        - See [`Memory.Oscillator`](#memoryoscillator-module)
      - `W` track: Determines last 2 hex-digit of waveform memory ID.
        - See [`Memory.Waveform`](#memorywaveform-module)
      - `N` track: Change LFSR tap.
        - `0`: Use tap 1, noise loop length will be 32767-bit. (soft noise)
        - `1`: Use tap 6, noise loop length will be 93-bit. (metallic noise)
        - Others: Don't change LFSR tap.
  - `loopstart` is start point of loop. it must be positive integer (include `0`) or `-1`
    - defaultly, this value is `-1`, means the automation sequence has no loop start point.
    - if the sequence has `loopstart` and isn't released, it repeated from `loopstart` when it reaches `loopend` or last value (when no `loopend`)
  - `loopend` is end point of loop. it must be positive integer or `-1`
    - defaultly, this value is `-1`, means no loop end point.
    - if the sequence isn't released and when it reaches `loopend`, it jumps to `loopstart` or holded on `loopend` (when no `loopstart`)

```javascript
/* Arpeggio type example
 * Major triad chord (root, 3rd, 5th) */
aoec.Memory.Automation.write('A', 0x01, {
  name: 'Major chord',
  list: [0, 4, 7],
  loopstart: 0
})

/* Detune type example
 * Vibrato depth: 1 semitone (100 cent)
 * Vibtato period: 6-ticks (quarter beat) */
aoec.Memory.Automation.write('D', 0x02, {
  name: 'Vibrato',
  list: [0, 33, 67, 100, 67, 33],
  loopstart: 0
})

/* Envelope type example.
 * Attack: 3-ticks to Left F / Right F
 * Decay: 3-ticks
 * Sustain: Left C / Right C
 * Release: 4-ticks */
aoec.Memory.Automation.write('E', 0x73, {
  name: 'Lead Automation',
  list: [0x00, 0x88, 0xFF, 0xEE, 0xDD, 0xCC, 0x88, 0x44, 0x00],
  loopstart: 5,
  loopend: 5
})

/* Waveform type example 
 * Change pulse wave duty cycle 3% to 50% for 6-ticks */
aoec.Memory.Automation.write('W', 0xFE, {
  name: 'Acid bass',
  list: [1, 4, 7, 10, 13, 16],
  loopend: 5
})
```


### `Memory.Waveform` module
- It has single memory which can store 65536 waveforms. (`0x0000` to `0xFFFF`)
- Bank value determines first 2 hex-digits, `W` automation determines last 2 hex-digits.

```javascript
Inst1.setBank(0xCD)
aoec.Memory.Automation.write('W', 0x04, {
  name: '',
  list: [0xAB, 0xCD, 0xEF],
  loopstart: 0,
  loopend: 3
})
Inst1.setW(0x04)
/* Inst will be repeat waveform 0xCDAB, 0xCDCD, 0xCDEF */
```

#### `Memory.Waveform.init`
- Initialize memory, all memories will be erased.

#### `Memory.Waveform.read`
- Read waveform from memory.
- First param is waveform id.

#### `Memory.Waveform.write`
- Write waveform to memory.
- First param is waveform id, Second is waveform data.

#### How to write waveform data
- Waveform data has 2 properties, `name` and `list`
  - `name` is name of waveform. It must be string type, max 32-bytes.
  - `list` is 4-bit PCM sample data. Each value must be single hex-digit. Total length must be 32, 32 hex-digits compose single period of waveform.

```javascript
/* Waveform Example */
aoec.Memory.Waveform.write(0x37, {
  name: "Clipped Sawtooth",
  list: [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7,
    0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
    0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
    0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF]
})
```

### `Memory.Oscillator` module
- It has single memory which can store 256 functions (`0x00` ~ `0xFF`)
- Memory has these default oscillator functions:
  - `0x00` to `0x1F`: Pulse wave which has duty cycle n/32. (eg. `0x10`: 50%)
  - `0x20` to `0x2F`: Triangle wave
  - `0x30` to `0x3F`: Sawtooth wave
  - `0x40` and after: Empty function

#### `Memory.Oscillator.init`
- Initialize memory, all memories will be erased and set default functions

#### `Memory.Oscillator.read`
- Read function from memory.
- First param is function id.

#### `Memory.Oscillator.write`
- Write function to memory.
- First param is function id, Second is function data.

#### How to write function data
- Function data has 2 properties, `name` and `func`
  - `name` is name of function. It must be string type, max 32-bytes.
  - `func` is function or lambda-expression.
    - parameter is integer in range `0` to `31`, it means phase-value in single period of waveform.
    - return value is single hexadecimal digit, it means 4-bit quantized PCM sample data.

```javascript
/* Oscillator function data example.
 * It makes below waveform like sine-wave,
 * [8, 9, 11, 12, 13, 14, 15, 15, 15, 15, 15, 14, 13, 12, 11, 9,
 *  8, 6, 4, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 4, 6] */
aoec.Memory.Oscillator.write(0x40, {
  name: 'Sine wave',
  func: function (phase) {
    const hexdigit = Math.floor(Math.sin((phase * Math.PI) / 16) * 8 + 8)
    if (hexdigit === 16) hexdigit = 15
    return hexdigit
  }
})
```

### `Memory.Instrument` module
- It has single memory which can store 256 instrument presets (`0x00` ~ `0xFF`)

#### `Memory.Instrument.init`
- Initialize memory, all memories will be erased.

#### `Memory.Instrument.read`
- Read preset from memory.
- First param is function id.

#### `Memory.Instrumemt.write`
- Write preset to memory.
- First param is function id, Second is preset data.

#### How to write function data
- preset data has 7 properties, `name`, `tuneType`, `bank`, `seqA`, `seqD`, `seqE`, `seqW`
  - `name` is name of preset. It must be string type, max 32-bytes.
  - `tuneType` is Tuning function, will be applied to `setTuneType()`
  - `bank` is Bank ID, will be applied to `setBank()`
  - `seqA`, `seqD`, `seqE`, `seqW` are sequence IDs of automation type `A`, `D`, `E`, `W`. these will be applied to `setA()`, `setD()`, `setE()`, `setQ()`
  - Empty or `undefined` properties means no change.

```javascript
aoec.Memory.Instrument.write(3, {
  name: 'example inst',
  tuneType: 0, // Use 12-equal temperament
  bank: 0, // Use bank ID: 0
  seqA: undefined, // Don't change automation A
  seqD: undefined, // Don`t change automation D
  seqE: 0xEF, // Use automation E sequence ID: 0xEF
  // seqW will not changed.
})
Inst2.setInst(3)
/* Inst2.setInst(3) means applying below functions,
 * Inst2.setTuneType(0)
 * Inst2.setBank(0)
 * Inst2.setE(0xEF)
 */
```

### `Memory.Tuning` module
- It has single memory which can store 16 tuning functions
- Memory has these default tuning function:
  - `0` is 12-Equal Temperament, default tuning function.
  - `1` is Gameboy style noise pitch notation

#### `Memory.Tuning.init`
- Initialize memory

#### `Memory.Tuning.write`
- Write tuning function to memory.
- First param is id, second param is function or lambda-expression.

#### How to write tuning function
- Tuning function has 3 parameter, `note`, `semi`, `cent`.
- `note` is 3-byte string, musical note for using `setNote` function of instrument object.
- `semi` is number, transposition of pitch by semitone (1/12 octave) unit.
- `cent` is number, transposition of pitch by cent (1/1200 octave) unit.
- Return value is frequency
- Following example is source of 12-equal temperament function(id: 0), exported `getFreq` is tuning function.

```javascript
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
```

### `Mixer` module
- Mixer module controls gain of each track.

#### `Mixer.reset`
- Reset mixer gain values to default. Default value is 0.25 = 0.0dB

#### `Mixer.getGain`
- Get gain value from track.
- Parameter is ID of track

#### `Mixer.setGain`
- Set gain value to track.
- First param is ID of track, second is gain value.
  - Gain value is real number in range 0.0 to 1.0

#### `Mixer.getDecibel`
- Get gain value of decibel unit from track.
- Parameter is ID of track.
- Return value is calculated decibel unit. 0.25 is calculated to 0.0dB

#### `Mixer.setDecibel`
- Set gain value by decibel unit
- First param is ID of track, second is gain value of decibel unit.
  - Maximum is `20 * Math.log10(4)`, approximately +12.04, calculated to 1.0
  - Minimum is `-Infinity`, calculated to 0.0
  - 0.0dB is calculated to 0.25

```javascript
aoec.Mixer.reset()
aoec.Mixer.setGain(0, 0.5)
aoec.Mixer.getDecibel(0) // approximately 6.0dB
aoec.Mixer.setDecibel(1, 12)
aoec.Mixer.getGain(1) // approximately 1.0
```

### `Scheduler` module
- Scheduler module controls automation and user's scheduling function.

#### `Scheduler.setTempo`
- Set tempo value. Param is tempo value of BPM unit.

#### `Scheduler.getTempo`
- Get tempo value. value is BPM unit.

#### `Scheduler.getPeriod`
- Get 1-tick(step) period of automation. It is 1/24 beat, so it differs by tempo value.
- Return value is sample (1/44100hz) unit.
- eg. When tempo value is 125, 1 beat is 60 / 125 = 0.48sec, 1/24 beat is 0.48 / 24 = 0.02sec. `Scheduler.getPeriod` will return 882, it is same to 0.02 second.

```javascript
aoec.Scheduler.setTempo(62.5)
aoec.Scheduler.getTempo() // 62.5
aoec.Scheduler.getPeriod() // 441
```

#### `Scheduler.setFunc`
- Set function to run every 1-tick (every automation steps)
- Parameter is function or lambda-expression. it has 1 parameter: sampling count.
- When processor sample every audio data, sampling count is added 1. (every 1 second sampled, sampling count is added 44100)

```javascript
aoec.Scheduler.setFunc(count => {
  if (count % (aoec.Scheduler.getPeriod() * 24) < 1) {
    console.log('Every 1 beat, this message logged on console.')
  }
})
```

## License
The MIT License (MIT)
Copyright (c) 2018 [studio2AOE](https://github.com/studio2aoe)

See [LICENSE.md](./LICENSE.md)
