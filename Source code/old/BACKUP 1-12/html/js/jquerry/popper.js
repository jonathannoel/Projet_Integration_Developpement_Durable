!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Popper=t()}(this,function(){"use strict";function e(e){var t={};return e&&"[object Function]"===t.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var n=window.getComputedStyle(e,null);return t?n[t]:n}function n(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function o(e){if(!e||-1!==["HTML","BODY","#document"].indexOf(e.nodeName))return window.document.body;var r=t(e),i=r.overflow,f=r.overflowX,a=r.overflowY;return/(auto|scroll)/.test(i+a+f)?e:o(n(e))}function r(e){var n=e&&e.offsetParent,o=n&&n.nodeName;return o&&"BODY"!==o&&"HTML"!==o?-1!==["TD","TABLE"].indexOf(n.nodeName)&&"static"===t(n,"position")?r(n):n:window.document.documentElement}function i(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||r(e.firstElementChild)===e)}function f(e){return null!==e.parentNode?f(e.parentNode):e}function a(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return window.document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?e:t,s=n?t:e,p=document.createRange();p.setStart(o,0),p.setEnd(s,0);var l=p.commonAncestorContainer;if(e!==l&&t!==l||o.contains(s))return i(l)?l:r(l);var d=f(e);return d.host?a(d.host,t):a(e,f(t).host)}function s(e){var t="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){var o=window.document.documentElement;return(window.document.scrollingElement||o)[t]}return e[t]}function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=s(t,"top"),r=s(t,"left"),i=n?-1:1;return e.top+=o*i,e.bottom+=o*i,e.left+=r*i,e.right+=r*i,e}function l(e,t){var n="x"===t?"Left":"Top",o="Left"===n?"Right":"Bottom";return+e["border"+n+"Width"].split("px")[0]+ +e["border"+o+"Width"].split("px")[0]}function d(e,t,n,o){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],Z()?n["offset"+e]+o["margin"+("Height"===e?"Top":"Left")]+o["margin"+("Height"===e?"Bottom":"Right")]:0)}function u(){var e=window.document.body,t=window.document.documentElement,n=Z()&&window.getComputedStyle(t);return{height:d("Height",e,t,n),width:d("Width",e,t,n)}}function c(e){return ne({},e,{right:e.left+e.width,bottom:e.top+e.height})}function h(e){var n={};if(Z())try{n=e.getBoundingClientRect();var o=s(e,"top"),r=s(e,"left");n.top+=o,n.left+=r,n.bottom+=o,n.right+=r}catch(e){}else n=e.getBoundingClientRect();var i={left:n.left,top:n.top,width:n.right-n.left,height:n.bottom-n.top},f="HTML"===e.nodeName?u():{},a=f.width||e.clientWidth||i.right-i.left,p=f.height||e.clientHeight||i.bottom-i.top,d=e.offsetWidth-a,h=e.offsetHeight-p;if(d||h){var m=t(e);d-=l(m,"x"),h-=l(m,"y"),i.width-=d,i.height-=h}return c(i)}function m(e,n){var r=Z(),i="HTML"===n.nodeName,f=h(e),a=h(n),s=o(e),l=t(n),d=+l.borderTopWidth.split("px")[0],u=+l.borderLeftWidth.split("px")[0],m=c({top:f.top-a.top-d,left:f.left-a.left-u,width:f.width,height:f.height});if(m.marginTop=0,m.marginLeft=0,!r&&i){var g=+l.marginTop.split("px")[0],v=+l.marginLeft.split("px")[0];m.top-=d-g,m.bottom-=d-g,m.left-=u-v,m.right-=u-v,m.marginTop=g,m.marginLeft=v}return(r?n.contains(s):n===s&&"BODY"!==s.nodeName)&&(m=p(m,n)),m}function g(e){var t=window.document.documentElement,n=m(e,t),o=Math.max(t.clientWidth,window.innerWidth||0),r=Math.max(t.clientHeight,window.innerHeight||0),i=s(t),f=s(t,"left");return c({top:i-n.top+n.marginTop,left:f-n.left+n.marginLeft,width:o,height:r})}function v(e){var o=e.nodeName;return"BODY"!==o&&"HTML"!==o&&("fixed"===t(e,"position")||v(n(e)))}function b(e,t,r,i){var f={top:0,left:0},s=a(e,t);if("viewport"===i)f=g(s);else{var p=void 0;"scrollParent"===i?"BODY"===(p=o(n(e))).nodeName&&(p=window.document.documentElement):p="window"===i?window.document.documentElement:i;var l=m(p,s);if("HTML"!==p.nodeName||v(s))f=l;else{var d=u(),c=d.height,h=d.width;f.top+=l.top-l.marginTop,f.bottom=c+l.top,f.left+=l.left-l.marginLeft,f.right=h+l.left}}return f.left+=r,f.top+=r,f.right-=r,f.bottom-=r,f}function w(e){return e.width*e.height}function y(e,t,n,o,r){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var f=b(n,o,i,r),a={top:{width:f.width,height:t.top-f.top},right:{width:f.right-t.right,height:f.height},bottom:{width:f.width,height:f.bottom-t.bottom},left:{width:t.left-f.left,height:f.height}},s=Object.keys(a).map(function(e){return ne({key:e},a[e],{area:w(a[e])})}).sort(function(e,t){return t.area-e.area}),p=s.filter(function(e){var t=e.width,o=e.height;return t>=n.clientWidth&&o>=n.clientHeight}),l=p.length>0?p[0].key:s[0].key,d=e.split("-")[1];return l+(d?"-"+d:"")}function O(e,t,n){return m(n,a(t,n))}function E(e){var t=window.getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom),o=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:e.offsetWidth+o,height:e.offsetHeight+n}}function x(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function L(e,t,n){n=n.split("-")[0];var o=E(e),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),f=i?"top":"left",a=i?"left":"top",s=i?"height":"width",p=i?"width":"height";return r[f]=t[f]+t[s]/2-o[s]/2,r[a]=n===a?t[a]-o[p]:t[x(a)],r}function T(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function M(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var o=T(e,function(e){return e[t]===n});return e.indexOf(o)}function C(t,n,o){return(void 0===o?t:t.slice(0,M(t,"name",o))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var o=t.function||t.fn;t.enabled&&e(o)&&(n.offsets.popper=c(n.offsets.popper),n.offsets.reference=c(n.offsets.reference),n=o(n,t))}),n}function N(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference),e.placement=y(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=L(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position="absolute",e=C(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function k(e,t){return e.some(function(e){var n=e.name;return e.enabled&&n===t})}function S(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),o=0;o<t.length-1;o++){var r=t[o],i=r?""+r+n:e;if(void 0!==window.document.body.style[i])return i}return null}function W(){return this.state.isDestroyed=!0,k(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[S("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e,t,n,r){var i="BODY"===e.nodeName,f=i?window:e;f.addEventListener(t,n,{passive:!0}),i||A(o(f.parentNode),t,n,r),r.push(f)}function B(e,t,n,r){n.updateBound=r,window.addEventListener("resize",n.updateBound,{passive:!0});var i=o(e);return A(i,"scroll",n.updateBound,n.scrollParents),n.scrollElement=i,n.eventsEnabled=!0,n}function D(){this.state.eventsEnabled||(this.state=B(this.reference,this.options,this.state,this.scheduleUpdate))}function H(e,t){return window.removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function P(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=H(this.reference,this.state))}function j(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function I(e,t){Object.keys(t).forEach(function(n){var o="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&j(t[n])&&(o="px"),e.style[n]=t[n]+o})}function F(e,t){Object.keys(t).forEach(function(n){!1!==t[n]?e.setAttribute(n,t[n]):e.removeAttribute(n)})}function R(e,t,n){var o=T(e,function(e){return e.name===t}),r=!!o&&e.some(function(e){return e.name===n&&e.enabled&&e.order<o.order});if(!r){var i="`"+t+"`",f="`"+n+"`";console.warn(f+" modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return r}function U(e){return"end"===e?"start":"start"===e?"end":e}function Y(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=re.indexOf(e),o=re.slice(n+1).concat(re.slice(0,n));return t?o.reverse():o}function q(e,t,n,o){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],f=r[2];if(!i)return e;if(0===f.indexOf("%")){var a=void 0;switch(f){case"%p":a=n;break;case"%":case"%r":default:a=o}return c(a)[t]/100*i}if("vh"===f||"vw"===f){return("vh"===f?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i}return i}function K(e,t,n,o){var r=[0,0],i=-1!==["right","left"].indexOf(o),f=e.split(/(\+|\-)/).map(function(e){return e.trim()}),a=f.indexOf(T(f,function(e){return-1!==e.search(/,|\s/)}));f[a]&&-1===f[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var s=/\s*,\s*|\s+/,p=-1!==a?[f.slice(0,a).concat([f[a].split(s)[0]]),[f[a].split(s)[1]].concat(f.slice(a+1))]:[f];return(p=p.map(function(e,o){var r=(1===o?!i:i)?"height":"width",f=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,f=!0,e):f?(e[e.length-1]+=t,f=!1,e):e.concat(t)},[]).map(function(e){return q(e,r,t,n)})})).forEach(function(e,t){e.forEach(function(n,o){j(n)&&(r[t]+=n*("-"===e[o-1]?-1:1))})}),r}for(var z=["native code","[object MutationObserverConstructor]"],G="undefined"!=typeof window,V=["Edge","Trident","Firefox"],_=0,X=0;X<V.length;X+=1)if(G&&navigator.userAgent.indexOf(V[X])>=0){_=1;break}var J=G&&function(e){return z.some(function(t){return(e||"").toString().indexOf(t)>-1})}(window.MutationObserver)?function(e){var t=!1,n=0,o=document.createElement("span");return new MutationObserver(function(){e(),t=!1}).observe(o,{attributes:!0}),function(){t||(t=!0,o.setAttribute("x-index",n),n+=1)}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},_))}},Q=void 0,Z=function(){return void 0===Q&&(Q=-1!==navigator.appVersion.indexOf("MSIE 10")),Q},$=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},ee=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),te=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},oe=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],re=oe.slice(3),ie={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},fe={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],o=t.split("-")[1];if(o){var r=e.offsets,i=r.reference,f=r.popper,a=-1!==["bottom","top"].indexOf(n),s=a?"left":"top",p=a?"width":"height",l={start:te({},s,i[s]),end:te({},s,i[s]+i[p]-f[p])};e.offsets.popper=ne({},f,l[o])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,o=e.placement,r=e.offsets,i=r.popper,f=r.reference,a=o.split("-")[0],s=void 0;return s=j(+n)?[+n,0]:K(n,i,f,a),"left"===a?(i.top+=s[0],i.left-=s[1]):"right"===a?(i.top+=s[0],i.left+=s[1]):"top"===a?(i.left+=s[0],i.top-=s[1]):"bottom"===a&&(i.left+=s[0],i.top+=s[1]),e.popper=i,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||r(e.instance.popper);e.instance.reference===n&&(n=r(n));var o=b(e.instance.popper,e.instance.reference,t.padding,n);t.boundaries=o;var i=t.priority,f=e.offsets.popper,a={primary:function(e){var n=f[e];return f[e]<o[e]&&!t.escapeWithReference&&(n=Math.max(f[e],o[e])),te({},e,n)},secondary:function(e){var n="right"===e?"left":"top",r=f[n];return f[e]>o[e]&&!t.escapeWithReference&&(r=Math.min(f[n],o[e]-("right"===e?f.width:f.height))),te({},n,r)}};return i.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";f=ne({},f,a[t](e))}),e.offsets.popper=f,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,o=t.reference,r=e.placement.split("-")[0],i=Math.floor,f=-1!==["top","bottom"].indexOf(r),a=f?"right":"bottom",s=f?"left":"top",p=f?"width":"height";return n[a]<i(o[s])&&(e.offsets.popper[s]=i(o[s])-n[p]),n[s]>i(o[a])&&(e.offsets.popper[s]=i(o[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,n){if(!R(e.instance.modifiers,"arrow","keepTogether"))return e;var o=n.element;if("string"==typeof o){if(!(o=e.instance.popper.querySelector(o)))return e}else if(!e.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var r=e.placement.split("-")[0],i=e.offsets,f=i.popper,a=i.reference,s=-1!==["left","right"].indexOf(r),p=s?"height":"width",l=s?"Top":"Left",d=l.toLowerCase(),u=s?"left":"top",h=s?"bottom":"right",m=E(o)[p];a[h]-m<f[d]&&(e.offsets.popper[d]-=f[d]-(a[h]-m)),a[d]+m>f[h]&&(e.offsets.popper[d]+=a[d]+m-f[h]);var g=a[d]+a[p]/2-m/2,v=t(e.instance.popper,"margin"+l).replace("px",""),b=g-c(e.offsets.popper)[d]-v;return b=Math.max(Math.min(f[p]-m,b),0),e.arrowElement=o,e.offsets.arrow={},e.offsets.arrow[d]=Math.round(b),e.offsets.arrow[u]="",e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(k(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=b(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),o=e.placement.split("-")[0],r=x(o),i=e.placement.split("-")[1]||"",f=[];switch(t.behavior){case ie.FLIP:f=[o,r];break;case ie.CLOCKWISE:f=Y(o);break;case ie.COUNTERCLOCKWISE:f=Y(o,!0);break;default:f=t.behavior}return f.forEach(function(a,s){if(o!==a||f.length===s+1)return e;o=e.placement.split("-")[0],r=x(o);var p=e.offsets.popper,l=e.offsets.reference,d=Math.floor,u="left"===o&&d(p.right)>d(l.left)||"right"===o&&d(p.left)<d(l.right)||"top"===o&&d(p.bottom)>d(l.top)||"bottom"===o&&d(p.top)<d(l.bottom),c=d(p.left)<d(n.left),h=d(p.right)>d(n.right),m=d(p.top)<d(n.top),g=d(p.bottom)>d(n.bottom),v="left"===o&&c||"right"===o&&h||"top"===o&&m||"bottom"===o&&g,b=-1!==["top","bottom"].indexOf(o),w=!!t.flipVariations&&(b&&"start"===i&&c||b&&"end"===i&&h||!b&&"start"===i&&m||!b&&"end"===i&&g);(u||v||w)&&(e.flipped=!0,(u||v)&&(o=f[s+1]),w&&(i=U(i)),e.placement=o+(i?"-"+i:""),e.offsets.popper=ne({},e.offsets.popper,L(e.instance.popper,e.offsets.reference,e.placement)),e=C(e.instance.modifiers,e,"flip"))}),e},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],o=e.offsets,r=o.popper,i=o.reference,f=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[f?"left":"top"]=i[n]-(a?r[f?"width":"height"]:0),e.placement=x(t),e.offsets.popper=c(r),e}},hide:{order:800,enabled:!0,fn:function(e){if(!R(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=T(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,o=t.y,i=e.offsets.popper,f=T(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==f&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==f?f:t.gpuAcceleration,s=h(r(e.instance.popper)),p={position:i.position},l={left:Math.floor(i.left),top:Math.floor(i.top),bottom:Math.floor(i.bottom),right:Math.floor(i.right)},d="bottom"===n?"top":"bottom",u="right"===o?"left":"right",c=S("transform"),m=void 0,g=void 0;if(g="bottom"===d?-s.height+l.bottom:l.top,m="right"===u?-s.width+l.right:l.left,a&&c)p[c]="translate3d("+m+"px, "+g+"px, 0)",p[d]=0,p[u]=0,p.willChange="transform";else{var v="bottom"===d?-1:1,b="right"===u?-1:1;p[d]=g*v,p[u]=m*b,p.willChange=d+", "+u}var w={"x-placement":e.placement};return e.attributes=ne({},w,e.attributes),e.styles=ne({},p,e.styles),e.arrowStyles=ne({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){return I(e.instance.popper,e.styles),F(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&I(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,o,r){var i=O(r,t,e),f=y(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",f),I(t,{position:"absolute"}),n},gpuAcceleration:void 0}}},ae=function(){function t(n,o){var r=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};$(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=J(this.update.bind(this)),this.options=ne({},t.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=n.jquery?n[0]:n,this.popper=o.jquery?o[0]:o,this.options.modifiers={},Object.keys(ne({},t.Defaults.modifiers,i.modifiers)).forEach(function(e){r.options.modifiers[e]=ne({},t.Defaults.modifiers[e]||{},i.modifiers?i.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return ne({name:e},r.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(r.reference,r.popper,r.options,t,r.state)}),this.update();var f=this.options.eventsEnabled;f&&this.enableEventListeners(),this.state.eventsEnabled=f}return ee(t,[{key:"update",value:function(){return N.call(this)}},{key:"destroy",value:function(){return W.call(this)}},{key:"enableEventListeners",value:function(){return D.call(this)}},{key:"disableEventListeners",value:function(){return P.call(this)}}]),t}();return ae.Utils=("undefined"!=typeof window?window:global).PopperUtils,ae.placements=oe,ae.Defaults=fe,ae});