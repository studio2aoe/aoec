!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.aoec=e():t.aoec=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var r=n(1),i=n(24),o=n(34),u=n(16).Memory,s=n(7).Memory,c=n(26).Memory,a=n(30),f=n(22),l=n(23);t.exports={Processor:{init:r.init,connect:r.connect,disconnect:r.disconnect,play:r.play,stop:r.stop},Instrument:{init:i.init,getInst:i.getInst,getType:i.getType},Memory:{Waveform:{init:u.init,read:u.read,write:u.write},Oscillator:{init:s.init,read:s.read,write:s.write},Automation:{init:c.init,read:c.read,write:c.write},Instrument:{init:o.init,read:o.read,write:o.write},Tuning:{init:a.init,write:a.write}},Mixer:{reset:f.reset,getGain:f.getGain,setGain:f.setGain,setDecibel:f.setDecibel,getDecibel:f.getDecibel},Scheduler:{setTempo:l.setTempo,getTempo:l.getTempo,getPeriod:l.getPeriod,setFunc:l.setFunc}}},function(t,e,n){"use strict";var r=n(2),i=n(23),o=void 0;t.exports={init:function(t,e){o=t.createScriptProcessor(e,2,2)},connect:function(t){o.connect(t)},disconnect:function(){o.disconnect()},play:function(){var t=0,e=o.bufferSize;o.onaudioprocess=function(n){for(var o=[n.outputBuffer.getChannelData(0),n.outputBuffer.getChannelData(1)],u=0;u<e;u++){var s=r.voltage(t);o[0][u]=s[0],o[1][u]=s[1],i.execute(t),t++}}},stop:function(){var t=o.bufferSize;o.onaudioprocess=function(e){for(var n=[e.outputBuffer.getChannelData(0),e.outputBuffer.getChannelData(1)],r=0;r<t;r++)n[0][r]=0,n[1][r]=0}}}},function(t,e,n){"use strict";var r=n(3),i=n(13),o=n(15),u=n(21),s=n(22),c=n(6),a=[],f="";t.exports={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"OOWN";a=t.split("").map(function(t){return function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:""){case"O":return new r;case"W":return new o;case"N":return new i}}(t)}),f=a.map(function(t){return t.generatorType}).join(""),s.init(a.length)},getString:function(){return f},getGenerator:function(t){return a[c.checkArrayID(t,a)]},getType:function(t){return f[c.checkArrayID(t,f)]},voltage:function(t){var e=0,n=0;return a.map(function(r,i){var o=r.getHexSignal(t),c=s.getGain(i),a=r.getVol();e+=(u(o,a[0])-7.5)/7.5*c,n+=(u(o,a[1])-7.5)/7.5*c,r.processorClock(t)}),[e,n]}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(4),o=n(7),u=n(6),s=o.Memory,c=o.Sequencer,a=o.MEM_SIZE,f=function(t){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var t=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.generatorType="O",t.sequencer=new c(s.read(0)),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i),r(e,[{key:"setWaveform",value:function(t){this.waveNum=function(t){return u.checkRangedInt(t,0,a-1)}(t),this.sequencer=new c(s.read(t))}}]),e}();t.exports=f},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o=n(6).checkHex,u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.freq=0,this.waveNum=0,this.isInv=0,this.volL=0,this.volR=0,this.isMute=!1}return r(t,[{key:"setFreq",value:function(t){Number.isFinite(t)&&t>=0&&(t>22050&&(t=22050),this.freq=t,this.setPeriod(32*t))}},{key:"setPeriod",value:function(t){var e=t/44100,n=Math.floor(e),r=e-n;this.repeat=n,this.period=Math.pow(r,-1)}},{key:"processorClock",value:function(t){for(var e=t%this.period<1?this.repeat+1:this.repeat,n=0;n<e;n++)this.sequencer.next()}},{key:"setInv",value:function(t){this.isInv=i.boolean(t)}},{key:"setVolL",value:function(t){this.volL=o(t)}},{key:"setVolR",value:function(t){this.volR=o(t)}},{key:"setMute",value:function(t){this.isMute=i.boolean(t)}},{key:"getVol",value:function(){return!0===this.isMute||0===this.freq?[0,0]:[this.volL,this.volR]}},{key:"getHexSignal",value:function(){var t=this.sequencer.read();return this.isInv?15-t:t}}]),t}();t.exports=u},function(t,e,n){var r;!function(i){"use strict";var o,u,s,c,a,f,l,h,p,y,v,_,b;function g(t){return void 0!==t&&null!==t}function d(t){return"number"==typeof t&&t>y&&t<v}function m(t){return"number"==typeof t&&t%1==0}function w(t,e){return d(t)&&t>e}function k(t,e){return d(t)&&t<e}function q(t,e){return d(t)&&t>=e}function E(t,e){return d(t)&&t<=e}function x(t){return"string"==typeof t}function S(t){return x(t)&&""!==t}function O(t){return"[object Object]"===Object.prototype.toString.call(t)}function A(t,e){try{return t instanceof e}catch(t){return!1}}function I(t,e){var n;for(n in e)if(e.hasOwnProperty(n)){if(!1===t.hasOwnProperty(n)||typeof t[n]!=typeof e[n])return!1;if(O(t[n])&&!1===I(t[n],e[n]))return!1}return!0}function j(t){return _(t)}function M(t){return g(t)&&q(t.length,0)}function T(t){return"function"==typeof t}function W(t,e){var n;for(n=0;n<t.length;n+=1)if(t[n]===e)return e;return!e}function D(t,e){var n,r;for(n in t)if(t.hasOwnProperty(n)){if(O(r=t[n])&&D(r,e)===e)return e;if(r===e)return e}return!e}function P(t,e){return Object.keys(e).forEach(function(n){t[n]=e[n]}),t}function R(t,e){return function(){return function(t,e,n){var r=t.l||t.length,i=e[r],o=e[r+1];return C(t.apply(null,e),S(i)?i:n,T(o)?o:TypeError),e[0]}(t,arguments,e)}}function C(t,e,n){if(t)return t;throw new(n||Error)(e||"Assertion failed")}function L(t){var e=function(){return V(t.apply(null,arguments))};return e.l=t.length,e}function V(t){return!t}function N(t,e,n){var r=function(){var r,i;if(r=arguments[0],"maybe"===t&&f.assigned(r))return!0;if(!e(r))return!1;r=function(t,e){switch(t){case M:return p.call(e);case O:return Object.keys(e).map(function(t){return e[t]});default:return e}}(e,r),i=p.call(arguments,1);try{r.forEach(function(e){if(("maybe"!==t||g(e))&&!n.apply(null,[e].concat(i)))throw 0})}catch(t){return!1}return!0};return r.l=n.length,r}function B(t,e){return Z([t,s,e])}function Z(t){var e,n,r,i;return e=t.shift(),n=t.pop(),r=t.pop(),i=n||{},Object.keys(r).forEach(function(n){Object.defineProperty(i,n,{configurable:!1,enumerable:!0,writable:!1,value:e.apply(null,t.concat(r[n],u[n]))})}),i}function F(t,e){return Z([t,e,null])}function G(t,e){h.forEach(function(n){t[n].of=F(e,s[n].of)})}o={v:"value",n:"number",s:"string",b:"boolean",o:"object",t:"type",a:"array",al:"array-like",i:"iterable",d:"date",f:"function",l:"length"},u={},s={},[{n:"equal",f:function(t,e){return t===e},s:"v"},{n:"undefined",f:function(t){return void 0===t},s:"v"},{n:"null",f:function(t){return null===t},s:"v"},{n:"assigned",f:g,s:"v"},{n:"primitive",f:function(t){var e;switch(t){case null:case void 0:case!1:case!0:return!0}return"string"==(e=typeof t)||"number"===e||b&&"symbol"===e},s:"v"},{n:"includes",f:function(t,e){var n,r,i,o,u;if(!g(t))return!1;if(b&&t[Symbol.iterator]&&T(t.values)){n=t.values();do{if((r=n.next()).value===e)return!0}while(!r.done);return!1}for(i=Object.keys(t),o=i.length,u=0;u<o;++u)if(t[i[u]]===e)return!0;return!1},s:"v"},{n:"zero",f:function(t){return 0===t}},{n:"infinity",f:function(t){return t===y||t===v}},{n:"number",f:d},{n:"integer",f:m},{n:"even",f:function(t){return"number"==typeof t&&t%2==0}},{n:"odd",f:function(t){return m(t)&&t%2!=0}},{n:"greater",f:w},{n:"less",f:k},{n:"between",f:function(t,e,n){if(e<n)return w(t,e)&&t<n;return k(t,e)&&t>n}},{n:"greaterOrEqual",f:q},{n:"lessOrEqual",f:E},{n:"inRange",f:function(t,e,n){if(e<n)return q(t,e)&&t<=n;return E(t,e)&&t>=n}},{n:"positive",f:function(t){return w(t,0)}},{n:"negative",f:function(t){return k(t,0)}},{n:"string",f:x,s:"s"},{n:"emptyString",f:function(t){return""===t},s:"s"},{n:"nonEmptyString",f:S,s:"s"},{n:"contains",f:function(t,e){return x(t)&&-1!==t.indexOf(e)},s:"s"},{n:"match",f:function(t,e){return x(t)&&!!t.match(e)},s:"s"},{n:"boolean",f:function(t){return!1===t||!0===t},s:"b"},{n:"object",f:O,s:"o"},{n:"emptyObject",f:function(t){return O(t)&&0===Object.keys(t).length},s:"o"},{n:"nonEmptyObject",f:function(t){return O(t)&&Object.keys(t).length>0},s:"o"},{n:"instanceStrict",f:A,s:"t"},{n:"instance",f:function(t,e){try{return A(t,e)||t.constructor.name===e.name||Object.prototype.toString.call(t)==="[object "+e.name+"]"}catch(t){return!1}},s:"t"},{n:"like",f:I,s:"t"},{n:"array",f:j,s:"a"},{n:"emptyArray",f:function(t){return j(t)&&0===t.length},s:"a"},{n:"nonEmptyArray",f:function(t){return j(t)&&w(t.length,0)},s:"a"},{n:"arrayLike",f:M,s:"al"},{n:"iterable",f:function(t){if(!b)return M(t);return g(t)&&T(t[Symbol.iterator])},s:"i"},{n:"date",f:function(t){return A(t,Date)&&m(t.getTime())},s:"d"},{n:"function",f:T,s:"f"},{n:"hasLength",f:function(t,e){return g(t)&&t.length===e},s:"l"}].map(function(t){var e=t.n;u[e]="Invalid "+o[t.s||"n"],s[e]=t.f}),c={apply:function(t,e){if(a.array(t),T(e))return t.map(function(t){return e(t)});return a.array(e),a.hasLength(t,e.length),t.map(function(t,n){return e[n](t)})},map:function(t,e){if(a.object(t),T(e))return function(t,e){var n={};return Object.keys(t).forEach(function(r){n[r]=e(t[r])}),n}(t,e);return a.object(e),function t(e,n){var r={};return Object.keys(n).forEach(function(i){var o=n[i];T(o)?f.assigned(e)?r[i]=!!o.m:r[i]=o(e[i]):O(o)&&(r[i]=t(e[i],o))}),r}(t,e)},all:function(t){if(j(t))return W(t,!1);return a.object(t),D(t,!1)},any:function(t){if(j(t))return W(t,!0);return a.object(t),D(t,!0)}},h=["array","arrayLike","iterable","object"],p=Array.prototype.slice,y=Number.NEGATIVE_INFINITY,v=Number.POSITIVE_INFINITY,_=Array.isArray,b="function"==typeof Symbol,c=P(c,s),a=B(R,C),f=B(L,V),l=B(function(t){var e=function(){return!!f.assigned(arguments[0])||t.apply(null,arguments)};return e.l=t.length,e.m=!0,e},function(t){if(!1===g(t))return!0;return t}),a.not=F(R,f),a.maybe=F(R,l),h.forEach(function(t){s[t].of=Z([N.bind(null,null),s[t],s,null])}),G(a,R),G(f,L),h.forEach(function(t){l[t].of=Z([N.bind(null,"maybe"),s[t],s,null]),a.maybe[t].of=F(R,l[t].of),a.not[t].of=F(R,f[t].of)}),function(i){void 0===(r=function(){return i}.call(e,n,e,t))||(t.exports=r)}(P(c,{assert:a,not:f,maybe:l}))}()},function(t,e,n){"use strict";var r=n(5).assert,i=function(t,e,n){return r.inRange(r.integer(t),e,n)},o=function(t){return i(t,0,15)},u=function(t){return i(t,0,255)},s=function(t){return i(t,-128,127)},c=function(t){return new Int8Array(1).fill(u(t))[0]},a=function(t){return r.hasLength(r.string(t),2),16*o(parseInt(t[0],16))+o(parseInt(t[1],16))};t.exports={checkRangedInt:i,checkArrayID:function(t,e){return i(t,0,e.length-1)},checkHex:o,checkUByte:u,checkSByte:s,convertUByte:function(t){return new Uint8Array(1).fill(s(t))[0]},convertSByte:c,parseUByte:a,parseSByte:function(t){return c(a(t))}}},function(t,e,n){"use strict";var r=n(8),i=n(12),o=n(11).WAVE_SIZE,u=n(11).MEM_SIZE;t.exports={Memory:r,Sequencer:i,WAVE_SIZE:o,MEM_SIZE:u}},function(t,e,n){"use strict";var r=n(9),i=n(10),o=n(6),u=n(11).MEM_SIZE,s=function(t){return o.checkRangedInt(t,0,u-1)},c={};t.exports={init:function(){c=new Array(64);for(var t=0;t<32;t++)c[t]=new r({func:i.pulse(t)});for(var e=32;e<47;e++)c[e]=new r({func:i.triangle});for(var n=48;n<63;n++)c[n]=new r({func:i.sawtooth})},write:function(t,e){c[s(t)]=new r(e)},read:function(t){return s(t),void 0===c[t]&&(c[t]=new r),c[t]}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o={name:"",func:n(10).pulse(4)},u=Symbol("func"),s=Symbol("name"),c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this[u]=function(){return 0},this.name=void 0===e.name?o.name:e.name,this.func=void 0===e.func?o.func:e.func}return r(t,[{key:"name",set:function(t){this[s]=i.string(t).slice(0,32)},get:function(){return this[s]}},{key:"func",set:function(t){this[u]=i.function(t)},get:function(){return this[u]}}]),t}();t.exports=c},function(t,e,n){"use strict";t.exports={pulse:function(t){return function(e){return e>=t?0:15}},triangle:function(t){return t<16?t:31-t},sawtooth:function(t){return Math.floor(t/2)}}},function(t,e,n){"use strict";t.exports={WAVE_SIZE:32,MEM_SIZE:256}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(11).WAVE_SIZE,o=Symbol("function"),u=Symbol("current"),s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this[o]=e.func,this[u]=0}return r(t,[{key:"init",value:function(){this[u]=0}},{key:"read",value:function(){return this[o](this[u])}},{key:"next",value:function(){return this[u]<i-1?this[u]+=1:this[u]=0}}]),t}();t.exports=s},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(4),o=n(14),u=function(t){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var t=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.generatorType="N",t.sequencer=new o,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i),r(e,[{key:"setFreq",value:function(t){Number.isFinite(t)&&t>0&&(this.freq=t,this.setPeriod(t))}},{key:"setWaveform",value:function(t){1===t?(this.sequencer.setMode(!0),this.waveNum=t):0===t&&(this.sequencer.setMode(!1),this.waveNum=t)}}]),e}();t.exports=u},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.__mode=0,this.__tapB=1,this.__register=1}return r(t,[{key:"setMode",value:function(t){this.__mode=t,this.__tapB=t?6:1}},{key:"next",value:function(){var t=(1&this.__register^this.__register>>this.__tapB&1)<<14;this.__register>>=1,this.__register|=t}},{key:"read",value:function(){return this.__register>>11}}]),t}();t.exports=i},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(4),o=n(16),u=n(6),s=o.Memory,c=o.Sequencer,a=o.MEM_SIZE,f=function(t){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var t=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.generatorType="C",t.sequencer=new c(s.read(0)),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i),r(e,[{key:"setWaveform",value:function(t){this.waveNum=function(t){return u.checkRangedInt(t,0,a-1)}(t),this.sequencer=new c(s.read(t))}}]),e}();t.exports=f},function(t,e,n){"use strict";var r=n(17),i=n(20),o=n(19).WAVE_SIZE,u=n(19).MEM_SIZE;t.exports={Memory:r,Sequencer:i,WAVE_SIZE:o,MEM_SIZE:u}},function(t,e,n){"use strict";var r=n(18),i=n(6),o=n(19).MEM_SIZE,u=function(t){return i.checkRangedInt(t,0,o-1)},s={};t.exports={init:function(){s=new Array(0)},write:function(t,e){s[u(t)]=new r(e)},read:function(t){return u(t),void 0===s[t]&&(s[t]=new r),s[t]}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o=n(6).checkHex,u=n(19).WAVE_SIZE,s={name:"",list:new Array(u).fill(0)},c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=void 0===e.name?s.name:e.name,this.list=void 0===e.list?s.list:e.list}return r(t,[{key:"name",set:function(t){this.__name=i.string(t).slice(0,32)},get:function(){return this.__name}},{key:"list",set:function(t){i.equal(t.length,u),t.forEach(function(t){return o(t)}),this.__list=t},get:function(){return this.__list}}]),t}();t.exports=c},function(t,e,n){"use strict";t.exports={WAVE_SIZE:32,MEM_SIZE:4096}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(19).WAVE_SIZE,o=Symbol("list"),u=Symbol("current"),s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this[o]=e.list,this[u]=0}return r(t,[{key:"init",value:function(){this[u]=0}},{key:"read",value:function(){return this[o][this[u]]}},{key:"next",value:function(){return this[u]<i-1?this[u]+=1:this[u]=0}}]),t}();t.exports=s},function(t,e,n){"use strict";for(var r=new Array(16),i=0;i<16;i++){r[i]=new Array(16);for(var o=0;o<16;o++){var u=i*o/15,s=(15-o)/2;r[i][o]=u+s}}t.exports=function(t,e){try{return r[t][e]}catch(n){throw n.message="Invalid Input: [Signal: "+t+" / Amp: "+e+"]",n}}},function(t,e,n){"use strict";var r=[],i=20*Math.log10(4);t.exports={init:function(t){r=new Array(t).fill(.25)},reset:function(){r.fill(.25)},getGain:function(t){return r[t]},setGain:function(t,e){r[t]=e},setDecibel:function(t,e){e>i&&(e=i),r[t]=.25*Math.pow(10,e/20)},getDecibel:function(t){return 20*Math.log10(r[t]/.25)}}},function(t,e,n){"use strict";var r=n(5).assert,i=n(24),o={tempo:125,period:882,customfunc:function(t){return null},executeInst:function(t){t%o.period<1&&i.getList().forEach(function(t){t.execute(),t.next()})}};t.exports={setTempo:function(t){r.number(t),o.tempo=t,o.period=function(t){return 60/t/24*44100}(o.tempo)},getTempo:function(){return o.tempo},getPeriod:function(){return o.period},setFunc:function(t){o.customfunc=t},execute:function(t){o.customfunc(t),o.executeInst(t)}}},function(t,e,n){"use strict";var r=n(5).assert,i=n(2),o=n(25),u=n(6),s=function(t){return u.checkArrayID(t,c)},c=[],a=null;t.exports={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"OOWN";t=r.string(t).slice(0,256),i.init(t),a=i.getString(),c=Array.from(a).map(function(t,e){return new o(e)})},getList:function(){return c},getString:function(){return a},getType:function(t){return a[s(t)]},getInst:function(t){return c[s(t)]}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o=n(2),u=n(26),s=n(30),c=n(6),a=n(33),f=n(34),l=c.checkHex,h=c.checkUByte,p=c.convertSByte,y=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.__id=c.checkArrayID(e,o.getString()),this.__type=o.getType(this.__id),this.__generator=o.getGenerator(this.__id),this.__note="---",this.__inv=!1,this.__volL=0,this.__volR=0,this.__tuneType=0,this.__bank=0,this.__seqA=new u.Sequencer,this.__seqD=new u.Sequencer,this.__seqE=new u.Sequencer,this.__seqW=new u.Sequencer}return r(t,[{key:"setNote",value:function(t){switch(i.string(t),i.hasLength(t,3),t){case"   ":case"___":break;case"===":this.release();break;case"---":default:this.__note=t,this.__seqA.init(),this.__seqD.init()}}},{key:"setVol",value:function(t,e){this.setVolL(t),this.setVolR(e)}},{key:"setVolL",value:function(t){try{this.__volL=l(t)}catch(t){}this.__seqE.init(),this.__seqW.init()}},{key:"setVolR",value:function(t){try{this.__volR=l(t)}catch(t){}this.__seqE.init(),this.__seqW.init()}},{key:"setInv",value:function(t){this.__inv=i.boolean(t)}},{key:"setTuneType",value:function(t){this.__tuneType=l(t)}},{key:"setBank",value:function(t){this.__bank=l(t)}},{key:"setQuickA",value:function(t){this.__seqA=new u.Sequencer(t),this.__seqA.init(),this.__seqD.init(),this.__seqA.id=void 0}},{key:"setQuickD",value:function(t){this.__seqD=new u.Sequencer(t),this.__seqA.init(),this.__seqD.init(),this.__seqD.id=void 0}},{key:"setQuickE",value:function(t){this.__seqE=new u.Sequencer(t),this.__seqE.init(),this.__seqW.init(),this.__seqE.id=void 0}},{key:"setQuickW",value:function(t){this.__seqW=new u.Sequencer(t),this.__seqE.init(),this.__seqW.init(),this.__seqW.id=void 0}},{key:"setA",value:function(t){this.setQuickA(u.Memory.read("A",h(t))),this.__seqA.id=t}},{key:"setD",value:function(t){this.setQuickD(u.Memory.read("D",h(t))),this.__seqD.id=t}},{key:"setE",value:function(t){this.setQuickE(u.Memory.read("E",h(t))),this.__seqE.id=t}},{key:"setW",value:function(t){this.setQuickW(u.Memory.read("W",h(t))),this.__seqW.id=t}},{key:"setInst",value:function(t){this.__inst=h(t);var e=f.read(t);e.inv&&this.setInv(e.inv),e.tuneType&&this.setTuneType(e.tuneType),e.bank&&this.setBank(e.bank),e.seqA&&this.setA(e.seqA),e.seqD&&this.setD(e.seqD),e.seqE&&this.setE(e.seqE),e.seqW&&this.setW(e.seqW),this.__seqA.init(),this.__seqD.init(),this.__seqE.init(),this.__seqW.init()}},{key:"__readPitch",value:function(){var t=this.__note;if("---"===t)return 0;i.string(t),i.hasLength(t,3);var e=p(this.__seqA.read()),n=p(this.__seqD.read()),r=this.__tuneType;return s.getFreq(r,t,e,n)}},{key:"__readEnvelope",value:function(){if("---"===this.note)return 0;var t=this.__seqE.read(),e=Math.floor(t/16),n=t%16,r=this.__volL,i=this.__volR;return{L:a(r,e),R:a(i,n)}}},{key:"__readWaveNumber",value:function(){var t=this.__bank,e=this.__seqW.read();return"C"===this.__type?256*t+e:e}},{key:"execute",value:function(){this.__generator.setFreq(this.__readPitch()),this.__generator.setWaveform(this.__readWaveNumber()),this.__generator.setInv(this.__inv),this.__generator.setVolL(this.__readEnvelope().L),this.__generator.setVolR(this.__readEnvelope().R)}},{key:"release",value:function(){this.__seqA.release(),this.__seqD.release(),this.__seqE.release(),this.__seqW.release()}},{key:"next",value:function(){this.__seqA.next(),this.__seqD.next(),this.__seqE.next(),this.__seqW.next()}}]),t}();t.exports=y},function(t,e,n){"use strict";var r=n(27),i=n(29);t.exports={Memory:r,Sequencer:i}},function(t,e,n){"use strict";var r=n(5).assert,i=n(28),o=n(6),u=function(t){return o.checkRangedInt(t,0,255)},s=function(t){return r.match(r.hasLength(t,1),"[ADEW]")},c={};t.exports={init:function(){c.A=new Array(0),c.D=new Array(0),c.E=new Array(0),c.W=new Array(0)},read:function(t,e){return s(t),u(e),void 0===c[t][e]&&(c[t][e]=new i),c[t][e]},write:function(t,e,n){var o=new i(n);s(t),u(e),r.like(o,new i),c[t][e]=o}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o=n(6),u={name:"",list:[0],loopstart:-1,loopend:-1},s=o.checkUByte,c=o.checkArrayID,a=Symbol("name"),f=Symbol("list"),l=Symbol("loopstart"),h=Symbol("loopend"),p=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=void 0===e.name?u.name:e.name,this.list=void 0===e.list?u.list:e.list,this.loopstart=void 0===e.loopstart?u.loopstart:e.loopstart,this.loopend=void 0===e.loopend?u.loopend:e.loopend}return r(t,[{key:"name",set:function(t){this[a]=i.string(t).slice(0,32)},get:function(){return this[a]}},{key:"list",set:function(t){this[f]=t.map(function(t){return s(t)})},get:function(){return this[f]}},{key:"loopstart",set:function(t){try{this[l]=c(t,this[f])}catch(e){if(-1!==t)throw e;this[l]=t}},get:function(){return this[l]}},{key:"loopend",set:function(t){try{this[h]=c(t,this[f])}catch(e){if(-1!==t)throw e;this[h]=t}},get:function(){return this[h]}}]),t}();t.exports=p},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=Symbol("list"),o=Symbol("loopstart"),u=Symbol("loopend"),s=Symbol("current"),c=Symbol("released"),a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{name:"",list:[0],loopstart:-1,loopend:-1};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this[i]=e.list,this[o]=e.loopstart,this[u]=e.loopend,this[s]=0,this[c]=!1}return r(t,[{key:"init",value:function(){this[s]=0,this[c]=!1}},{key:"read",value:function(){return this[i][this[s]]}},{key:"next",value:function(){var t=this[o]>=0,e=this[u]>=0&&this[u]>=this[o],n=!this[c],r=e&&n?this[u]:this[i].length-1,a=t&&n?this[o]:r;return this[s]<r?this[s]+=1:this[s]=a}},{key:"release",value:function(){this[c]=!0}}]),t}();t.exports=a},function(t,e,n){"use strict";var r=n(31),i=n(32),o=new Array(16),u=function(){o.fill(void 0),o[0]=r,o[1]=i};u();t.exports={getFreq:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return o[t](e,n,r)},init:u,write:function(t,e){o[t]=e}}},function(t,e,n){"use strict";var r=Object.freeze({C:0,D:200,E:400,F:500,G:700,A:900,B:1100,c:0,d:200,e:400,f:500,g:700,a:900,b:1100}),i=Object.freeze({"#":100,"+":100,b:-100,"-":-100," ":0});t.exports=function(t){var e=(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return r[t[0]]+i[t[1]]+1200*(parseInt(t[2])+1)+100*e+n}(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,arguments.length>2&&void 0!==arguments[2]?arguments[2]:0)-6900)/1200;return 440*Math.pow(2,e)}},function(t,e,n){"use strict";var r=n(5).assert,i=function(t){var e=r.integer(t),n=r.inRange(t,0,15);return e&&n};t.exports=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=parseInt(t[0],16),r=parseInt(t[1],16);i(n),i(r);var o=15-n,u=7-r%8;0===u&&(u=.5);var s=1/u*524288*Math.pow(2,-(o+1))*Math.pow(2,e/1200);return s>1048576?1048576:s}},function(t,e,n){"use strict";for(var r=new Array(16),i=0;i<16;i++){r[i]=new Uint8Array(16);for(var o=0;o<16;o++)if(0===i||0===o)r[i][o]=0;else{var u=Math.floor(i*o/15);r[i][o]=u>1?u:1}}t.exports=function(t,e){try{return r[t][e]}catch(n){throw n.message="Invalid Input: ["+t+", "+e+"]",n}}},function(t,e,n){"use strict";var r=n(35),i=n(6),o=function(t){return i.checkRangedInt(t,0,255)},u=[];t.exports={init:function(){u=new Array(0)},write:function(t,e){u[o(t)]=new r(e)},read:function(t){return o(t),void 0===u[t]&&(u[t]=new r),u[t]}}},function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=n(5).assert,o=n(6),u=o.checkHex,s=o.checkUByte,c=function(t,e){try{return e(t)}catch(t){return}},a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=void 0===e.name?"":e.name,this.inv=e.inv,this.tuneType=e.tuneType,this.bank=e.bank,this.seqA=e.seqA,this.seqD=e.seqD,this.seqE=e.seqE,this.seqW=e.seqW}return r(t,[{key:"name",set:function(t){this.__name=i.string(t).slice(0,32)},get:function(){return this.__name}},{key:"inv",set:function(t){this.__inv=c(t,i.boolean)},get:function(){return this.__inv}},{key:"tuneType",set:function(t){this.__tuneType=c(t,u)},get:function(){return this.__tuneType}},{key:"bank",set:function(t){this.__bank=c(t,u)},get:function(){return this.__bank}},{key:"seqA",set:function(t){this.__seqA=c(t,s)},get:function(){return this.__seqA}},{key:"seqD",set:function(t){this.__seqD=c(t,s)},get:function(){return this.__seqD}},{key:"seqE",set:function(t){this.__seqE=c(t,s)},get:function(){return this.__seqE}},{key:"seqW",set:function(t){this.__seqW=c(t,s)},get:function(){return this.__seqW}}]),t}();t.exports=a}])});