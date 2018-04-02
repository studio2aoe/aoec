!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.aoec=t():n.aoec=t()}("undefined"!=typeof self?self:this,function(){return function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};return t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=10)}([function(n,t,e){"use strict";var r=e(2).assert,o=function(n,t,e){return r.inRange(r.integer(n),t,e)},i=function(n,t){return o(n,0,t.length-1)},u=function(n){return o(n,0,15)},c=function(n){return o(n,0,255)},f=function(n){return o(n,-128,127)},a=function(n){return new Uint8Array(1).fill(f(n))[0]},s=function(n){return new Int8Array(1).fill(c(n))[0]},l=function(n){return r.hasLength(r.string(n),2),16*u(parseInt(n[0],16))+u(parseInt(n[1],16))},p=function(n){return s(l(n))};n.exports={checkRangedInt:o,checkArrayID:i,checkHex:u,checkUByte:c,checkSByte:f,convertUByte:a,convertSByte:s,parseUByte:l,parseSByte:p}},function(n,t,e){"use strict";n.exports={WAVE_SIZE:32,MEM_SIZE:4096}},function(n,t,e){var r;!function(o){"use strict";function i(n,t){return n===t}function u(n){return void 0===n}function c(n){return null===n}function f(n){return void 0!==n&&null!==n}function a(n){var t;switch(n){case null:case void 0:case!1:case!0:return!0}return"string"===(t=typeof n)||"number"===t||xn&&"symbol"===t}function s(n){return 0===n}function l(n){return n===Sn||n===jn}function p(n){return"number"==typeof n&&n>Sn&&n<jn}function h(n){return"number"==typeof n&&n%1==0}function y(n){return"number"==typeof n&&n%2==0}function v(n){return h(n)&&n%2!=0}function b(n,t){return p(n)&&n>t}function g(n,t){return p(n)&&n<t}function d(n,t,e){return t<e?b(n,t)&&n<e:g(n,t)&&n>e}function m(n,t){return p(n)&&n>=t}function w(n,t){return p(n)&&n<=t}function E(n,t,e){return t<e?m(n,t)&&n<=e:w(n,t)&&n>=e}function _(n){return b(n,0)}function k(n){return g(n,0)}function O(n){return"string"==typeof n}function S(n){return""===n}function j(n){return O(n)&&""!==n}function I(n,t){return O(n)&&-1!==n.indexOf(t)}function x(n,t){return O(n)&&!!n.match(t)}function M(n){return!1===n||!0===n}function P(n){return"[object Object]"===Object.prototype.toString.call(n)}function V(n){return P(n)&&0===Object.keys(n).length}function q(n){return P(n)&&Object.keys(n).length>0}function A(n,t){try{return n instanceof t}catch(n){return!1}}function N(n,t){try{return A(n,t)||n.constructor.name===t.name||Object.prototype.toString.call(n)==="[object "+t.name+"]"}catch(n){return!1}}function L(n,t){var e;for(e in t)if(t.hasOwnProperty(e)){if(!1===n.hasOwnProperty(e)||typeof n[e]!=typeof t[e])return!1;if(P(n[e])&&!1===L(n[e],t[e]))return!1}return!0}function R(n){return In(n)}function T(n){return R(n)&&0===n.length}function Z(n){return R(n)&&b(n.length,0)}function C(n){return f(n)&&m(n.length,0)}function F(n){return xn?f(n)&&G(n[Symbol.iterator]):C(n)}function B(n,t){var e,r,o,i,u;if(!f(n))return!1;if(xn&&n[Symbol.iterator]&&G(n.values)){e=n.values();do{if(r=e.next(),r.value===t)return!0}while(!r.done);return!1}for(o=Object.keys(n),i=o.length,u=0;u<i;++u)if(n[o[u]]===t)return!0;return!1}function W(n,t){return f(n)&&n.length===t}function D(n){return A(n,Date)&&h(n.getTime())}function G(n){return"function"==typeof n}function H(n,t){return wn.array(n),G(t)?n.map(function(n){return t(n)}):(wn.array(t),wn.hasLength(n,t.length),n.map(function(n,e){return t[e](n)}))}function U(n,t){return wn.object(n),G(t)?z(n,t):(wn.object(t),Y(n,t))}function z(n,t){var e={};return Object.keys(n).forEach(function(r){e[r]=t(n[r])}),e}function Y(n,t){var e={};return Object.keys(t).forEach(function(r){var o=t[r];G(o)?En.assigned(n)?e[r]=!!o.m:e[r]=o(n[r]):P(o)&&(e[r]=Y(n[r],o))}),e}function J(n){return R(n)?K(n,!1):(wn.object(n),Q(n,!1))}function K(n,t){var e;for(e=0;e<n.length;e+=1)if(n[e]===t)return t;return!t}function Q(n,t){var e,r;for(e in n)if(n.hasOwnProperty(e)){if(r=n[e],P(r)&&Q(r,t)===t)return t;if(r===t)return t}return!t}function X(n){return R(n)?K(n,!0):(wn.object(n),Q(n,!0))}function $(n,t){return Object.keys(t).forEach(function(e){n[e]=t[e]}),n}function nn(n,t){return function(){return tn(n,arguments,t)}}function tn(n,t,e){var r=n.l||n.length,o=t[r],i=t[r+1];return en(n.apply(null,t),j(o)?o:e,G(i)?i:TypeError),t[0]}function en(n,t,e){if(n)return n;throw new(e||Error)(t||"Assertion failed")}function rn(n){var t=function(){return on(n.apply(null,arguments))};return t.l=n.length,t}function on(n){return!n}function un(n){var t=function(){return!!En.assigned(arguments[0])||n.apply(null,arguments)};return t.l=n.length,t.m=!0,t}function cn(n){return!1===f(n)||n}function fn(n,t,e){var r=function(){var r,o;if(r=arguments[0],"maybe"===n&&En.assigned(r))return!0;if(!t(r))return!1;r=an(t,r),o=On.call(arguments,1);try{r.forEach(function(t){if(("maybe"!==n||f(t))&&!e.apply(null,[t].concat(o)))throw 0})}catch(n){return!1}return!0};return r.l=e.length,r}function an(n,t){switch(n){case C:return On.call(t);case P:return Object.keys(t).map(function(n){return t[n]});default:return t}}function sn(n,t){return ln([n,dn,t])}function ln(n){var t,e,r,o;return t=n.shift(),e=n.pop(),r=n.pop(),o=e||{},Object.keys(r).forEach(function(e){Object.defineProperty(o,e,{configurable:!1,enumerable:!0,writable:!1,value:t.apply(null,n.concat(r[e],gn[e]))})}),o}function pn(n,t){return ln([n,t,null])}function hn(n){dn[n].of=ln([fn.bind(null,null),dn[n],dn,null])}function yn(n,t){kn.forEach(function(e){n[e].of=pn(t,dn[e].of)})}function vn(n){_n[n].of=ln([fn.bind(null,"maybe"),dn[n],dn,null]),wn.maybe[n].of=pn(nn,_n[n].of),wn.not[n].of=pn(nn,En[n].of)}var bn,gn,dn,mn,wn,En,_n,kn,On,Sn,jn,In,xn;bn={v:"value",n:"number",s:"string",b:"boolean",o:"object",t:"type",a:"array",al:"array-like",i:"iterable",d:"date",f:"function",l:"length"},gn={},dn={},[{n:"equal",f:i,s:"v"},{n:"undefined",f:u,s:"v"},{n:"null",f:c,s:"v"},{n:"assigned",f:f,s:"v"},{n:"primitive",f:a,s:"v"},{n:"includes",f:B,s:"v"},{n:"zero",f:s},{n:"infinity",f:l},{n:"number",f:p},{n:"integer",f:h},{n:"even",f:y},{n:"odd",f:v},{n:"greater",f:b},{n:"less",f:g},{n:"between",f:d},{n:"greaterOrEqual",f:m},{n:"lessOrEqual",f:w},{n:"inRange",f:E},{n:"positive",f:_},{n:"negative",f:k},{n:"string",f:O,s:"s"},{n:"emptyString",f:S,s:"s"},{n:"nonEmptyString",f:j,s:"s"},{n:"contains",f:I,s:"s"},{n:"match",f:x,s:"s"},{n:"boolean",f:M,s:"b"},{n:"object",f:P,s:"o"},{n:"emptyObject",f:V,s:"o"},{n:"nonEmptyObject",f:q,s:"o"},{n:"instanceStrict",f:A,s:"t"},{n:"instance",f:N,s:"t"},{n:"like",f:L,s:"t"},{n:"array",f:R,s:"a"},{n:"emptyArray",f:T,s:"a"},{n:"nonEmptyArray",f:Z,s:"a"},{n:"arrayLike",f:C,s:"al"},{n:"iterable",f:F,s:"i"},{n:"date",f:D,s:"d"},{n:"function",f:G,s:"f"},{n:"hasLength",f:W,s:"l"}].map(function(n){var t=n.n;gn[t]="Invalid "+bn[n.s||"n"],dn[t]=n.f}),mn={apply:H,map:U,all:J,any:X},kn=["array","arrayLike","iterable","object"],On=Array.prototype.slice,Sn=Number.NEGATIVE_INFINITY,jn=Number.POSITIVE_INFINITY,In=Array.isArray,xn="function"==typeof Symbol,mn=$(mn,dn),wn=sn(nn,en),En=sn(rn,on),_n=sn(un,cn),wn.not=pn(nn,En),wn.maybe=pn(nn,_n),kn.forEach(hn),yn(wn,nn),yn(En,rn),kn.forEach(vn),function(o){void 0!==(r=function(){return o}.call(t,e,t,n))&&(n.exports=r)}($(mn,{assert:wn,not:En,maybe:_n}))}()},function(n,t,e){"use strict";n.exports={WAVE_SIZE:32,MEM_SIZE:256}},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=e(2).assert,u=e(0),c=e(13),f=u.checkHex,a=function(){function n(){r(this,n),this.freq=0,this.waveNum=0,this.isInv=0,this.volL=0,this.volR=0,this.isMute=!1}return o(n,[{key:"setFreq",value:function(n){Number.isFinite(n)&&n>=0&&(n>22050&&(n=22050),this.freq=n,this.setPeriod(32*n))}},{key:"setPeriod",value:function(n){var t=n/44100,e=Math.floor(t),r=t-e;this.repeat=e,this.period=Math.pow(r,-1)}},{key:"processorClock",value:function(n){for(var t=n%this.period<1,e=t?this.repeat+1:this.repeat,r=0;r<e;r++)this.sequencer.next()}},{key:"setInv",value:function(n){this.isInv=i.boolean(n)}},{key:"setVolL",value:function(n){this.volL=f(n)}},{key:"setVolR",value:function(n){this.volR=f(n)}},{key:"setMute",value:function(n){this.isMute=i.boolean(n)}},{key:"getHexSignal",value:function(){if(!0===this.isMute||0===this.freq)return[7.5,7.5];var n=this.sequencer.read(),t=0===this.volL?7.5:c(n,this.volL),e=0===this.volL?7.5:c(n,this.volR);return[this.isInv?15-t:t,this.isInv?15-e:e]}}]),n}();n.exports=a},function(n,t,e){"use strict";var r=e(12),o=e(18),i=e(20),u=e(8),c=[],f="",a=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"OOCN";c=n.split("").map(function(n){return s(n)}),f=c.map(function(n){return n.generatorType}).join(""),u.init(c.length)},s=function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:""){case"O":return new r;case"C":return new i;case"N":return new o}},l=function(n,t,e,r,o,i){p(n,t),h(n,e),y(n,r),v(n,o),b(n,i)},p=function(n,t){c[n].setFreq(t)},h=function(n,t){c[n].setWaveform(t)},y=function(n,t){c[n].setInv(t)},v=function(n,t){c[n].setVolL(t)},b=function(n,t){c[n].setVolR(t)},g=function(n,t){c[n].setMute(t)},d=function(n){return c[n].freq},m=function(n){return c[n].waveNum},w=function(n){return c[n].isInv},E=function(n){return c[n].volL},_=function(n){return c[n].volR},k=function(n){return c[n].isMute},O=function(){return f},S=function(n){var t=0,e=0;return c.map(function(r,o){var i=u.getGain(o),c=r.getHexSignal(n);r.processorClock(n),t+=(c[0]-7.5)/7.5*i,e+=(c[1]-7.5)/7.5*i}),[t,e]};n.exports={init:a,send:l,sendFreq:p,sendNum:h,sendInv:y,sendVolL:v,sendVolR:b,sendMute:g,getFreq:d,getNum:m,getInv:w,getVolL:E,getVolR:_,getMute:k,getString:O,getVoltage:S}},function(n,t,e){"use strict";var r=function(n){return function(t){return t>=n?0:15}},o=function(n){return n<16?n:31-n},i=function(n){return Math.floor(n/2)};n.exports={pulse:r,triangle:o,sawtooth:i}},function(n,t,e){"use strict";var r=e(21),o=e(23),i=e(1).WAVE_SIZE,u=e(1).MEM_SIZE;n.exports={Memory:r,Sequencer:o,WAVE_SIZE:i,MEM_SIZE:u}},function(n,t,e){"use strict";var r=[],o=function(n){r=new Array(n).fill(.25)},i=function(){r.fill(.25)},u=function(n){return r[n]},c=function(n,t){r[n]=t},f=function(n,t){t>12&&(t=12),t<-12&&(t=-12),r[n]=.25*Math.pow(10,t/20)};n.exports={init:o,reset:i,getGain:u,setGain:c,setDecibel:f}},function(n,t,e){"use strict";var r=function(){},o=function(n){r=n},i=function(n){return r(n)};n.exports={setFunc:o,execute:i}},function(n,t,e){"use strict";var r=e(11),o=e(5),i=e(7),u=e(8),c=e(9);n.exports={Processor:{init:r.init,connect:r.connect,disconnect:r.disconnect,play:r.play,stop:r.stop},GeneratorSet:{init:o.init,send:o.send,sendFreq:o.sendFreq,sendNum:o.sendNum,sendInv:o.sendInv,sendVolL:o.sendVolL,sendVolR:o.sendVolR,sendMute:o.sendMute,getFreq:o.getFreq,getNum:o.getNum,getInv:o.getInv,getVolL:o.getVolL,getVolR:o.getVolR,getMute:o.getMute,getString:o.getString},WaveformMemory:{write:i.write,read:i.read,setLock:i.setLock,isLock:i.isLock},Mixer:{reset:u.reset,getGain:u.getGain,setGain:u.setGain,setDecibel:u.setDecibel},Scheduler:{setFunc:c.setFunc}}},function(n,t,e){"use strict";var r=e(5),o=e(9),i=void 0,u=function(n,t){i=n.createScriptProcessor(t,2,2)},c=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;i.connect(n)},f=function(){i.disconnect()},a=function(){var n=0,t=i.bufferSize;i.onaudioprocess=function(e){for(var i=[e.outputBuffer.getChannelData(0),e.outputBuffer.getChannelData(1)],u=0;u<t;u++){var c=r.getVoltage(n);i[0][u]=c[0],i[1][u]=c[1],o.execute(n),n++}}},s=function(){var n=i.bufferSize;i.onaudioprocess=function(t){for(var e=[t.outputBuffer.getChannelData(0),t.outputBuffer.getChannelData(1)],r=0;r<n;r++)e[0][r]=0,e[1][r]=0}};n.exports={init:u,connect:c,disconnect:f,play:a,stop:s}},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function o(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?n:t}function i(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var u=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),c=e(4),f=e(14),a=e(0),s=f.Memory,l=f.Sequencer,p=f.MEM_SIZE,h=function(n){return a.checkRangedInt(n,0,p-1)},y=function(n){function t(){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.generatorType="B",n.sequencer=new l(s.read(0)),n}return i(t,n),u(t,[{key:"setWaveform",value:function(n){this.waveNum=h(n),this.sequencer=new l(s.read(n))}}]),t}(c);n.exports=y},function(n,t,e){"use strict";for(var r=new Array(16),o=0;o<16;o++){r[o]=new Uint8Array(16);for(var i=0;i<16;i++)if(0===o||0===i)r[o][i]=0;else{var u=Math.floor(o*i/15);u=u>1?u:1,u+=Math.floor((16-i)/2),r[o][i]=u}}n.exports=function(n,t){try{return r[n][t]}catch(e){throw e.message="Invalid Input: [Signal: "+n+" / Amp: "+t+"]",e}}},function(n,t,e){"use strict";var r=e(15),o=e(17),i=e(3).WAVE_SIZE,u=e(3).MEM_SIZE;n.exports={Memory:r,Sequencer:o,WAVE_SIZE:i,MEM_SIZE:u}},function(n,t,e){"use strict";var r=e(16),o=e(6),i=e(0),u=e(3).MEM_SIZE,c=function(n){return i.checkRangedInt(n,0,u-1)},f={},a=function(){f=new Array(64);for(var n=0;n<32;n++)f[n]=o.pulse(n);for(var t=32;t<47;t++)f[t]=o.triangle;for(var e=48;e<63;e++)f[e]=o.sawtooth},s=function(n,t){f[c(n)]=new r(t)},l=function(n){return c(n),void 0===f[n]&&(f[n]=new r),f[n]};n.exports={init:a,write:s,read:l}},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=e(2).assert,u=e(6),c={name:"",func:u.pulse(4)},f=Symbol("func"),a=Symbol("name"),s=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r(this,n),this[f]=function(){return 0},this.name=void 0===t.name?c.name:t.name,this.func=void 0===t.func?c.func:t.func}return o(n,[{key:"name",set:function(n){this[a]=i.string(n).slice(0,32)},get:function(){return this[a]}},{key:"func",set:function(n){this[f]=i.function(n)},get:function(){return this[f]}}]),n}();n.exports=s},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=e(3).WAVE_SIZE,u=Symbol("function"),c=Symbol("current"),f=function(){function n(t){r(this,n),this[u]=t.func,this[c]=0}return o(n,[{key:"init",value:function(){this[c]=0}},{key:"read",value:function(){return this[u](this[c])}},{key:"next",value:function(){return this[c]<i-1?this[c]+=1:this[c]=0}}]),n}();n.exports=f},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function o(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?n:t}function i(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var u=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),c=e(4),f=e(19),a=function(n){function t(){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.generatorType="N",n.sequencer=new f,n}return i(t,n),u(t,[{key:"setFreq",value:function(n){Number.isFinite(n)&&n>0&&(this.freq=n,this.setPeriod(n))}},{key:"setWaveform",value:function(n){1===n?(this.lfsr.setMode(!0),this.waveNum=n):0===n&&(this.lfsr.setMode(!1),this.waveNum=n)}}]),t}(c);n.exports=a},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=function(){function n(){r(this,n),this.__mode=0,this.__tapB=1,this.__register=1}return o(n,[{key:"setMode",value:function(n){this.__mode=n,this.__tapB=n?6:1}},{key:"next",value:function(){var n=1&this.__register,t=this.__register>>this.__tapB&1,e=(n^t)<<14;this.__register>>=1,this.__register|=e}},{key:"read",value:function(){return this.__register>>11}}]),n}();n.exports=i},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function o(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?n:t}function i(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var u=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),c=e(4),f=e(7),a=e(0),s=f.Memory,l=f.Sequencer,p=f.MEM_SIZE,h=function(n){return a.checkRangedInt(n,0,p-1)},y=function(n){function t(){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.generatorType="C",n.sequencer=new l(s.read(0)),n}return i(t,n),u(t,[{key:"setWaveform",value:function(n){this.waveNum=h(n),this.sequencer=new l(s.read(n))}}]),t}(c);n.exports=y},function(n,t,e){"use strict";var r=e(22),o=e(0),i=e(1).MEM_SIZE,u=function(n){return o.checkRangedInt(n,0,i-1)},c={},f=function(){c=new Array(0)},a=function(n,t){c[u(n)]=new r(t)},s=function(n){return u(n),void 0===c[n]&&(c[n]=new r),c[n]};n.exports={init:f,write:a,read:s}},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=e(2).assert,u=e(0),c=e(1).WAVE_SIZE,f={name:"",list:new Array(c).fill(0)},a=u.checkHex,s=Symbol("list"),l=Symbol("name"),p=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r(this,n),this[s]=f.list,this.name=void 0===t.name?f.name:t.name,this.list=void 0===t.list?f.list:t.list}return o(n,[{key:"name",set:function(n){this[l]=i.string(n).slice(0,32)},get:function(){return this[l]}},{key:"list",set:function(n){this[s]=this[s].map(function(t,e){return a(n[e])})},get:function(){return this[s]}}]),n}();n.exports=p},function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),i=e(1).WAVE_SIZE,u=Symbol("list"),c=Symbol("current"),f=function(){function n(t){r(this,n),this[u]=t.list,this[c]=0}return o(n,[{key:"init",value:function(){this[c]=0}},{key:"read",value:function(){return this.list[this[c]]}},{key:"next",value:function(){return this[c]<i-1?this[c]+=1:this[c]=0}}]),n}();n.exports=f}])});