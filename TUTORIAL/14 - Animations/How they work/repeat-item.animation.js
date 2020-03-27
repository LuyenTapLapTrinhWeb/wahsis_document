myModule.animation('.repeated-item', function () {
  return {
    enter: function (element, done) {
      // Initialize the element's opacity
      element.css('opacity', 0);

      // Animate the element's opacity
      // (`element.animate()` is provided by jQuery)
      element.animate({ opacity: 1 }, done);

      // Optional `onDone`/`onCancel` callback function
      // to handle any post-animation cleanup operations
      return function (isCancelled) {
        if (isCancelled) {
          // Abort the animation if cancelled
          // (`element.stop()` is provided by jQuery)
          element.stop();
        }
      };
    },
    leave: function (element, done) {
      // Initialize the element's opacity
      element.css('opacity', 1);

      // Animate the element's opacity
      // (`element.animate()` is provided by jQuery)
      element.animate({ opacity: 0 }, done);

      // Optional `onDone`/`onCancel` callback function
      // to handle any post-animation cleanup operations
      return function (isCancelled) {
        if (isCancelled) {
          // Abort the animation if cancelled
          // (`element.stop()` is provided by jQuery)
          element.stop();
        }
      };
    },

    // We can also capture the following animation events:
    move: function (element, done) { },
    addClass: function (element, className, done) { },
    removeClass: function (element, className, done) { }
  }
});