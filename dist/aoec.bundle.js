!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Aoec=t():e.Aoec=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(4),u=new i,a=function(){function e(){r(this,e)}return o(e,[{key:"setType",value:function(e){this.__type=e}},{key:"setInv",value:function(e){this.__isInv=e}},{key:"setVol",value:function(e,t){this.__volL=e,this.__volR=t}},{key:"setFreq",value:function(e){e>22050&&(e=22050),this.__freq=e,this.__period=44100/e}},{key:"calcPhaseValue",value:function(e){return 0}},{key:"getPhaseAngle",value:function(e){return e%this.__period/this.__period}},{key:"getPhaseValue",value:function(e){if(0===this.__freq||0===this.__volL&&0===this.__volR)return[0,0];var t=this.calcPhaseValue(e),n=u.mix(t,this.__volL),r=u.mix(t,this.__volR);return[this.__isInv?15-n:n,this.__isInv?15-r:r]}}]),e}();e.exports=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=null,u=1024,a=32,s=new Array(u),c=function(){function e(t){r(this,e),this.__value=new Int8Array(a),this.write(t),this.unlock()}return o(e,[{key:"write",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.__isLock){var t=new Error;throw t.name="WaveformLocked",t.message="This waveform is locked",t}this.__value=this.__value.map(function(t,n){var r=parseInt(e[n],16);return Number.isInteger(r)&&r>=0&&r<=16?r:0})}},{key:"read",value:function(){return this.__value}},{key:"lock",value:function(){this.__isLock=!0}},{key:"unlock",value:function(){this.__isLock=!1}}]),e}(),f=function(){function e(){r(this,e),null===i&&(i=this);for(var t=0;t<u;t++)s[t]=new c;return i}return o(e,[{key:"write",value:function(e,t){try{s[e].write(t)}catch(t){"WaveformLocked"===t.name&&(t.message="Waveform ID "+e+" is locked. waveform change failed.")}}},{key:"read",value:function(e){return s[e].read()}},{key:"lock",value:function(e){s[e].lock()}},{key:"unlock",value:function(e){s[e].unlock()}}]),e}();e.exports=f},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(3),u=n(5),a=n(7),s=n(1),c=new s,f=function(){function e(t,n,o){var s=this;r(this,e),this.audioContext=t,this.master=t.createGain(),this.setMasterVolume(.5),this.master.connect(t.destination),this.processor=t.createScriptProcessor(n,2,2),this.generator=[],o.split("").forEach(function(e){switch(e){case"B":s.generator.push(new i);break;case"C":s.generator.push(new a);break;case"N":s.generator.push(new u)}})}return o(e,[{key:"writeWaveMemory",value:function(e,t){c.write(e,t)}},{key:"readWaveMemory",value:function(e){c.read(e)}},{key:"lockWaveMemory",value:function(e){c.lock(e)}},{key:"unlockWaveMemory",value:function(e){c.unlock(e)}},{key:"sendGenerator",value:function(e,t,n,r,o,i){var u=Number.isInteger(e)&&e>=0,a=Number.isInteger(t)&&t>=0,s=Number.isInteger(n)&&n>=0,c="boolean"==typeof r,f=Number.isInteger(o)&&o>=0&&o<=15,l=Number.isInteger(i)&&i>=0&&i<=15,h=f&&l;u&&(a&&this.generator[e].setFreq(t),s&&this.generator[e].setType(n),c&&this.generator[e].setInv(r),h&&this.generator[e].setVol(o,i))}},{key:"setMasterVolume",value:function(e){this.master.gain.setValueAtTime(e,this.audioContext.currentTime)}},{key:"connect",value:function(){var e=0,t=this,n=this.processor.bufferSize;this.processor.connect(this.master),this.processor.onaudioprocess=function(r){for(var o=[r.outputBuffer.getChannelData(0),r.outputBuffer.getChannelData(1)],i=0;i<n;i++){var u=0,a=0;t.generator.forEach(function(t){u+=t.getPhaseValue(e)[0],a+=t.getPhaseValue(e)[1]}),u/=16,u-=.5,a/=16,a-=.5,o[0][i]=u,o[1][i]=a,e++,e>=44100&&(e%=44100)}}}},{key:"disconnect",value:function(){this.processor.disconnect(),this.processor.onaudioprocess=function(e){}}}]),e}();e.exports=f},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.setType(0),e.setVol(0,0),e.setFreq(440),e.setInv(0),e}return i(t,e),u(t,[{key:"calcPhaseValue",value:function(e){var t=void 0,n=this.getPhaseAngle(e);switch(this.__type){case 1:case 2:case 3:case 4:t=n>this.__type/8?0:15;break;case 5:t=n<.5?32*n:32*-n+32;break;case 6:t=16*n;break;default:return 0}return t=Math.floor(t)}}]),t}(a);e.exports=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=null,u=16,a=new Array(u),s=function(){function e(){r(this,e),null===i&&(i=this);for(var t=0;t<u;t++){a[t]=new Uint8Array(u);for(var n=0;n<u;n++)if(0===t||0===n)a[t][n]=0;else if(t>=u)a[t][n]=a[15][n];else if(n>=u)a[t][n]=a[t][15];else{var o=Math.floor(t*n/15);a[t][n]=o>1?o:1}}return i}return o(e,[{key:"mix",value:function(e,t){return a[e][t]}}]),e}();e.exports=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=n(0),c=n(6),f=function(e,t){if(e=Math.abs(e),(t=Math.abs(t))>e){var n=e;e=t,t=n}for(;;){if(0===t)return e;if(0===(e%=t))return t;t%=e}},l=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.lfsr=new c,e.setType(0),e.setVol(0,0),e.setFreq(44100),e.setInv(0),e}return i(t,e),u(t,[{key:"setFreq",value:function(e){var t=f(e,44100);this.freq=e,this.divisedFreq=e/t,this.divisedRate=44100/t,this.quotient=Math.floor(this.divisedFreq/this.divisedRate),this.remainder=this.divisedFreq%this.divisedRate}},{key:"clock",value:function(e){for(var t=this.remainder*e%this.divisedRate<this.remainder,n=t?this.quotient+1:this.quotient,r=0;r<n;r++)this.lfsr.clock()}},{key:"setType",value:function(e){a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"setType",this).call(this,e),1===e?this.lfsr.setMode(!0):this.lfsr.setMode(!1)}},{key:"calcPhaseValue",value:function(e){var t=this.lfsr.getHex();return this.clock(e),t}}]),t}(s);e.exports=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),this.__mode=0,this.__tapB=1,this.__register=1}return o(e,[{key:"setMode",value:function(e){this.__mode=e,this.__tapB=e?6:1}},{key:"clock",value:function(){var e=1&this.__register,t=this.__register>>this.__tapB&1,n=(e^t)<<14;this.__register>>=1,this.__register|=n}},{key:"getHex",value:function(){return this.__register>>11}}]),e}();e.exports=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),s=n(1),c=new s,f=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.setType(0),e.setVol(0,0),e.setFreq(440),e.setInv(0),e}return i(t,e),u(t,[{key:"setType",value:function(e){e<1024&&(this.__type=e)}},{key:"calcPhaseValue",value:function(e){var t=Math.floor(32*this.getPhaseAngle(e));return c.read(this.__type)[t]}}]),t}(a);e.exports=f}])});