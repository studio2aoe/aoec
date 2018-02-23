const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
const aoec = new Aoec(AUDIO_CONTEXT, 4096, 'BBCNS')
