(function ($) {
  // Is the HTML5 history API supported?
  var historySupported = Boolean(window.history && history.pushState);

  // Is the HTML5 hashchange event supported?
  var hashchangeSupported = (function() {
    var isSupported = "onhashchange" in window;
    if (!isSupported && window.setAttribute) {
      window.setAttribute("onhashchange", "return;");
      isSupported = typeof window.onhashchange === "function";
    }
    return isSupported;
  })();
  var getPath = function () {
    return window.location.hash.replace(/^#/, '');
  }
  $.hashchange = function (cb) {
    
    if (historySupported) {
      $(window).bind('popstate', function () {
        cb(getPath())
      });
    } else if (hashchangeSupported) {
      $(window).bind('hashchange', function () {
        cb(getPath())
      });
      //emulate first hashchange
      if (getPath()) $(window).trigger('hashchange')
    } else {
       setInterval(function() {
          if (lastState !== getHashState()) {
            handler(lastState = getHashState(), null);
          }
        }, 250);
    }
    return this;
  }
})(jQuery);