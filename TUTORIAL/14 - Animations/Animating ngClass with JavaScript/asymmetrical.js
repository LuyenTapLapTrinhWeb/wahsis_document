// animateIn()
element.css({
    display: 'block',
    opacity: 1,
    position: 'absolute',
    width: 0,
    height: 0,
    top: 200,
    left: 200
}).animate({
    width: 400,
    height: 400,
    top: 0,
    left: 0
}, done);

// animateOut()
element.animate({
    opacity: 0
}, done);