/*
 * Responsive Slider v1.1 - jQuery Image Slider
 * 
 * (c) Copyright Steven "cmsmasters" Masters
 * http://cmsmastrs.net/
 * For sale on ThemeForest.net
 */

(function(a){a.fn.cmsmsResponsiveSlider=function(b){var c={sliderWidth:1e3,sliderHeight:500,animationSpeed:500,animationEffect:"slide",animationEasing:"easeInOutExpo",pauseTime:5e3,activeSlide:1,buttonControls:true,touchControls:true,pauseOnHover:true,showCaptions:true,arrowNavigation:false,arrowNavigationHover:false,slidesNavigation:true,slidesNavigationHover:false,showTimer:true,timerHover:false,usePattern:"",afterSliderLoad:function(){},beforeVideoOpen:function(){},afterVideoClose:function(){},beforeSlideChange:function(){},afterSlideChange:function(){}},d=this,e=d.wrap('<div class="cmsms_slider_parent" />').parent(),f=undefined,g={};g={init:function(){g.options=a.extend({},c,b);g.el=d;g.vars={};g.vars.supportCanvas="getContext"in document.createElement("canvas");g.vars.timerSize=20;g.vars.timerColor="#444444";g.vars.timerHalfSize=g.vars.timerSize/2;g.vars.oldSlide=undefined;g.vars.newSlide=undefined;g.vars.active_sl_numb=g.options.activeSlide==="random"?0:Number(g.options.activeSlide-1);g.vars.inPause=true;g.vars.inAnimation=true;g.vars.inVideo=true;g.vars.mouseClicked=false;if(g.options.pauseTime!==0){g.vars.countdown=Math.round(g.options.pauseTime/50);g.vars.countMax=Math.round(g.options.pauseTime/50)}else{g.vars.countdown=-1;g.vars.countMax=-1}e.parent().css({overflow:"hidden"});g.setSliderVars();g.preloadSlider()},setSliderVars:function(){g.vars.sliderWidth=g.options.sliderWidth;g.vars.sliderHeight=g.options.sliderHeight;g.vars.sliderWidth=e.innerWidth();g.vars.sliderHeight=e.innerHeight();g.vars.slides=g.el.find(">li");g.vars.sl_count=g.vars.slides.length;g.vars.first_sl=g.vars.slides.first();g.vars.last_sl=g.vars.slides.eq(g.vars.sl_count-1)},preloadSlider:function(){var b=g.vars.slides.find("img:eq(0)"),c=b.length;b.each(function(){var b=new Image,d=a(this).attr("src");b.src=d;a(this).addClass("cmsms_img");var e=setInterval(function(){if(isImageOk(b)||isImageOk(b)==="stop"){clearInterval(e);c-=1;if(c===0){g.buildSlider();g.buildControls();g.attachEvents();if(g.options.showCaptions){g.vars.slidesCaptions.removeClass("hidden").animate({opacity:1,top:0},g.options.animationSpeed,g.options.animationEasing)}g.afterSliderLoad()}}},50)})},buildSlider:function(){e.append('<div class="cmsms_slider_video" />');g.vars.videoBlock=e.find("div.cmsms_slider_video").css({top:-g.vars.sliderHeight+"px",opacity:0}).addClass("hidden");e.append('<a href="#" class="cmsms_close_video" />');g.vars.videoClose=e.find("a.cmsms_close_video");g.vars.slides.css({left:g.vars.sliderWidth+"px"});for(var a=0;a<g.vars.sl_count;a+=1){var b=g.vars.slides.eq(a).find("img:eq(0)"),c="",d=undefined;if(g.vars.slides.eq(a).attr("data-video")){c=g.vars.slides.eq(a).attr("data-video")}if(b.parent().is("a")){d=g.vars.slides.eq(a).find(">a:eq(0)");if(g.options.usePattern!==""){d.append('<div class="cmsms_img_pattern" style="background-image:url('+g.options.usePattern+');" />')}if(g.videoLinkCheck(c)==="youtube"||g.videoLinkCheck(c)==="vimeo"){d.append('<a href="#" class="cmsms_img_video" />').parent().addClass("video")}}else{if(g.options.usePattern!==""){g.vars.slides.eq(a).append('<div class="cmsms_img_pattern" style="background-image:url('+g.options.usePattern+');" />')}if(g.videoLinkCheck(c)==="youtube"||g.videoLinkCheck(c)==="vimeo"){g.vars.slides.eq(a).append('<a href="#" class="cmsms_img_video" />').addClass("video")}}}if(g.options.activeSlide==="random"){g.vars.active_sl_numb=parseInt(Math.random()*g.vars.sl_count)}g.vars.slides.eq(g.vars.active_sl_numb).css({left:0,zIndex:2}).addClass("active");g.vars.video=g.vars.slides.find(">a.cmsms_img_video:eq(0)");g.vars.inPause=false;g.vars.inAnimation=false;g.vars.inVideo=false},buildControls:function(){if(g.options.showCaptions){g.vars.slidesCaptions=g.vars.slides.find(">.slideCaption");g.vars.slidesCaptionInner=g.vars.slidesCaptions.find(">.slideCaptionInner");g.vars.slidesCaptions.css({height:g.vars.sliderHeight-50+"px",opacity:0,top:-g.vars.sliderHeight+"px"}).addClass("hidden");g.vars.slidesCaptionInner.css({height:g.vars.sliderHeight-50+"px"})}if(g.options.slidesNavigation){e.append('<ul class="cmsms_slides_nav" />');g.vars.slidesNav=e.find("ul.cmsms_slides_nav");if(g.options.slidesNavigationHover){g.vars.slidesNav.css({opacity:0})}if(!g.options.showTimer||g.options.pauseTime===0){g.vars.slidesNav.css({top:"25px"})}for(var b=0;b<g.vars.sl_count;b+=1){g.vars.slidesNav.append('<li><a href="#">'+(b+1)+"</a></li>")}g.vars.slidesNav.find(">li").eq(g.vars.active_sl_numb).addClass("active");g.vars.slidesNavButton=g.vars.slidesNav.find(">li>a")}if(g.options.arrowNavigation){e.append('<a href="#" class="cmsms_prev_slide"><span /></a>'+'<a href="#" class="cmsms_next_slide"><span /></a>');g.vars.prevSlideButton=e.find(".cmsms_prev_slide");g.vars.nextSlideButton=e.find(".cmsms_next_slide");if(g.options.arrowNavigationHover){g.vars.prevSlideButton.css({left:"-100px",opacity:0});g.vars.nextSlideButton.css({right:"-100px",opacity:0})}}e.append('<div class="cmsms_slider_timer" />');g.vars.sliderTimer=e.find(".cmsms_slider_timer");if(g.options.showTimer){if(g.options.timerHover){g.vars.sliderTimer.css({opacity:0})}if(g.vars.supportCanvas){g.vars.timerCanvas=a('<canvas width="'+g.vars.timerSize+'" height="'+g.vars.timerSize+'"></canvas>');g.vars.sliderTimer.append(g.vars.timerCanvas);g.vars.timerCanvas=g.vars.timerCanvas[0].getContext("2d")}}else{g.vars.sliderTimer.css({display:"none"})}},attachEvents:function(){if(g.options.touchControls){g.vars.slides.bind("mousedown",function(a){g.mouseDoun(a);return false});g.vars.slides.bind("mousemove",function(a){g.mouseMove(a);return false});g.vars.slides.bind("mouseup",function(){g.mouseUp();return false});e.bind("mouseleave",function(){if(!g.vars.mouseClicked){return}g.mouseUp();return false})}if(g.options.buttonControls){a(document).bind("keydown",function(a){switch(a.keyCode){case 13:g.getSlVars();if(g.vars.active_sl.is(".video")){if(g.vars.inVideo){g.stopVideo()}else{g.playVideo(false,g.vars.active_sl)}}return false;break;case 37:if(g.vars.inVideo){return false}g.prevSlide();return false;break;case 39:if(g.vars.inVideo){return false}g.nextSlide();return false;break;default:}})}if(g.options.arrowNavigation){g.vars.nextSlideButton.bind("click",function(){g.nextSlide();return false});g.vars.prevSlideButton.bind("click",function(){g.prevSlide();return false})}if(g.options.slidesNavigation){g.vars.slidesNavButton.bind("click",function(){if(a(this).parent().is(".active")){return false}else{g.slideChoose(a(this).parent().index())}return false})}if(g.options.pauseOnHover){e.bind("mouseenter",function(){g.vars.inPause=true}).bind("mouseleave",function(){g.vars.inPause=false})}if(g.options.slidesNavigation&&g.options.slidesNavigationHover){e.bind("mouseenter",function(){g.vars.slidesNav.css({opacity:1})}).bind("mouseleave",function(){g.vars.slidesNav.css({opacity:0})})}if(g.options.arrowNavigation&&g.options.arrowNavigationHover){e.bind("mouseenter",function(){g.vars.prevSlideButton.stop().animate({left:"10px",opacity:1},g.options.animationSpeed,g.options.animationEasing);g.vars.nextSlideButton.stop().animate({right:"10px",opacity:1},g.options.animationSpeed,g.options.animationEasing)}).bind("mouseleave",function(){g.vars.prevSlideButton.stop().animate({left:"-100px",opacity:0},g.options.animationSpeed,g.options.animationEasing);g.vars.nextSlideButton.stop().animate({right:"-100px",opacity:0},g.options.animationSpeed,g.options.animationEasing)})}if(g.options.showTimer&&g.options.timerHover){e.bind("mouseenter",function(){g.vars.sliderTimer.css({opacity:1})}).bind("mouseleave",function(){g.vars.sliderTimer.css({opacity:0})})}g.vars.video.bind("click",function(a){g.playVideo(a);return false});g.vars.videoClose.bind("click",function(){g.stopVideo();return false});a(window).bind("resize",function(){g.vars.sliderWidth=e.innerWidth();g.vars.sliderHeight=e.innerHeight();g.resizeSlider()});f=setInterval(function(){g.timerController()},50)},getSlVars:function(){g.vars.active_sl=g.el.find(">li.active")},navActiveSl:function(a,b){g.vars.slidesNav.find(">li").eq(a.index()).removeClass("active");g.vars.slidesNav.find(">li").eq(b.index()).addClass("active")},setTimer:function(){g.vars.inPause=false;if(g.options.pauseTime!==0){g.vars.countdown=Math.round(g.options.pauseTime/50);g.vars.countMax=Math.round(g.options.pauseTime/50)}else{g.vars.countdown=-1;g.vars.countMax=-1}},nextSlide:function(){if(g.vars.inAnimation||g.vars.sl_count<2){return false}else{g.vars.inAnimation=true}g.getSlVars();g.setTimer();g.beforeSlideChange();g.vars.oldSlide=g.vars.active_sl;g.vars.newSlide=g.vars.active_sl.index()<g.vars.sl_count-1?g.vars.active_sl.next():g.vars.first_sl;if(g.options.slidesNavigation){g.navActiveSl(g.vars.oldSlide,g.vars.newSlide)}if(g.options.animationEffect==="slide"){g.vars.oldSlide.removeClass("active").animate({left:-g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({left:g.vars.sliderWidth+"px",zIndex:1})});g.vars.newSlide.addClass("active").css({zIndex:3}).animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){g.fadeSlide(g.vars.oldSlide,g.vars.newSlide,true)}},prevSlide:function(){if(g.vars.inAnimation||g.vars.sl_count<2){return false}else{g.vars.inAnimation=true}g.getSlVars();g.setTimer();g.beforeSlideChange();g.vars.oldSlide=g.vars.active_sl;g.vars.newSlide=g.vars.active_sl.index()>0?g.vars.active_sl.prev():g.vars.last_sl;if(g.options.slidesNavigation){g.navActiveSl(g.vars.oldSlide,g.vars.newSlide)}if(g.options.animationEffect==="slide"){g.vars.oldSlide.removeClass("active").animate({left:g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:1})});g.vars.newSlide.addClass("active").css({left:-g.vars.sliderWidth+"px",zIndex:3}).animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){g.fadeSlide(g.vars.oldSlide,g.vars.newSlide,false)}},slideChoose:function(b){if(g.vars.inAnimation){return false}else{g.vars.inAnimation=true}g.getSlVars();g.setTimer();g.beforeSlideChange();g.vars.oldSlide=g.vars.active_sl;g.vars.newSlide=g.vars.slides.eq(b);if(g.options.slidesNavigation){g.navActiveSl(g.vars.oldSlide,g.vars.newSlide)}if(g.vars.active_sl.index()<g.vars.newSlide.index()){if(g.options.animationEffect==="slide"){g.vars.oldSlide.removeClass("active").animate({left:-g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({left:g.vars.sliderWidth+"px",zIndex:1})});g.vars.newSlide.addClass("active").css({zIndex:3}).animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){g.fadeSlide(g.vars.oldSlide,g.vars.newSlide,true)}}else{if(g.options.animationEffect==="slide"){g.vars.oldSlide.removeClass("active").animate({left:g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:1})});g.vars.newSlide.addClass("active").css({left:-g.vars.sliderWidth+"px",zIndex:3}).animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){g.fadeSlide(g.vars.oldSlide,g.vars.newSlide,false)}}},fadeSlide:function(b,c,d){c.css({left:0});if(d){b.removeClass("active").animate({left:-g.vars.sliderWidth+"px",opacity:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1});c.addClass("active").css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}else{b.removeClass("active").animate({left:g.vars.sliderWidth+"px",opacity:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({opacity:1,zIndex:1});c.addClass("active").css({zIndex:2});g.vars.inAnimation=false;g.afterSlideChange()})}},videoLinkCheck:function(a){var b=a.match(/^(http:\/\/)(www\.)?([^\/]+)(\.com)/i);if(b&&b[3]!==null){return b[3]}else{return""}},playVideo:function(b,c){if(g.vars.inVideo){return false}else{g.vars.inVideo=true}g.beforeVideoOpen();var d=!b&&c?a(c).attr("data-video"):a(b.target).parent().attr("data-video"),e=d.match(/^(http:\/\/)?(www\.)?youtube\.com\/(watch\?v=)?(v\/)?([^&]+)/i),f=d.match(/^(http:\/\/)?(www\.)?vimeo\.com\/([^\/]+)/i),h="",i="";if(g.videoLinkCheck(d)==="youtube"){h=e[5];i='<iframe class="videoIframe" src="http://www.youtube.com/embed/'+h+'?rel=0&showinfo=0&autoplay=1&autohide=1&fs=1&hd=1&wmode=opaque" width="100%" height="'+(checker.os.ipad||checker.os.ipod||checker.os.iphone?g.vars.sliderHeight-100:"100%")+'" frameborder="0" allowfullscreen />'}else if(g.videoLinkCheck(d)==="vimeo"){h=f[3];i='<iframe class="videoIframe" src="http://player.vimeo.com/video/'+h+'?title=0&byline=0&portrait=0&autoplay=1&autohide=1&quality=high&wmode=opaque" width="100%" height="'+(checker.os.ipad||checker.os.ipod||checker.os.iphone?g.vars.sliderHeight-100:"100%")+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />'}g.vars.videoBlock.append(i).removeClass("hidden").css({opacity:1}).animate({top:0},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.videoClose.css({bottom:"50px"},g.options.animationSpeed,g.options.animationEasing)})},stopVideo:function(){if(!g.vars.inVideo){return false}g.vars.videoClose.animate({bottom:"-150px"},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.videoBlock.find("iframe.videoIframe").remove();g.vars.videoBlock.animate({top:-g.vars.sliderHeight+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).addClass("hidden").css({opacity:0});g.vars.inVideo=false;g.afterVideoClose()})})},resizeSlider:function(){g.vars.slides.not(".active").css({left:g.vars.sliderWidth+"px"});if(g.options.showCaptions){g.vars.slidesCaptions.css({height:g.vars.sliderHeight-50+"px"});g.vars.slidesCaptionInner.css({height:g.vars.sliderHeight-50+"px"})}if(g.vars.videoBlock.hasClass("hidden")){g.vars.videoBlock.css({top:-g.vars.sliderHeight+"px"})}},mouseDoun:function(a){if(g.vars.inAnimation||g.vars.pj_count<2){return false}else{g.vars.inAnimation=true;g.vars.inPause=true;g.vars.mouseClicked=true;g.vars.startPosX=a.clientX;g.vars.xIndex=0;g.getSlVars();g.vars.next_sl=g.vars.active_sl.index()!==g.vars.sl_count-1?g.vars.active_sl.next():g.vars.first_sl;g.vars.prev_sl=g.vars.active_sl.index()!==0?g.vars.active_sl.prev():g.vars.last_sl}},mouseMove:function(a){if(!g.vars.mouseClicked){return}g.vars.finishPosX=a.clientX;g.vars.xIndex=Math.round(g.vars.finishPosX-g.vars.startPosX);if(g.options.animationEffect==="slide"){g.vars.active_sl.css({left:g.vars.xIndex+"px"})}else if(g.options.animationEffect==="fade"){g.vars.active_sl.css({left:g.vars.xIndex+"px",opacity:1-(Math.abs(g.vars.xIndex)/Math.round(g.vars.sliderWidth*.75)).toFixed(2)})}if(g.vars.xIndex<0){if(g.options.animationEffect==="slide"){g.vars.next_sl.css({left:g.vars.sliderWidth+g.vars.xIndex+"px",zIndex:3})}else if(g.options.animationEffect==="fade"){if(g.vars.prevTouch){g.vars.prevTouch=false;g.vars.touchTarget.css({left:g.vars.sliderWidth+"px"})}if(!g.vars.nextTouch){g.vars.nextTouch=true}if(g.vars.active_sl.index()!==g.vars.sl_count-1){g.vars.touchTarget=g.vars.active_sl.next()}else{g.vars.touchTarget=g.vars.first_sl}g.vars.touchTarget.css({left:0})}}else if(g.vars.xIndex>0){if(g.options.animationEffect==="slide"){g.vars.prev_sl.css({left:-g.vars.sliderWidth+g.vars.xIndex+"px",zIndex:3})}else if(g.options.animationEffect==="fade"){if(g.vars.nextTouch){g.vars.nextTouch=false;g.vars.touchTarget.css({left:g.vars.sliderWidth+"px"})}if(!g.vars.prevTouch){g.vars.prevTouch=true}if(g.vars.active_sl.index()!==0){g.vars.touchTarget=g.vars.active_sl.prev()}else{g.vars.touchTarget=g.vars.last_sl}g.vars.touchTarget.css({left:0})}}},mouseUp:function(){if(!g.vars.mouseClicked){return}g.vars.mouseClicked=false;if(g.vars.xIndex<0){if(g.vars.xIndex<-100){g.beforeSlideChange();if(g.options.slidesNavigation){g.navActiveSl(g.vars.active_sl,g.vars.next_sl)}if(g.options.animationEffect==="slide"){if(g.vars.sl_count>2){g.vars.prev_sl.css({left:g.vars.sliderWidth+"px",zIndex:1})}g.vars.active_sl.removeClass("active").animate({left:-g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({left:g.vars.sliderWidth+"px",zIndex:1})});g.vars.next_sl.addClass("active").animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.setTimer();g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){if(g.vars.sl_count>2){g.vars.prev_sl.css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1})}g.vars.active_sl.removeClass("active").animate({left:-g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1});g.vars.next_sl.addClass("active").css({zIndex:2});g.vars.inAnimation=false;g.setTimer();g.afterSlideChange()})}}else{if(g.options.animationEffect==="slide"){if(g.vars.sl_count>2){g.vars.prev_sl.css({left:g.vars.sliderWidth+"px",zIndex:1})}g.vars.active_sl.animate({left:0},g.options.animationSpeed,g.options.animationEasing);g.vars.next_sl.animate({left:g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.inAnimation=false;g.vars.inPause=false})}else if(g.options.animationEffect==="fade"){if(g.vars.sl_count>2){g.vars.prev_sl.css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1})}g.vars.active_sl.animate({left:0,opacity:1},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.next_sl.css({left:g.vars.sliderWidth+"px"});g.vars.inAnimation=false;g.vars.inPause=false})}}}else if(g.vars.xIndex>=0){if(g.vars.xIndex>100){g.beforeSlideChange();if(g.options.slidesNavigation){g.navActiveSl(g.vars.active_sl,g.vars.prev_sl)}if(g.options.animationEffect==="slide"){if(g.vars.sl_count>2){g.vars.next_sl.css({left:g.vars.sliderWidth+"px",zIndex:1})}g.vars.active_sl.removeClass("active").animate({left:g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:1})});g.vars.prev_sl.addClass("active").animate({left:0},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({zIndex:2});g.vars.inAnimation=false;g.setTimer();g.afterSlideChange()})}else if(g.options.animationEffect==="fade"){if(g.vars.sl_count>2){g.vars.next_sl.css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1})}g.vars.active_sl.removeClass("active").animate({left:g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){a(this).css({opacity:1,zIndex:1});g.vars.prev_sl.addClass("active").css({zIndex:2});g.vars.inAnimation=false;g.setTimer();g.afterSlideChange()})}}else{if(g.options.animationEffect==="slide"){if(g.vars.sl_count>2){g.vars.next_sl.css({left:g.vars.sliderWidth+"px",zIndex:1})}if(g.vars.xIndex!==0){g.vars.active_sl.animate({left:0},g.options.animationSpeed,g.options.animationEasing);g.vars.prev_sl.animate({left:-g.vars.sliderWidth+"px"},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.inAnimation=false;g.vars.inPause=false})}else{g.vars.inAnimation=false;g.vars.inPause=false}}else if(g.options.animationEffect==="fade"){if(g.vars.sl_count>2){g.vars.next_sl.css({left:g.vars.sliderWidth+"px",opacity:1,zIndex:1})}if(g.vars.xIndex!==0){g.vars.active_sl.animate({left:0,opacity:1},g.options.animationSpeed,g.options.animationEasing,function(){g.vars.prev_sl.css({left:g.vars.sliderWidth+"px"});g.vars.inAnimation=false;g.vars.inPause=false})}else{g.vars.inAnimation=false;g.vars.inPause=false}}}}},timerController:function(){if(g.vars.inPause||g.vars.inVideo||g.vars.countdown<0){return}if(g.options.showTimer){g.timerUpdate(360*(g.vars.countMax-g.vars.countdown)/g.vars.countMax)}if(g.vars.countdown===0){g.nextSlide()}g.vars.countdown-=1},timerUpdate:function(a){if(g.vars.supportCanvas){g.vars.timerCanvas.clearRect(0,0,g.vars.timerSize,g.vars.timerSize);if(a>0){g.vars.timerCanvas.beginPath();g.vars.timerCanvas.arc(g.vars.timerHalfSize,g.vars.timerHalfSize,g.vars.timerHalfSize-2,270/360*2*Math.PI,(a+270)/360*2*Math.PI,false);g.vars.timerCanvas.lineWidth=2;g.vars.timerCanvas.strokeStyle=g.vars.timerColor;g.vars.timerCanvas.stroke();g.vars.timerCanvas.closePath()}}},afterSliderLoad:function(){g.options.afterSliderLoad()},beforeVideoOpen:function(){g.options.beforeVideoOpen()},afterVideoClose:function(){g.options.afterVideoClose()},beforeSlideChange:function(){g.options.beforeSlideChange()},afterSlideChange:function(){g.options.afterSlideChange()}};g.init()}})(jQuery);
