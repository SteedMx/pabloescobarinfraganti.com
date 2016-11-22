/* Using jQuery */
(function($) {

  var wh = window.innerHeight,
    $iphone = $('.iphone'),
    $innerS1 = $('.innerS1'),
    $innerS2 = $('.innerS2'),
    $innerS3 = $('.innerS3'),
    $innerS4 = $('.innerS4'),
    $screenHat = $('.screenHat'),
    $screenA = $('.screenA'),
    $screenB = $('.screenB'),
    $screenC = $('.screenC');

  // Initialize ScrollMagic
  var ctrl = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  // Create scene
  $("section").each(function() {

    var name = $(this).attr('id');

    new ScrollMagic.Scene({
      triggerElement: this,
      duration: '50%'
    })
    .setPin(this)
    .addIndicators({
      name:name
    })
    .loglevel(3)
    .addTo(ctrl);
  });

  // iPhone intro animation Tween
  /*
  var iphoneIntro = TweenMax.from($iphone, 1, {
    yPercent: 50,
    xPercent: 100,
    ease: Cubic.easeOut
  });
  */

  // iPhone intro animation Timeline
  var iphoneIntroTl = new TimelineMax();
  iphoneIntroTl
    .from($iphone, 1, {yPercent: -20,xPercent: 100, ease: Power4.easeInOut})
    .to($innerS1, 0.5, {opacity: 0, yPercent: -5, scale: 0.98}, '0');

  // Hook iphone animation onto the scrollbar
  new ScrollMagic.Scene({
    offset: wh,
    duration: '70%'
  })
  .setTween(iphoneIntroTl)
  .triggerElement($('body')[0])
  .addTo(ctrl);

  // Animate the hat up, letter A in and fade in content of section 2
  var iphoneContentHat = new TimelineMax();
  iphoneContentHat    
    .to($screenHat, 1, {yPercent: 135, ease: Power4.easeOut})
    .fromTo($screenA, 1, {yPercent: 20, autoAlpha: 0, scale: 0.8}, {yPercent: 0, autoAlpha: 1, scale: 1, ease: Power4.easeOut}, '0')
    .from($innerS2, 1, {autoAlpha: 0}, '-=0.3');

  new ScrollMagic.Scene({
    offset: wh*0.6,
    triggerElement: $('body')[0],
    duration: '80%'
  })
  .setTween(iphoneContentHat)
  .addIndicators()
  .addTo(ctrl);

// Animate letter A out, letter B in and fade in content of section 3
  var iphoneContent1Tl = new TimelineMax();
  iphoneContent1Tl    
    .to($screenA, 0.3, {yPercent: -30, autoAlpha: 0, ease: Power4.easeInOut})
    .fromTo($screenB, 1, {yPercent: 20, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, ease: Power4.easeInOut})
    .from($innerS3, 1, {autoAlpha: 0}, '-=0.7');

  new ScrollMagic.Scene({
    triggerElement: $('.innerS2 h2')[0],
    duration: '50%'
  })
  .setTween(iphoneContent1Tl)
  .addTo(ctrl);

  // Animate letter B out, letter C in and fade in content of section 4
  var iphoneContent2Tl = new TimelineMax();
  iphoneContent2Tl    
    .to($screenB, 0.3, {yPercent: -30, autoAlpha: 0, ease: Power4.easeInOut})
    .fromTo($screenC, 1, {yPercent: 20, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, ease: Power4.easeInOut})
    .from($innerS4, 1, {autoAlpha: 0}, '-=0.7');

  new ScrollMagic.Scene({
    triggerElement: $('.innerS3 h2')[0],
    duration: '50%'
  })
  .setTween(iphoneContent2Tl)
  .addTo(ctrl);

})(jQuery);

jQuery(document).ready(function($){
	//define store some initial variables
	var	halfWindowH = $(window).height()*0.5,
		halfWindowW = $(window).width()*0.5,
		//define a max rotation value (X and Y axises)
		maxRotationY = 5,
		maxRotationX = 3,
		aspectRatio;

	//detect if hero <img> has been loaded and evaluate its aspect-ratio
	$('.cd-floating-background').find('img').eq(0).load(function() {
		aspectRatio = $(this).width()/$(this).height();
  		if( $('html').hasClass('preserve-3d') ) initBackground();
	}).each(function() {
		//check if image was previously load - if yes, trigger load event
  		if(this.complete) $(this).load();
	});
	
	//detect mouse movement
	$('.cd-background-wrapper').each(function(){
		$(this).on('mousemove', function(event){
			var wrapperOffsetTop = $(this).offset().top;
			if( $('html').hasClass('preserve-3d') ) {
				window.requestAnimationFrame(function(){
					moveBackground(event, wrapperOffsetTop);
				});
			}
		});
	});

	//on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
	$(window).on('resize', function(){
		if( $('html').hasClass('preserve-3d') ) {
			window.requestAnimationFrame(function(){
				halfWindowH = $(window).height()*0.5,
				halfWindowW = $(window).width()*0.5;
				initBackground();
			});
		} else {
			$('.cd-background-wrapper').attr('style', '');
			$('.cd-floating-background').attr('style', '').removeClass('is-absolute');
		}
	});

	function initBackground() {
		var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
			proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
			newImageWidth = Math.ceil(halfWindowW*2*proportions),
			newImageHeight = Math.ceil(newImageWidth/aspectRatio),
			newLeft = halfWindowW - newImageWidth/2,
			newTop = (wrapperHeight - newImageHeight)/2;

		//set an height for the .cd-background-wrapper
		$('.cd-background-wrapper').css({
			'height' : wrapperHeight,
		});
		//set dimentions and position of the .cd-background-wrapper		
		$('.cd-floating-background').addClass('is-absolute').css({
			'left' : newLeft,
			'top' : newTop,
			'width' : newImageWidth,
		});
	}

	function moveBackground(event, topOffset) {
		var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
			yPosition = event.pageY - topOffset,
			rotateX = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX;

		if( rotateY > maxRotationY) rotateY = maxRotationY;
		if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
		if( rotateX > maxRotationX) rotateX = maxRotationX;
		if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

		$('.cd-floating-background').css({
			'-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		    '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		});
	}
});

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
	https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
      html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
    	html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();