!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Aoec=t():e.Aoec=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(5),u=function(){function e(){r(this,e),this.freq=0,this.waveNum=0,this.isInv=0,this.volL=0,this.volR=0,this.isMute=!1}return o(e,[{key:"setFreq",value:function(e){Number.isFinite(e)&&e>=0&&(e>22050&&(e=22050),this.freq=e,this.period=44100/e)}},{key:"setWaveform",value:function(e){Number.isInteger(e)&&e>=0&&(this.waveNum=e)}},{key:"setInv",value:function(e){"boolean"==typeof e&&(this.isInv=e)}},{key:"setVol",value:function(e,t){var n=Number.isInteger(e)&&e>=0&&e<=15,r=Number.isInteger(t)&&t>=0&&t<=15;n&&r&&(this.volL=e,this.volR=t)}},{key:"setMute",value:function(e){"boolean"==typeof e&&(this.isMute=e)}},{key:"calcHexSignal",value:function(e){return 0}},{key:"getPhaseAngle",value:function(e){return e%this.period/this.period}},{key:"getHexSignal",value:function(e){if(!0===this.isMute||0===this.freq)return[7.5,7.5];var t=this.calcHexSignal(e),n=0===this.volL?7.5:i(t,this.volL)+Math.floor(8-this.volL/2),r=0===this.volL?7.5:i(t,this.volR)+Math.floor(8-this.volR/2);return[this.isInv?15-n:n,this.isInv?15-r:r]}},{key:"send",value:function(e,t,n,r,o){this.setFreq(e),this.setWaveform(t),this.setInv(n),this.setVol(r,o)}}]),e}();e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=r},function(e,t,n){"use strict";var r=n(3),o=void 0,i=void 0,u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4096;void 0!==i&&c(),o=e.createGain(),o.connect(e.destination),i=e.createScriptProcessor(t,2,2),r.init()},a=function(e){o.gain.setValueAtTime(e,o.context.currentTime)},s=function(){var e=0,t=i.bufferSize;i.connect(o),i.onaudioprocess=function(n){for(var o=[n.outputBuffer.getChannelData(0),n.outputBuffer.getChannelData(1)],i=0;i<t;i++){var u=r.getVoltage(e);o[0][i]=u[0],o[1][i]=u[1],e++}}},c=function(){i.disconnect(),i.onaudioprocess=function(e){}};e.exports={init:u,GeneratorSet:r,setMasterVolume:a,connect:s,disconnect:c}},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(8),u=n(11),a=[],s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"BBCNS";a=[],e.split("").forEach(function(e){return c(e)}),u.init(a.length)},c=function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:""){case"B":a.push(new r);break;case"C":a.push(new i);break;case"N":a.push(new o)}},f=function(e){var t=0,n=0;return a.forEach(function(r,o){var i=u.getGain(o);t+=(r.getHexSignal(e)[0]-7.5)/7.5*i,n+=(r.getHexSignal(e)[1]-7.5)/7.5*i}),[t,n]},l=function(e,t,n,r,o,i){a[e].setFreq(t),a[e].setWaveform(n),a[e].setInv(r),a[e].setVol(o,i)},h=function(){return a};e.exports={init:s,send:l,addGenerator:c,getVoltage:f,getGenerator:h}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"calcHexSignal",value:function(e){var t=void 0,n=this.getPhaseAngle(e);switch(this.waveNum){case 1:case 2:case 3:case 4:t=n>this.waveNum/8?0:15;break;case 5:t=n<.5?32*n:32*-n+32;break;case 6:t=16*n;break;default:return 0}return t=Math.floor(t)}}]),t}(a);e.exports=s},function(e,t,n){"use strict";for(var r=new Array(16),o=0;o<16;o++){r[o]=new Uint8Array(16);for(var i=0;i<16;i++)if(0===o||0===i)r[o][i]=0;else{var u=Math.floor(o*i/15);r[o][i]=u>1?u:1}}e.exports=function(e,t){return r[e][t]}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=n(7),c=function(e,t){if(e=Math.abs(e),(t=Math.abs(t))>e){var n=e;e=t,t=n}for(;;){if(0===t)return e;if(0===(e%=t))return t;t%=e}},f=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.lfsr=new s,e}return i(t,e),u(t,[{key:"setFreq",value:function(e){if(Number.isFinite(e)&&e>0){var t=c(e,44100);this.freq=e,this.divisedFreq=e/t,this.divisedRate=44100/t,this.quotient=Math.floor(this.divisedFreq/this.divisedRate),this.remainder=this.divisedFreq%this.divisedRate}}},{key:"setWaveform",value:function(e){1===e?(this.lfsr.setMode(!0),this.waveNum=e):0===e&&(this.lfsr.setMode(!1),this.waveNum=e)}},{key:"clock",value:function(e){for(var t=this.remainder*e%this.divisedRate<this.remainder,n=t?this.quotient+1:this.quotient,r=0;r<n;r++)this.lfsr.clock()}},{key:"calcHexSignal",value:function(e){var t=this.lfsr.getHex();return this.clock(e),t}}]),t}(a);e.exports=f},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),this.__mode=0,this.__tapB=1,this.__register=1}return o(e,[{key:"setMode",value:function(e){this.__mode=e,this.__tapB=e?6:1}},{key:"clock",value:function(){var e=1&this.__register,t=this.__register>>this.__tapB&1,n=(e^t)<<14;this.__register>>=1,this.__register|=n}},{key:"getHex",value:function(){return this.__register>>11}}]),e}();e.exports=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=n(9),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"setWaveform",value:function(e){Number.isInteger(e)&&e>=0&&e<1024&&(this.waveNum=e)}},{key:"calcHexSignal",value:function(e){var t=Math.floor(32*this.getPhaseAngle(e));return s.read(this.waveNum)[t]}}]),t}(a);e.exports=c},function(e,t,n){"use strict";function r(e,t){try{s[e].write(t)}catch(t){"WaveformLocked"===t.name&&(t.message="Waveform ID "+e+" is locked. waveform change failed.")}}function o(e){return s[e].read()}function i(e){s[e].lock()}function u(e){s[e].unlock()}for(var a=n(10),s=new Array(1024),c=0;c<1024;c++)s[c]=new a;e.exports={write:r,read:o,lock:i,unlock:u}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=32,u=function(){function e(t){r(this,e),this.__value=new Int8Array(i),this.write(t),this.unlock()}return o(e,[{key:"write",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.__isLock){var t=new Error;throw t.name="WaveformLocked",t.message="This waveform is locked",t}this.__value=this.__value.map(function(t,n){var r=parseInt(e[n],16);return Number.isInteger(r)&&r>=0&&r<=16?r:0})}},{key:"read",value:function(){return this.__value}},{key:"lock",value:function(){this.__isLock=!0}},{key:"unlock",value:function(){this.__isLock=!1}}]),e}();e.exports=u},function(e,t,n){"use strict";var r=[],o=function(e){r=new Array(e).fill(.25)},i=function(e){return r[e]},u=function(e,t){r[e]=t},a=function(e,t){t>12&&(t=12),t<-12&&(t=-12),r[e]=.25*Math.pow(10,t/20)};e.exports={init:o,getGain:i,setGain:u,setDecibel:a}}])});