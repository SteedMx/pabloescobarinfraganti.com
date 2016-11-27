function mobile () {

  var hammertime = new Hammer(document, {});
  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  var sections = [$('#one'), $('#two'), $('#three'), $('#four'), $('#six')];
  var currentSectionIndex = 0;
  
  var floatingDiv = $('.iphone')
  var libro = $('.libro__grande')
  var amazon = $('.amazonBtn')
  var buttons = $('.five')

  function scroll () {

    if (currentSectionIndex < 0) {
      currentSectionIndex = 0
    } else if (currentSectionIndex >= sections.length) {
      currentSectionIndex = sections.length - 1;
    } else {
      $('body, html').animate({
        scrollTop: sections[currentSectionIndex].offset().top
      }, 600)
    }
  }

  function moveBook () {
    console.log(buttons)
    if (currentSectionIndex != 0) {
      floatingDiv.animate({
        top: '20%',
        width: '50%',
        right: '0'
      }, 600)
      libro.animate({
        width: '30vw'
      }, 600)
      buttons.css('visibility', 'visible')

      if (currentSectionIndex == 1) {
        amazon.removeClass('displayAmazon')
      }
    } else {
      buttons.css('visibility', 'hidden')
      floatingDiv.animate({
        top: '5%',
        width: '100%',
        right: 'initial'
      }, 600)
      libro.animate({
        width: '35vw'
      }, 700)
      amazon.addClass('displayAmazon')
    }
  }

  //prevent Scrolling
  $('body').bind('touchmove', function(e){e.preventDefault()})
  window.onwheel = function(){ return false; }

  hammertime.on('swipeup', function () {
    currentSectionIndex += 1;
    scroll();
    moveBook();
  })
  hammertime.on('swipedown', function () {
    currentSectionIndex -= 1;
    scroll();
    moveBook();
  })

  scroll();
}