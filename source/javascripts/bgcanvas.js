function draw() {
  var canvas = $('#bgcanvas').get(0);
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');
  
  var img = new Image();
  img.src = "/images/header.jpg?20120311";
  img.onload = function() {
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);
    ctx.drawImage(img, 0, 0, this.width, this.height);

    // Gradients
    var points = [
      [0, 200, 0, this.height]
      , [300, 0, 0, 0]
      , [this.width - 200, 0, this.width, 0]
    ];
    
    for(var i=0, len=points.length; i<len; i++) {
      var grd = ctx.createLinearGradient.apply(ctx, points[i]);
      grd.addColorStop(0, 'rgba(255,255,255,0)');
      grd.addColorStop(1, 'white');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // Set Position
    function setupPosition(windowSize) {
      $(canvas).css('left',
                    - (img.width - windowSize.width) / 2
                   );
    }
    function getWindowSize() {
      return {
        width: $(window).width()
        , height: $(window).height()
      };
    }
    var _windowSize = getWindowSize();
    setupPosition(_windowSize);
    setInterval(function() {
      var __windowSize = getWindowSize();
      if(_windowSize.width !== __windowSize.width
         /* || _windowSize.height !== __windowSize.height */) {
        _windowSize = __windowSize;
        setupPosition(_windowSize);
      }
    }, 100);
  };
}
$.domReady(function() {
  draw();
});