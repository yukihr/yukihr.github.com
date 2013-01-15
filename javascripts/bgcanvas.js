function draw() {
  var canvas = $('#bgcanvas').get(0);
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');
  
  var img = new Image();
  img.src = "/images/header_may.jpg?20120311";
  img.onload = function() {
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);
    ctx.drawImage(img, 0, 0, this.width, this.height);

    // Gradients
    var points = [
      [0, 300, 0, this.height]
      , [300, 0, 0, 0]
      , [this.width - 300, 0, this.width, 0]
    ];
    
    for(var i=0, len=points.length; i<len; i++) {
      var grd = ctx.createLinearGradient.apply(ctx, points[i]);
      grd.addColorStop(0, 'rgba(255,255,255,0)');
      grd.addColorStop(1, 'white');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // Set Position
    function setupPosition(windowStat) {
      $(canvas).css('left',
                    - (img.width - windowStat.width) / 2 + 70
                   );
      // $(canvas).css('top',
      //               -50 - (windowStat.scrollY / $(document).height() * img.height * 20)
      //              );
    }
    function getWindowStat() {
      return {
        width: $(window).width()
        , height: $(window).height()
        , scrollY: window.scrollY || document.documentElement.scrollTop
      };
    }
    var _windowStat = getWindowStat();
    setupPosition(_windowStat);
    setInterval(function() {
      var __windowStat = getWindowStat();
      if(_windowStat.width !== __windowStat.width
         || _windowStat.scrollY !== __windowStat.scrollY) {
        _windowStat = __windowStat;
        setupPosition(_windowStat);
      }
    }, 60);
  };
}
$.domReady(function() {
  draw();
});