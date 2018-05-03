# aoec (AOE Chipsound)
- Web-audio-based chiptune sound engine
- This is part of aoetracker

## GOAL
### PSG-like chiptune sound
- GB, NES style 4-bit quantized sound
- It doesn't emulate any chip but works just similar way

## Implemented
- `Processor`: `ScriptProcessorNode` based. Convert hex signal to audio signal and output to destination.
- `Instrument`: Create 4-bit quantized (hexadecimal) audio signal.
  - Type `O`: Oscillator track. generate function-based signal. It works like pulse track, but it can oscillate other waveforms. (eg. triangle, sawtooth)
  - Type `W`: Waveform track. generate memory-based signal. It works like Famicom N163 extension or Gameboy WAV track.
  - Type `N`: Noise track. generate random signal from 15-bit linear feedback shift register. It works like noise track of Famicom & Gameboy.
- `Memory`: Store waveform, oscillator function, automation table, instrument preset.
- `Mixer`: Control gain of each track.
- `Scheduler`: Control automation table and tempo

## TO DO
- `Instrument` type `S`: PCM Sampler track. generate sample-based signal. It works like Famicom DPCM or Gameboy WAV track.
- Write Documentation
- `Processor` implementation based on `AudioWorklet`
- API for access tuning function memory.
- setInv function of instrument object.

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

#### `setTuneType`
- Set tuning type (tuning function) of track. it determines pitch notation method.
- Parameter is ID of tuning type, it must be 0x0 to 0xF
  - `0` is 12-Equal Temperament, default tuning function.
  - `1` is Gameboy style noise pitch notation
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
- Set automation table of type `A`, `D`, `E`, `W`
  - `A` is Arpeggio, controls pitch by semitone unit. it is used for make arpeggio
  - `D` is Detune, controls pitch by cent unit. it is used for make vibrato
  - `E` is Envelope, controls volume. it is used for make envelope.
  - `W` is Waveform, controls waveform type. it is used for make timbre
- Paramter is ID of automation table, it must be 0x00 to 0xFF
- See `Memory.Automation` section.
```javascript
inst0.setA(4)
inst1.setD(5)
inst2.setE(6)
inst3.setW(7)
```

#### `setInst`
- Set instrument preset. it stores tune type, bank, automation `A`, `D`, `E`, `W`.
- Parameter is ID of instrument preset.
- See `Memory.Instrument` section.
```javascript
inst1.setInst(3)
```

#### `release`
Release automation from loop. some automations have and repeat loop, but when the automations released, them will ignore loop and be processing to end of automation.
```javascript
inst1.release()
```

### `Memory.Automation`
It has 4 memory for each automation type (`A`, `D`, `E`, `W`), each memory can store 256 automation table.
#### `init`
- Initialize memory, all memories will be erased.
#### `read`
- Read table from memory.
- First param is automation type, Second is table id.
#### `write`
- Write table to memory.
- First param is automation type, Second is table id, Third is automation table data.
#### How to write table data
- Table data object is composed 4 properties: `name`, `list`, `loopstart`, `loopend`.
  - `name` is name of automation table. It must be string type, max 32-bytes.
  - `list` is automation data. Each value must be unsigned byte integer (0 to 255)
    - Type `A`: Change pitch by semitone (100cent, 1/12 octave) unit.
    - Type `D`: Change pitch by cent (1/100 semitone, 1/1200 octave) unit.
    - Type `E`: Change volume. Each hex digit is Left / Right volume. (eg. 0xDF: Left 13 and Right 15)
    - Type `W`: Change waveform. it works differently by track types
      - `O` track: Load function from memory, ID is `W` value.
        - `0x00` to `0x1F`: Pulse wave which has duty cycle n/32. (eg. `0x10`: 50%)
        - `0x20` to `0x2F`: Triangle wave
        - `0x30` to `0x3F`: Sawtooth wave
        - `0x40` and after: Empty function. See `Memory.Oscillator`
      - `W` track: Determines last 2 hex-digit of waveform memory ID.
        - See `Memory.Waveform`
      - `N` track: Change LFSR tap.
        - `0`: Use tap 1, noise loop length will be 32767-bit. (soft noise)
        - `1`: Use tap 6, noise loop length will be 93-bit. (metallic noise)
        - Others: Don't change LFSR tap.
  - `loopstart` is start point of loop. it must be positive integer (include `0`) or `-1`
    - defaultly, this value is `-1`, means the automation has no loop start point.
    - if the automation has `loopstart` and isn't released, it repeated from `loopstart` when it reaches `loopend` or last value (when no `loopend`)
  - `loopend` is end point of loop. it must be positive integer or `-1`
    - defaultly, this value is `-1`, means no loop end point.
    - if the automation isn't released and when it reaches `loopend`, it jumps to `loopstart` or holded on `loopend` (when no `loopstart`)
```javascript
/* Arpeggio automation example
 * Major triad chord (root, 3rd, 5th) */
aoec.Memory.Automation.write('A', {
  name: 'Major chord',
  list: [0, 4, 7],
  loopstart: 0
})

/* Detune automation example
 * Vibrato depth: 1 semitone (100 cent)
 * Vibtato period: 6-ticks (quarter beat) */
aoec.Memory.Automation.write('D', {
  name: 'Vibrato',
  list: [0, 33, 67, 100, 67, 33],
  loopstart: 0
})

/* Envelope automation example.
 * Attack: 3-ticks to Left F / Right F
 * Decay: 3-ticks
 * Sustain: Left C / Right C
 * Release: 4-ticks */
aoec.Memory.Automation.write('E', {
  name: 'Lead Automation',
  list: [0x00, 0x88, 0xFF, 0xEE, 0xDD, 0xCC, 0x88, 0x44, 0x00],
  loopstart: 5,
  loopend: 5
})

/* Waveform automation example 
 * Change pulse wave duty cycle 3% to 50% for 6-ticks */
aoec.Memory.Automation.write('W', {
  name: 'Acid bass',
  list: [1, 4, 7, 10, 13, 16],
  loopend: 5
})
```


### `Memory.Waveform`
- It has single memory which can store 65536 waveforms. (`0x0000` to `0xFFFF`)
- Bank value determines first 2 hex-digits, `W` automation determines last 2 hex-digits.
```

```
#### `init`
- Initialize memory, all memories will be erased.
#### `read`
- Read table from memory.
- First param is automation type, Second is table id.
#### `write`
- Write table to memory.
- First param is automation type, Second is table id, Third is automation table data.
#### How to write table data

NEED WRITE
