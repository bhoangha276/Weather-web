const buttonRight = document.getElementById('slideRight');
    const buttonLeft = document.getElementById('slideLeft');

    buttonRight.onclick = function () {
      document.getElementById('scroll').scrollLeft += 950;
    };
    buttonLeft.onclick = function () {
      document.getElementById('scroll').scrollLeft -= 950;
    };  