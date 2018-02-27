# aoec (AOE Chipsound)
- Web-audio-based chiptune sound engine. 
- This project is part of aoetracker.

## GOAL
### PSG-like chip sound
- GB, NES style 4-bit quantized sound.
- It doesn't emulate any soundchip but works just similar way.

## Implemented
- Processor:
  - ScriptProcessorNode based. mix waveforms from each channel and send to output.
- Waveform Generator:
  - Generates waveform to send processor.
  - Built-in waveform (pulse, triangle, sawtooth)
  - Custom waveform (stored in memory)
  - White noise (LFSR based)
- Mixer: Control volumes of each channels.
- Scheduler: Execute event when processor reads each sample. For example, it is used for execute events that change properties of waveform generator such as frequency, waveform, volume.

## TO DO
- PCM Sampler(Waveform Generator)
  - Generates waveform from PCM sample such as wav file.
- Write Documentation

## How to use

### Load in browser (require browser supports web audio api)

- Download `aoec.bundle.js` from [release page](https://github.com/studio2aoe/aoec/releases)
- Load aoec in browser by `<script>` tag

```HTML
<script src="./aoec.bundle.js"></script>
```

### Load in NodeJS (require web audio api implementation for nodejs)

- Install from npm
```sh
$ npm install aoec
```
- Load aoec in your app as module.
```js
const aoec = require('aoec')
```

### Initialize processor

- use `aoec.Processor.init()`
- First argument is audio context for target environment.
- Second argument is buffer size. it must be 2^n integer 256 to 16384

- Initialize example for browser.

```js
const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()

aoec.Processor.init(AUDIO_CONTEXT, 4096)
```

- Initialize example for node with `web-audio-api` and `speaker`

```js
const aoec = require('aoec')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

aoec.Processor.init(AUDIO_CONTEXT, 4096)
```

### Initialize waveform generators

- use `aoec.GeneratorSet.init()`
- argument is string of generator types. each character is type of generator.
- `B` means Bulit-in Generator, `C` is Custom-waveform, `N` is Noise, `S` is PCM sampler (sampler is not support yet.)

```js
/* Create 4 Channel: 2 Built-in, 1 Custom, 1 Noise */
aoec.GeneratorSet.init('BBCN')
```

### Connect to other nodes

- use `aoec.Processor.connect()`
- argument is destination audio node.
- `aoec.Processor.disconnect()` is used for disconnect.

```js
const masterGain = AUDIO_CONTEXT.createGain()
masterGain.connect(AUDIO_CONTEXT.destination)
aoec.Processor.connect(masterGain)
```

### Set Generator properties

- use `aoec.GeneratorSet.send()`
- `aoec.GeneratorSet.send()` has 6 arguments: `idx, freq, num, inv, volL, volR`
- `idx` is Generator ID. if `idx` is 3, send function works to Generator 3.
- `freq` is Frequency of waveform.
- `num` is Number of waveform. it works differently each generator type.
- `inv` is Inversed-waveform option.
- `volL` and `volR` is Left, Right channel volume. volume value is 1-digit hexadecimal (0 to 0xF)

```js
aoec.GeneratorSet.send(0, 440, 4, 0, 15, 15)
```

### Play generators

- use `aoec.Processor.play()`
- `aoec.Processor.stop()` stops generators.


### Use Schedulers

- When processor read 1 sample (1/44100sec), scheduler function works 1 time. defaultly it is empty, it can be written by `aoec.Scheduler.setFunc()`

- When scheduler function is called, it receive one argument. the argument is total samples that is read by processor since start `play()`. it is similar to processor running time.

```js
const schEvent(clock) {
  if (clock % 22050 === 0) {
    console.log('This message is logged every 0.5 second')
  }
}
aoec.Scheduler.setFunc(schEvent)
```