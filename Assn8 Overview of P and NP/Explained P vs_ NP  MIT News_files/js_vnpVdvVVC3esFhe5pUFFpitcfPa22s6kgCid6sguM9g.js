/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;(function(d){d.flexslider=function(g,l){var a=d(g);a.vars=d.extend({},d.flexslider.defaults,l);var e=a.vars.namespace,v=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,t=("ontouchstart"in window||v||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,m="",u,p="vertical"===a.vars.direction,n=a.vars.reverse,h=0<a.vars.itemWidth,r="fade"===a.vars.animation,q=""!==a.vars.asNavFor,c={};d.data(g,"flexslider",a);c={init:function(){a.animating=!1;a.currentSlide=parseInt(a.vars.startAt?
a.vars.startAt:0,10);isNaN(a.currentSlide)&&(a.currentSlide=0);a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" "));a.slides=d(a.vars.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(a.vars.sync).length;"slide"===a.vars.animation&&(a.vars.animation="swing");a.prop=p?"top":"marginLeft";a.args={};a.manualPause=!1;a.stopped=!1;a.started=!1;a.startTimeout=null;
a.transitions=!a.vars.video&&!r&&a.vars.useCSS&&function(){var b=document.createElement("div"),f=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],k;for(k in f)if(void 0!==b.style[f[k]])return a.pfx=f[k].replace("Perspective","").toLowerCase(),a.prop="-"+a.pfx+"-transform",!0;return!1}();""!==a.vars.controlsContainer&&(a.controlsContainer=0<d(a.vars.controlsContainer).length&&d(a.vars.controlsContainer));""!==a.vars.manualControls&&(a.manualControls=0<d(a.vars.manualControls).length&&
d(a.vars.manualControls));a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();a.setup("init");a.vars.controlNav&&c.controlNav.setup();a.vars.directionNav&&c.directionNav.setup();a.vars.keyboard&&(1===d(a.containerSelector).length||a.vars.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;a.animating||39!==b&&37!==b||(b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,a.vars.pauseOnAction))});
a.vars.mousewheel&&a.bind("mousewheel",function(b,f,k,d){b.preventDefault();b=0>f?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,a.vars.pauseOnAction)});a.vars.pausePlay&&c.pausePlay.setup();a.vars.slideshow&&a.vars.pauseInvisible&&c.pauseInvisible.init();a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){a.manualPlay||a.manualPause||a.pause()},function(){a.manualPause||a.manualPlay||a.stopped||a.play()}),a.vars.pauseInvisible&&c.pauseInvisible.isHidden()||(0<a.vars.initDelay?a.startTimeout=
setTimeout(a.play,a.vars.initDelay):a.play()));q&&c.asNav.setup();t&&a.vars.touch&&c.touch();(!r||r&&a.vars.smoothHeight)&&d(window).bind("resize orientationchange focus",c.resize);a.find("img").attr("draggable","false");setTimeout(function(){a.vars.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");if(v)g._slider=a,a.slides.each(function(){this._gesture=
new MSGesture;this._gesture.target=this;this.addEventListener("MSPointerDown",function(a){a.preventDefault();a.currentTarget._gesture&&a.currentTarget._gesture.addPointer(a.pointerId)},!1);this.addEventListener("MSGestureTap",function(b){b.preventDefault();b=d(this);var f=b.index();d(a.vars.asNavFor).data("flexslider").animating||b.hasClass("active")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})});else a.slides.on("click touchend MSPointerUp",function(b){b.preventDefault();
b=d(this);var f=b.index();0>=b.offset().left-d(a).scrollLeft()&&b.hasClass(e+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):d(a.vars.asNavFor).data("flexslider").animating||b.hasClass(e+"active-slide")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?c.controlNav.setupManual():c.controlNav.setupPaging()},setupPaging:function(){var b=1,f,k;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===
a.vars.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var g=0;g<a.pagingCount;g++)k=a.slides.eq(g),f="thumbnails"===a.vars.controlNav?'<img src="'+k.attr("data-thumb")+'"/>':"<a>"+b+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions&&(k=k.attr("data-thumbcaption"),""!=k&&void 0!=k&&(f+='<span class="'+e+'caption">'+k+"</span>")),a.controlNavScaffold.append("<li>"+f+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):
a.append(a.controlNavScaffold);c.controlNav.set();c.controlNav.active();a.controlNavScaffold.delegate("a, img","click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(a.direction=k>a.currentSlide?"next":"prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},setupManual:function(){a.controlNav=a.manualControls;c.controlNav.active();a.controlNav.bind("click touchend MSPointerUp",
function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(k>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===a.vars.controlNav?"img":"a"),a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,
f){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(f).closest("li").remove();c.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(f,b):c.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+e+'direction-nav"><li><a class="'+e+'prev" href="#">'+a.vars.prevText+'</a></li><li><a class="'+e+'next" href="#">'+a.vars.nextText+"</a></li></ul>");
a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));c.directionNav.update();a.directionNav.bind("click touchend MSPointerUp",function(b){b.preventDefault();var k;if(""===m||m===b.type)k=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev"),a.flexAnimate(k,a.vars.pauseOnAction);""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(){var b=e+"disabled";
1===a.pagingCount?a.directionNav.addClass(b).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(b).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b).attr("tabindex","-1"):a.directionNav.removeClass(b).removeAttr("tabindex")}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
(a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));c.pausePlay.update(a.vars.slideshow?e+"pause":e+"play");a.pausePlay.bind("click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type)d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play());""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
"pause").addClass(e+"play").html(a.vars.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").html(a.vars.pauseText)}},touch:function(){var b,f,k,d,c,e,m=!1,l=0,q=0,s=0;if(v){g.style.msTouchAction="none";g._gesture=new MSGesture;g._gesture.target=g;g.addEventListener("MSPointerDown",t,!1);g._slider=a;g.addEventListener("MSGestureChange",u,!1);g.addEventListener("MSGestureEnd",y,!1);var t=function(b){b.stopPropagation();a.animating?b.preventDefault():(a.pause(),g._gesture.addPointer(b.pointerId),
s=0,d=p?a.h:a.w,e=Number(new Date),k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*d:(a.currentSlide+a.cloneOffset)*d)},u=function(a){a.stopPropagation();var b=a.target._slider;if(b){var f=-a.translationX,h=-a.translationY;c=s+=p?h:f;m=p?Math.abs(s)<Math.abs(-f):Math.abs(s)<Math.abs(-h);if(a.detail===a.MSGESTURE_FLAG_INERTIA)setImmediate(function(){g._gesture.stop()});
else if(!m||500<Number(new Date)-e)a.preventDefault(),!r&&b.transitions&&(b.vars.animationLoop||(c=s/(0===b.currentSlide&&0>s||b.currentSlide===b.last&&0<s?Math.abs(s)/d+2:1)),b.setProps(k+c,"setTouch"))}},y=function(a){a.stopPropagation();if(a=a.target._slider){if(a.animatingTo===a.currentSlide&&!m&&null!==c){var g=n?-c:c,h=0<g?a.getTarget("next"):a.getTarget("prev");a.canAdvance(h)&&(550>Number(new Date)-e&&50<Math.abs(g)||Math.abs(g)>d/2)?a.flexAnimate(h,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,
a.vars.pauseOnAction,!0)}k=c=f=b=null;s=0}}}else{g.addEventListener("touchstart",z,!1);var z=function(c){if(a.animating)c.preventDefault();else if(window.navigator.msPointerEnabled||1===c.touches.length)a.pause(),d=p?a.h:a.w,e=Number(new Date),l=c.touches[0].pageX,q=c.touches[0].pageY,k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*
d:(a.currentSlide+a.cloneOffset)*d,b=p?q:l,f=p?l:q,g.addEventListener("touchmove",w,!1),g.addEventListener("touchend",x,!1)},w=function(g){l=g.touches[0].pageX;q=g.touches[0].pageY;c=p?b-q:b-l;m=p?Math.abs(c)<Math.abs(l-f):Math.abs(c)<Math.abs(q-f);if(!m||500<Number(new Date)-e)g.preventDefault(),!r&&a.transitions&&(a.vars.animationLoop||(c/=0===a.currentSlide&&0>c||a.currentSlide===a.last&&0<c?Math.abs(c)/d+2:1),a.setProps(k+c,"setTouch"))},x=function(h){g.removeEventListener("touchmove",w,!1);if(a.animatingTo===
a.currentSlide&&!m&&null!==c){h=n?-c:c;var l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-e&&50<Math.abs(h)||Math.abs(h)>d/2)?a.flexAnimate(l,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)}g.removeEventListener("touchend",x,!1);k=c=f=b=null}}},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?c.smoothHeight():h?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):p?(a.viewport.height(a.h),a.setProps(a.h,
"setTotal")):(a.vars.smoothHeight&&c.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!p||r){var f=r?a:a.viewport;b?f.animate({height:a.slides.eq(a.animatingTo).height()},b):f.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var f=d(a.vars.sync).data("flexslider"),c=a.animatingTo;switch(b){case "animate":f.flexAnimate(c,a.vars.pauseOnAction,!1,!0);break;case "play":f.playing||f.asNav||f.play();break;case "pause":f.pause()}},
uniqueID:function(a){a.find("[id]").each(function(){var a=d(this);a.attr("id",a.attr("id")+"_clone")});return a},pauseInvisible:{visProp:null,init:function(){var b=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var f=0;f<b.length;f++)b[f]+"Hidden"in document&&(c.pauseInvisible.visProp=b[f]+"Hidden");c.pauseInvisible.visProp&&(b=c.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange",document.addEventListener(b,function(){c.pauseInvisible.isHidden()?a.startTimeout?
clearTimeout(a.startTimeout):a.pause():a.started?a.play():0<a.vars.initDelay?setTimeout(a.play,a.vars.initDelay):a.play()}))},isHidden:function(){return document[c.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(u);u=setTimeout(function(){m=""},3E3)}};a.flexAnimate=function(b,f,k,g,m){a.vars.animationLoop||b===a.currentSlide||(a.direction=b>a.currentSlide?"next":"prev");q&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,
m)||k)&&a.is(":visible")){if(q&&g)if(k=d(a.vars.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,k.flexAnimate(b,!0,!1,!0,m),a.direction=a.currentItem<b?"next":"prev",k.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;
f&&a.pause();a.vars.before(a);a.syncExists&&!m&&c.sync("animate");a.vars.controlNav&&c.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;a.vars.directionNav&&c.directionNav.update();b===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause());if(r)t?(a.slides.eq(a.currentSlide).css({opacity:0,zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.wrapup(l)):(a.slides.eq(a.currentSlide).css({zIndex:1}).animate({opacity:0},a.vars.animationSpeed,
a.vars.easing),a.slides.eq(b).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing,a.wrapup));else{var l=p?a.slides.filter(":first").height():a.computedW;h?(b=a.vars.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?n?(a.count+a.cloneOffset)*l:0:a.currentSlide===a.last&&0===b&&a.vars.animationLoop&&"prev"!==a.direction?n?0:(a.count+1)*l:n?(a.count-1-b+a.cloneOffset)*
l:(b+a.cloneOffset)*l;a.setProps(b,"",a.vars.animationSpeed);a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),a.container.unbind("webkitTransitionEnd transitionend"),a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(l)})):a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){a.wrapup(l)})}a.vars.smoothHeight&&c.smoothHeight(a.vars.animationSpeed)}};a.wrapup=function(b){r||h||(0===a.currentSlide&&a.animatingTo===
a.last&&a.vars.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;a.vars.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.animatedSlides=null;a.playing=!1;a.vars.pausePlay&&c.pausePlay.update("play");a.syncExists&&c.sync("pause")};a.play=function(){a.playing&&clearInterval(a.animatedSlides);
a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed);a.started=a.playing=!0;a.vars.pausePlay&&c.pausePlay.update("pause");a.syncExists&&c.sync("play")};a.stop=function(){a.pause();a.stopped=!0};a.canAdvance=function(b,f){var c=q?a.pagingCount-1:a.last;return f?!0:q&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:q&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b!==a.currentSlide||q?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===
c&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===c&&0===b&&"next"===a.direction?!1:!0:!1};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,f,c){var d=function(){var c=b?b:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo;return-1*function(){if(h)return"setTouch"===f?b:n&&a.animatingTo===a.last?0:n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:
c;switch(f){case "setTotal":return n?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return n?b:a.count*b;case "jumpStart":return n?a.count*b:b;default:return b}}()+"px"}();a.transitions&&(d=p?"translate3d(0,"+d+",0)":"translate3d("+d+",0,0)",c=void 0!==c?c/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",c),a.container.css("transition-duration",c));a.args[a.prop]=d;(a.transitions||void 0===c)&&a.container.css(a.args);
a.container.css("transform",d)};a.setup=function(b){if(r)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(t?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+a.vars.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing)),a.vars.smoothHeight&&c.smoothHeight();else{var f,
g;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,n&&(g=d.makeArray(a.slides).reverse(),a.slides=d(g),a.container.empty().append(a.slides)));a.vars.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),c.uniqueID(a.slides.first().clone().addClass("clone").attr("aria-hidden","true")).appendTo(a.container),c.uniqueID(a.slides.last().clone().addClass("clone").attr("aria-hidden",
"true")).prependTo(a.container));a.newSlides=d(a.vars.selector,a);f=n?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;p&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(f*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(f*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,
"float":"left",display:"block"});a.vars.smoothHeight&&c.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide");a.vars.init(a)};a.doMath=function(){var b=a.slides.first(),c=a.vars.itemMargin,d=a.vars.minItems,e=a.vars.maxItems;a.w=void 0===a.viewport?a.width():a.viewport.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=a.vars.itemWidth+c,a.minW=d?d*a.itemT:a.w,a.maxW=e?e*a.itemT-c:a.w,a.itemW=a.minW>a.w?(a.w-
c*(d-1))/d:a.maxW<a.w?(a.w-c*(e-1))/e:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=0<a.vars.move&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+c*(a.count-1):(a.itemW+c)*a.count-a.w-c):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?
a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(a.vars.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)c.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),c.controlNav.update("remove",a.last);a.vars.directionNav&&c.directionNav.update()};a.addSlide=function(b,c){var e=d(b);a.count+=1;a.last=a.count-1;p&&n?void 0!==c?a.slides.eq(a.count-
c).after(e):a.container.prepend(e):void 0!==c?a.slides.eq(c).before(e):a.container.append(e);a.update(c,"add");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.added(a)};a.removeSlide=function(b){var c=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():p&&n?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(c,"remove");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.removed(a)};c.init()};d(window).blur(function(d){focused=
!1}).focus(function(d){focused=!0});d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,
pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};d.fn.flexslider=function(g){void 0===g&&(g={});if("object"===typeof g)return this.each(function(){var a=d(this),e=a.find(g.selector?g.selector:".slides > li");1===e.length&&!0===g.allowOneSlide||0===e.length?
(e.fadeIn(400),g.start&&g.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,g)});var l=d(this).data("flexslider");switch(g){case "play":l.play();break;case "pause":l.pause();break;case "stop":l.stop();break;case "next":l.flexAnimate(l.getTarget("next"),!0);break;case "prev":case "previous":l.flexAnimate(l.getTarget("prev"),!0);break;default:"number"===typeof g&&l.flexAnimate(g,!0)}}})(jQuery);;
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);;
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);;
// Generated by CoffeeScript 1.6.2
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(this,function(t){var n,s;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};s=function(t,n){t.wrap(n.wrapper);return t.parent()};t.waypoints("extendFn","sticky",function(e){var i,r,a;r=t.extend({},t.fn.waypoint.defaults,n,e);i=s(this,r);a=r.handler;r.handler=function(n){var s,e;s=t(this).children(":first");e=n==="down"||n==="right";s.toggleClass(r.stuckClass,e);i.height(e?s.outerHeight():"");if(a!=null){return a.call(this,n)}};i.waypoint(r);return this.data("stuckClass",r.stuckClass)});return t.waypoints("extendFn","unsticky",function(){this.parent().waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);;
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
;
(function ($) {
  Drupal.behaviors.mit_news = {
  attach: function(context, settings) {

    initializeUI();

    //
    // Initialize UI elements
    //
    function initializeUI() {
        setStickElements();
        layoutEventsList();
        fixInputPlaceholder();
        resetHeaderSearchButtonStatus();
        resetHeaderBrowseButtonStatus();
        checkDownloadMediaButton();
        checkMoreNewsList();
    }

    //
    // Check if mobile browser
    //
    function isMobileBrowser() {

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )
            return true;
        else
            return false;
    }

    //
    // Check if mobile query
    //
    function isMobileScreenSize() {

        if ($('#site-header-nav-wrapper').css('display') == 'none')
            return true;
        else
            return false;
    }

    //
    // Sticky elements
    //
    function setStickElements() {

        if (isMobileScreenSize()) {
           /*
            if ($('.sticky-wrapper').length != 0) {
                $('#site-header-nav-wrapper').waypoint('unsticky');
                $('#site-header-area-wrapper').waypoint('unsticky');
                $('#latest-news-area h2').waypoint('unsticky');
                $('#news-clips-area h2').waypoint('unsticky');
                $('#campus-news-area h2').waypoint('unsticky');
            }
            */
            if ($('#site-header-nav-wrapper').parent('.sticky-wrapper').length != 0)
                $('#site-header-nav-wrapper').waypoint('unsticky');

            if ($('#site-header-area-wrapper').parent('.sticky-wrapper').length != 0)
                $('#site-header-area-wrapper').waypoint('unsticky');

            if ($('#latest-news-area h2').parent('.sticky-wrapper').length != 0)
                $('#latest-news-area h2').waypoint('unsticky');

            if ($('#news-clips-area h2').parent('.sticky-wrapper').length != 0)
                $('#news-clips-area h2').waypoint('unsticky');

            if ($('#campus-news-area h2').parent('.sticky-wrapper').length != 0)
                $('#campus-news-area h2').waypoint('unsticky');

        } else {

            if ($('.sticky-wrapper').length == 0)
                $.waypoints.settings.scrollThrottle = 0; // stop jumpy

            if ($('#site-header-nav-wrapper').parent('.sticky-wrapper').length == 0)
                $('#site-header-nav-wrapper').waypoint('sticky');

            if ($('#site-header-area-wrapper').parent('.sticky-wrapper').length == 0)
                $('#site-header-area-wrapper').waypoint('sticky');

            if ($('#latest-news-area h2').parent('.sticky-wrapper').length == 0)
                $('#latest-news-area h2').waypoint('sticky');

            if ($('#news-clips-area h2').parent('.sticky-wrapper').length == 0)
                $('#news-clips-area h2').waypoint('sticky');

            if ($('#campus-news-area h2').parent('.sticky-wrapper').length == 0)
                $('#campus-news-area h2').waypoint('sticky');
            /*
                $('#latest-news-area h2').waypoint('sticky', {offset:107});
                $('#news-clips-area h2').waypoint('sticky', {offset:107});
                $('#campus-news-area h2').waypoint('sticky', {offset:107});
            } */
        }
    }

    //
    // layout events list
    //
    var eventsListSlider; // global variable
    function layoutEventsList() {
        /* // bxslider
        if (isMobileScreenSize()) {

            if ($('#events-area-wrapper #events-area .bx-wrapper').length != 0) {

                eventsListSlider.destroySlider();

                // cause error on purpose to prevent bxslider add styles into ul#mit-events-list
                $('#mit-events-list')[0].removeClass('transform');
            }


        } else {

            if ($('#events-area-wrapper #events-area .bx-wrapper').length == 0) {

                eventsListSlider = $('ul#mit-events-list').bxSlider({
                    slideWidth: '237',
                    minSlides: 4,
                    maxSlides: 4,
                    moveSlides: 4,
                    slideMargin : 30,
                    pager : false
                });
            }
        }
        */
        if (isMobileScreenSize()) {
            unbindFlexSlider('#events-area .flexslider');

        } else {
            $('#events-area .flexslider')
                .flexslider({
                    animation: "slide",
                    animationLoop: true,
                    itemWidth: 160,
                    maxItems: 4,

                            animationSpeed: 500,
                            controlNav : false,
                            slideshow : false
                    });
        }
    }

    //
    // Fix placeholder input box
    //
    function fixInputPlaceholder() {

        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
            input.val('');
        }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }


    //
    // Set Header Search Button Event
    //
    function setHeaderSearchButtonEvent() {

        if (isMobileScreenSize()) {

            $('a#search-button')
                .unbind('click')
                .click(function(event) {
                    event.preventDefault();

                    resetHeaderBrowseButtonStatus();

                    if ($('#site-search-area').css("display") == 'none') {
                        $('#site-search-area').show();
                        $(this).addClass('on');
                        $('#site-header-area-wrapper #site-header-area #options-wrapper #site-search-area .wrapper').addClass('on');

                    } else {
                        $('#site-search-area').hide();
                        $(this).removeClass('on');
                        $('#site-header-area-wrapper #site-header-area #options-wrapper #site-search-area .wrapper').removeClass('on');
                    }

                });
        }
    }

    //
    // Reset Header Search Button Status
    //
    function resetHeaderSearchButtonStatus() {

        if ($('#site-header-nav-wrapper').css('display') == 'none') {   // mobile

            $('#site-search-area').hide();
            $('a#search-button').removeClass('on');

        } else {

            $('a#search-button').removeClass('on');
            $('#site-header-area-wrapper #site-header-area #options-wrapper #site-search-area .wrapper').removeClass('on');
            $('#site-search-area').show();
        }

        setHeaderSearchButtonEvent();
    }


    //
    // Windows Resize event
    //
    $(window).resize(function(){

        if( isMobileBrowser() ) {

        } else {
            // Reset UI elements
            initializeUI();
        }

    });


    //
    // Reset Header Search Button Status
    //
    function resetHeaderBrowseButtonStatus() {

        $("a#header-browse-button").removeClass('on');
        $("a#browse-button").removeClass('on');
        $('#site-browse-area').hide();
        $('a.browse-option').removeClass('on');
        $('.browse-content').removeClass('on');
        $('ul.browse-news-by-terms .view').removeClass('on');

        setHeaderBrowseButtonEvent();
    }

    //
    // Set Header Search Button Event
    //
    function setHeaderBrowseButtonEvent() {

        // browse button on the top bar for mobile
        $("a#header-browse-button")
            .unbind('mouseover')
            .unbind('mouseout')
            .unbind('hover')
            .unbind('click')
            .click(function(e) {

                e.preventDefault();

                resetHeaderSearchButtonStatus();

                if ($('#site-browse-area').css("display") == 'none') {

                    $('#site-browse-area').show();
                    $("a#header-browse-button").addClass('on');

                } else {

                    $('#site-browse-area').hide();
                    $("a#header-browse-button").removeClass('on');
                }

                if (!isMobileScreenSize())
                     $('#site-browse-area').find('a.browse-option').trigger('click');
            });

        if (isMobileBrowser() || isMobileScreenSize()) {

            $("a#browse-button")
                .unbind('mouseover')
                .unbind('mouseout')
                .unbind('hover')
                .unbind('click')
                .click(function(e) {

                    e.preventDefault();

                    resetHeaderSearchButtonStatus();

                    if ($('#site-browse-area').css("display") == 'none') {

                        $('#site-browse-area').show();
                        $("a#browse-button").addClass('on');

                    } else {

                        $('#site-browse-area').hide();
                        $("a#browse-button").removeClass('on');
                    }

                    if (!isMobileScreenSize())
                         $('#site-browse-area').find('a.browse-option').first().trigger('click');
                });


            $('a.browse-option')
                .unbind('hover')
                .unbind('click')
                .click(function(e) {

                    e.preventDefault();

                    $('ul.browse-news-by-terms .view').removeClass('on');

                    if (isMobileScreenSize()) {

                        if ($(this).hasClass('on')) {

                            $(this).removeClass('on');
                            $(this).siblings('.browse-content').removeClass('on');

                        } else {
                            $(this).addClass('on');
                            $(this).siblings('.browse-content').addClass('on');
                        }

                    } else {

                        $('a.browse-option').removeClass('on');
                        $('.browse-content').removeClass('on');
                        $(this).addClass('on');
                        $(this).siblings('.browse-content').addClass('on');
                    }

                    $(this).parent().find('ul.browse-news-by-terms .browse-news-term a').first().trigger('click');
                });

            $('ul.browse-news-by-terms .browse-news-term a')
                .unbind('hover');

            if (!isMobileScreenSize())
                $('ul.browse-news-by-terms .browse-news-term a')
                    .click(function(event) {
                        event.preventDefault();

                        $('ul.browse-news-by-terms .browse-news-term a').removeClass('on');
                        $('ul.browse-news-by-terms .view').removeClass('on');
                        $(this).addClass('on');
                        $(this).parent().parent().find('.view').addClass('on');
                    });



            $('#site-browse-area')
                .unbind('mouseleave');

        } else {

            // hover browse-button and #site-browse-area
            $("#site-browse-button-area a#browse-button")
                .unbind('click')
                .click(function(e) { e.preventDefault(); });

            $("#site-browse-button-area a#browse-button")
                .mouseover(
                    function(event) {
                        $('#site-browse-area').show();
                        $('#site-browse-area').find('a.browse-option').first().trigger('mouseenter');
                        $("a#browse-button").addClass('on');
                    }
                )
                .mouseout(
                    function(e) {
                        if(!e && window.event)e=window.event;
                        var goingto=e.relatedTarget|| window.event.toElement;
                        if ($('#site-browse-area').has(goingto).length == 0) {
                            $('#site-browse-area').hide();
                            $("a#browse-button").removeClass('on');
                        }
                    }
                );

            $('#site-browse-area')
                .mouseleave(
                    function(event) {
                        $('#site-browse-area').hide();
                        $("a#browse-button").removeClass('on');
                    }
                );

            $('a.browse-option')
                .unbind('hover')
                .unbind('click')
                .hover(function(event) {
                    event.preventDefault();

                    $('a.browse-option').removeClass('on');
                    $('.browse-content').removeClass('on');
                    $(this).addClass('on');
                    $(this).siblings('.browse-content').addClass('on');

                    $('ul.browse-news-by-terms .view').removeClass('on');
                    $(this).parent().find('ul.browse-news-by-terms .browse-news-term a').first().trigger('mouseenter');
                });

            $('ul.browse-news-by-terms .browse-news-term a')
                .unbind('click')
                .hover(function(event) {
                    event.preventDefault();

                    $('ul.browse-news-by-terms .browse-news-term a').removeClass('on');
                    $('ul.browse-news-by-terms .view').removeClass('on');
                    $(this).addClass('on');
                    $(this).parent().parent().find('.view').addClass('on');
                });
        }
    }





    $("a#button-press-inquiry")
        .click(function(event) {
            event.preventDefault();

            var thisButton                  = $(this);
            var selectorShareArticle        = $(".share-article");
            var selectorPressInquirySection = $("#press-inquiry-section");

            if (selectorShareArticle.css("display") == 'block' && $("a#button-share").css("display") != 'none') {
                $("a#button-share").trigger('click');
            }

            if (selectorPressInquirySection.css("display") == 'block') {
                thisButton.removeClass('on', {duration:100});
                selectorPressInquirySection.fadeOut(100);
            } else {
                thisButton.addClass('on', {duration:200});
                selectorPressInquirySection.fadeIn(200);
            }
        });


    $("a#button-share")
        .click(function(event) {
            event.preventDefault();

            var thisButton                  = $(this);
            var selectorShareArticle        = $(".share-article");
            var selectorPressInquirySection = $("#press-inquiry-section");

            if (selectorPressInquirySection.css("display") == 'block') {
                $("a#button-press-inquiry").trigger('click');
            }

            if (selectorShareArticle.css("display") == 'block') {
                thisButton.removeClass('on', {duration:100});
                selectorShareArticle.fadeOut(100);
            } else {
                thisButton.addClass('on', {duration:200});
                selectorShareArticle.fadeIn(200);
            }
        });


    var loadingMITNewsIntoNewsCollection = false;
    var loadingCampusNewsIntoNewsCollection = false;
    var loadingNewsClipsIntoNewsCollection = false;
    //
    // SEE MORE Button
    //
    bindSeeMoreNewsButton();
    function bindSeeMoreNewsButton() {
        $('a#button-see-more-latest-news')
            .unbind('click')
            .click(function(event) {

                var count = $("#latest-news-area li").length;

                var button = $(this);
                button.text("Loading");

                loadingMITNewsIntoNewsCollection =
                loadingCampusNewsIntoNewsCollection =
                loadingNewsClipsIntoNewsCollection = true;

                $.ajax({
                    url: "/latest-mit-news/html?start=" + count,
                    cache: false,
                      success: function(html){
                            //$("#latest-news-area").append(html).hide().show('slow');
                            $(html).appendTo("#latest-news-area").hide().fadeIn(200);
                            loadingMITNewsIntoNewsCollection = false;
                            button.text("Read More");
                      }
                });

                count = $("#news-clips-area li").length;

                $.ajax({
                    url: "/latest-news-clips/html?start=" + count,
                    cache: false,
                      success: function(html){
                            $(html).appendTo("#news-clips-area").hide().fadeIn(200);
                            loadingCampusNewsIntoNewsCollection = false;
                      }
                });

                count = $("#campus-news-area li").length;

                $.ajax({
                    url: "/latest-campus-news/html?start=" + count,
                    cache: false,
                      success: function(html){
                            $(html).appendTo("#campus-news-area").hide().fadeIn(200);
                            loadingNewsClipsIntoNewsCollection = false;
                      }
                });

                event.preventDefault();
            });
    }
    //
    // fill the spacing between columns in news collection
    //
    if( !isMobileScreenSize() )
        setInterval(function () {
           autoFillGapNewsCollection()
           },
           3000);


    function autoFillGapNewsCollection() {

        //setInterval(function () {

            var scrollBottomPosition = $(window).scrollTop() + $(window).height();

            var MITNewsColumnHeight = $('#latest-news-area').height();
            var CampusNewsColumnHeight = $('#campus-news-area').height();
            var NewsClipsColumnHeight = $('#news-clips-area').height();

            var delta = 230;

            var highestColumn = Math.max(MITNewsColumnHeight, CampusNewsColumnHeight, NewsClipsColumnHeight);

            if (!loadingMITNewsIntoNewsCollection && Math.abs(highestColumn - MITNewsColumnHeight) > delta) {
                loadingMITNewsIntoNewsCollection = true;

                var count = $("#latest-news-area li").length;

                $.ajax({
                    url: "/latest-mit-news/html?start=" + count + "&count=1",
                    cache: false,
                      success: function(html){
                            $(html).appendTo("#latest-news-area").hide().fadeIn(200);
                            loadingMITNewsIntoNewsCollection = false;
                      }
                });
            }

            if (!loadingCampusNewsIntoNewsCollection && Math.abs(highestColumn - CampusNewsColumnHeight) > delta) {
                loadingCampusNewsIntoNewsCollection = true;

                var count = $("#campus-news-area li").length;

                $.ajax({
                    url: "/latest-campus-news/html?start=" + count + "&count=1",
                    cache: false,
                      success: function(html){
                            $(html).appendTo("#campus-news-area").hide().fadeIn(200);
                            loadingCampusNewsIntoNewsCollection = false;
                      }
                });
            }

            if (!loadingNewsClipsIntoNewsCollection && Math.abs(highestColumn - NewsClipsColumnHeight) > delta) {
                loadingNewsClipsIntoNewsCollection = true;

                var count = $("#news-clips-area li").length;

                $.ajax({
                    url: "/latest-news-clips/html?start=" + count + "&count=1",
                    cache: false,
                      success: function(html){
                            $(html).appendTo("#news-clips-area").hide().fadeIn(200);
                            loadingNewsClipsIntoNewsCollection = false;
                      }
                });
            }


        //}, 250);
    }


    //
    // Close Alert button
    //
    $('a#button-close-alert')
        .click(function(event) {
            event.preventDefault();
            $('#site-alert-area-wrapper').hide();
            $.get('/newsoffice/?close_alert');
        });


    /* //bxslider
    $(".article-top-slideshow").css("visibility", "hidden");
    $(".article-top-slideshow .slideshow-items")
        .bxSlider({
            pager : false,
            //infiniteLoop: false,
            //hideControlOnEnd: true
            onSliderLoad: function(){
                $(".article-top-slideshow").css("visibility", "visible");

                if (!isMobileScreenSize())
                    $("#site-content-area-wrapper #site-content-area .article-top-slideshow a.top-slideshow-full").css("visibility", "visible");
                }
            });
    */
    //
    // Article page's content slideshow (bxslider)
    //
    /*
    $(".article-content-slideshow").css("visibility", "hidden");
    $(".article-content-slideshow .slideshow-items")
        .bxSlider({
            pager : false,
            //infiniteLoop: false,
            //hideControlOnEnd: true
            onSliderLoad: function(){
                $(".article-content-slideshow").css("visibility", "visible");
                }
            });
    */
    //
    // Article page's top slideshow (flex)
    //
    $('.article-top-slideshow-flexslider .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            animationSpeed: 500,
            controlNav : false,
            slideshow : false,
            touch : false,
            start : function() {
                $('.article-top-slideshow-flexslider').css("visibility", "visible");
            }
            //note: touch event does not work with the minified version of flexslider
    });
    //
    // Article page's content slideshow (flex)
    //
    $('.article-content-slideshow-flexslider .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            animationSpeed: 500,
            controlNav : false,
            slideshow : false,
            touch : false
            //note: touch event does not work with the minified version of flexslider
    });

    //unbindFlexSlider('.article-top-slideshow-flexslider .flexslider');

    function unbindFlexSlider(selector) {
        var mySelector = $(selector);
        var mySelectorClean = mySelector.clone();

        mySelectorClean.find('.flex-viewport').children().unwrap();
        mySelectorClean
            .find('.clone, .flex-direction-nav, .flex-control-nav')
            .remove()
            .end()
            .find('*').removeAttr('style').removeClass (function (index, css) {
            return (css.match (/\bflex\S+/g) || []).join(' ');
            });

        mySelectorClean.insertBefore(mySelector);
        mySelectorClean.next().remove();
    }


    //
    // Media download here
    //
	$("#show-media-download").fancybox({
		width		: 800,
		autoSize	: false,
		autoHeight  : false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type        :'iframe',
		padding     : 0,
		closeBtn    : false,
        helpers     : { overlay: { css: { 'background': 'rgba(0, 0, 0, 0.75)' } } },

		// Set height to fit the content
		fitToView   : false,
        beforeShow  : function(){
                        //this.width = ($('.fancybox-iframe').contents().find('body').width());
                        this.height = ($('.fancybox-iframe').contents().find('body').height());

                        $(".fancybox-skin").css("border-radius","0");
                        }
	});


    function checkDownloadMediaButton() {

        if (isMobileBrowser()) {

            $('#press-inquiry-section a#show-media-download').hide();
            $('#press-inquiry-section p.note').show();
        }
    }


    function checkMoreNewsList() {

        $('#latest-news-area ul#articles li').removeAttr( 'style' );
        $('#campus-news-area ul#articles li').removeAttr( 'style' );
        $('#news-clips-area ul#news-clips li').removeAttr( 'style' );

        if (isMobileScreenSize()) {
            $('#latest-news-area ul#articles li').each(function(index) {
                if (index > 5)
                    $(this).hide();
            });
            $('#campus-news-area ul#articles li').each(function(index) {
                if (index > 5)
                    $(this).hide();
            });
            $('#news-clips-area ul#news-clips li').each(function(index) {
                if (index > 2)
                    $(this).hide();
            });
        }
    }

    //
    // News article - video hint button
    //
    $('a.article-video-hint').click(function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 130
            }, 400);

    });

    //
    // News article - video hint button
    //
    $(".back-to-top a").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 180)
            $('.back-to-top a').fadeIn();
        else
            $('.back-to-top a').fadeOut();
    });
    $('.back-to-top a').click(function(event){
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 410);
    });


	$(".top-slideshow-full").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		padding : 50,
		nextEffect : 'fade',
		prevEffect : 'fade',
        helpers : {
            title: {
                type: 'inside'
            },
            overlay: {
                css: { 'background': 'rgba(0, 0, 0, 0.85)' }
            },
        },
        beforeShow  : function(){
            $(".fancybox-skin")
                .css("border-radius","0")
                .css("background-color","#000000")
                .css("color","#ffffff");
            $("a.fancybox-close")
                .css("top", "0 !important")
                .css("right", "0 !important");

            this.title = this.element.parent().find(".caption").html();
        },
        tpl: {
            closeBtn : '<a title="Close" class="fancybox-item fancybox-close gallary-full-screen-close" href="javascript:;"></a>',
            next     : '<a title="Next" class="fancybox-nav fancybox-next gallary-full-screen-next" href="javascript:;"><span></span></a>',
	        prev     : '<a title="Previous" class="fancybox-nav fancybox-prev gallary-full-screen-prev" href="javascript:;"><span></span></a>'
        }
	});


	//
	// load featured news and latest news into div block - latest-news-content-block
	//
	setTimeout(function() {
            $.ajax({
                url: "/latest-news/html",
                cache: false,
                success: function(html) {
                    $("#latest-news-content-block").hide().append(html).fadeIn(200);
                    initializeUI();
                    bindSeeMoreNewsButton();
                }
            });
        }, 600);



}
};
})(jQuery);
;
