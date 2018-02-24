!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Aoec=t():e.Aoec=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(5),s=n(6),a=function(){function e(){r(this,e),this.freq=0,this.waveNum=0,this.isInv=0,this.volL=0,this.volR=0,this.isMute=!1,this.sequencer=new s(this)}return i(e,[{key:"setFreq",value:function(e){Number.isFinite(e)&&e>=0&&(e>22050&&(e=22050),this.freq=e,this.period=44100/e)}},{key:"setWaveform",value:function(e){Number.isInteger(e)&&e>=0&&(this.waveNum=e)}},{key:"setInv",value:function(e){"boolean"==typeof e&&(this.isInv=e)}},{key:"setVol",value:function(e,t){var n=Number.isInteger(e)&&e>=0&&e<=15,r=Number.isInteger(t)&&t>=0&&t<=15;n&&r&&(this.volL=e,this.volR=t)}},{key:"setMute",value:function(e){"boolean"==typeof e&&(this.isMute=e)}},{key:"calcPhaseValue",value:function(e){return 0}},{key:"getPhaseAngle",value:function(e){return e%this.period/this.period}},{key:"getPhaseValue",value:function(e){if(!0===this.isMute||0===this.freq||0===this.volL&&0===this.volR)return[0,0];var t=this.calcPhaseValue(e),n=o(t,this.volL),r=o(t,this.volR);return[this.isInv?15-n:n,this.isInv?15-r:r]}},{key:"send",value:function(e,t,n,r,i){this.setFreq(e),this.setWaveform(t),this.setInv(n),this.setVol(r,i)}},{key:"setStep",value:function(e){this.sequencer.setStep(e)}}]),e}();e.exports=a},function(e,t,n){"use strict";function r(e,t){try{u[e].write(t)}catch(t){"WaveformLocked"===t.name&&(t.message="Waveform ID "+e+" is locked. waveform change failed.")}}function i(e){return u[e].read()}function o(e){u[e].lock()}function s(e){u[e].unlock()}for(var a=n(10),u=new Array(1024),c=0;c<1024;c++)u[c]=new a;e.exports={write:r,read:i,lock:o,unlock:s}},function(e,t,n){"use strict";var r=n(3);e.exports=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(4),s=n(7),a=n(9),u=n(1),c=function(){function e(t,n,i){r(this,e),this.master=t.createGain(),this.master.connect(t.destination),this.processor=t.createScriptProcessor(n,2,2),this.resetGenerator(i),this.WaveMemory=u}return i(e,[{key:"resetGenerator",value:function(e){var t=this;this.disconnect(),this.generator=[],e.split("").forEach(function(e){switch(e){case"B":t.generator.push(new o);break;case"C":t.generator.push(new a);break;case"N":t.generator.push(new s)}})}},{key:"setMasterVolume",value:function(e){this.master.gain.setValueAtTime(e,this.master.context.currentTime)}},{key:"connect",value:function(){var e=0,t=0,n=this,r=this.processor.bufferSize;this.processor.connect(this.master),this.processor.onaudioprocess=function(i){for(var o=[i.outputBuffer.getChannelData(0),i.outputBuffer.getChannelData(1)],s=0;s<r;s++){var a=0,u=0;n.generator.forEach(function(t){a+=t.getPhaseValue(e)[0],u+=t.getPhaseValue(e)[1]}),a/=16,a-=.5,u/=16,u-=.5,o[0][s]=a,o[1][s]=u,e++,t++,e%44100==0&&(e%=44100),t%918.75<1&&n.generator.forEach(function(e){e.sequencer.execute(),t%=918.75})}}}},{key:"disconnect",value:function(){this.processor.disconnect(),this.processor.onaudioprocess=function(e){}}}]),e}();e.exports=c},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),s(t,[{key:"calcPhaseValue",value:function(e){var t=void 0,n=this.getPhaseAngle(e);switch(this.waveNum){case 1:case 2:case 3:case 4:t=n>this.waveNum/8?0:15;break;case 5:t=n<.5?32*n:32*-n+32;break;case 6:t=16*n;break;default:return 0}return t=Math.floor(t)}}]),t}(a);e.exports=u},function(e,t,n){"use strict";for(var r=new Array(16),i=0;i<16;i++){r[i]=new Uint8Array(16);for(var o=0;o<16;o++)if(0===i||0===o)r[i][o]=0;else{var s=Math.floor(i*o/15);r[i][o]=s>1?s:1}}e.exports=function(e,t){return r[e][t]}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=[void 0,void 0,void 0,void 0,void 0],s={isLoop:!0,frameList:[o]},a=function(){function e(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];r(this,e),this.generator=t,this.setStep(s)}return i(e,[{key:"setStep",value:function(e){this.frameIndex=0,this.frameList=e.frameList,this.isLoop=e.isLoop,this.currentFrame=e.frameList[0]}},{key:"execute",value:function(){var e=this.currentFrame;this.generator.send(e[0],e[1],e[2],e[3],e[4]),this.next()}},{key:"next",value:function(){this.frameList.length-this.frameIndex==1?this.isLoop?(this.frameIndex=0,this.currentFrame=this.frameList[0]):this.currentFrame=o:(this.frameIndex++,this.currentFrame=this.frameList[this.frameIndex])}}]),e}();e.exports=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=n(8),c=function(e,t){if(e=Math.abs(e),(t=Math.abs(t))>e){var n=e;e=t,t=n}for(;;){if(0===t)return e;if(0===(e%=t))return t;t%=e}},f=function(e){function t(){r(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.lfsr=new u,e}return o(t,e),s(t,[{key:"setFreq",value:function(e){if(Number.isFinite(e)&&e>0){var t=c(e,44100);this.freq=e,this.divisedFreq=e/t,this.divisedRate=44100/t,this.quotient=Math.floor(this.divisedFreq/this.divisedRate),this.remainder=this.divisedFreq%this.divisedRate}}},{key:"setWaveform",value:function(e){1===e?(this.lfsr.setMode(!0),this.waveNum=e):0===e&&(this.lfsr.setMode(!1),this.waveNum=e)}},{key:"clock",value:function(e){for(var t=this.remainder*e%this.divisedRate<this.remainder,n=t?this.quotient+1:this.quotient,r=0;r<n;r++)this.lfsr.clock()}},{key:"calcPhaseValue",value:function(e){var t=this.lfsr.getHex();return this.clock(e),t}}]),t}(a);e.exports=f},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){r(this,e),this.__mode=0,this.__tapB=1,this.__register=1}return i(e,[{key:"setMode",value:function(e){this.__mode=e,this.__tapB=e?6:1}},{key:"clock",value:function(){var e=1&this.__register,t=this.__register>>this.__tapB&1,n=(e^t)<<14;this.__register>>=1,this.__register|=n}},{key:"getHex",value:function(){return this.__register>>11}}]),e}();e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=n(1),c=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),s(t,[{key:"setWaveform",value:function(e){Number.isInteger(e)&&e>=0&&e<1024&&(this.waveNum=e)}},{key:"calcPhaseValue",value:function(e){var t=Math.floor(32*this.getPhaseAngle(e));return u.read(this.waveNum)[t]}}]),t}(a);e.exports=c},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=32,s=function(){function e(t){r(this,e),this.__value=new Int8Array(o),this.write(t),this.unlock()}return i(e,[{key:"write",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.__isLock){var t=new Error;throw t.name="WaveformLocked",t.message="This waveform is locked",t}this.__value=this.__value.map(function(t,n){var r=parseInt(e[n],16);return Number.isInteger(r)&&r>=0&&r<=16?r:0})}},{key:"read",value:function(){return this.__value}},{key:"lock",value:function(){this.__isLock=!0}},{key:"unlock",value:function(){this.__isLock=!1}}]),e}();e.exports=s}])});