/* Using jQuery */
(function($) {
  if($(window).width() >= 900) {

    if (navigator.userAgent.match(/Android/i)) {
      
      $(window).scroll(function() {
         var hT = $('#two').offset().top,
             hH = $('#two').outerHeight(),
             wH = $(window).height(),
             wS = $(this).scrollTop();
         if (wS > (hT+hH-wH)){
             alert('llegar a seccion 2')
         }
      });
    } else {
      var strength1 = 25;
      var strength2 = 50;
      var strength3 = 50;
      $("html").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = 1* pageX * -1;
          var newvalueY = 1* pageY * -1;
          $('#one').css("background-position", (strength1 / $(window).width() * pageX * -1)+"px "+(strength1  / $(window).height() * pageY * -1)+"px");
          $('#pabloescobar').css("background-position", (strength2 / $(window).width() * pageX * -1)+"px "+(strength2  / $(window).height() * pageY * -1)+"px");
          $('#sebasmarroquin').css("background-position", (strength3 / $(window).width() * pageX * -1)+"px "+(strength3  / $(window).height() * pageY * -1)+"px");
      });

      var wh = window.innerHeight,
        $iphone = $('.iphone'),
        $innerS1 = $('.innerS1'),
        $innerS2 = $('.innerS2'),
        $innerS3 = $('.innerS3'),
        $innerS4 = $('.innerS4'),
        $innerS5 = $('.innerS6'),
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
        .to($screenHat, 1, {yPercent: 0, ease: Power4.easeOut})
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
    }
  } else {
    mobile();
  }
})(jQuery);
