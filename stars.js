(function () {
  var canvas = document.getElementById('stars');
  var ctx = canvas.getContext('2d');
  var stars = [];
  var dpr = Math.max(window.devicePixelRatio || 1, 1);

  function initStars() {
    var count = Math.floor((canvas.width * canvas.height) / (dpr * dpr) / 6000);
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.2 + 0.4) * dpr,
        baseAlpha: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.05 * dpr,
        vy: (Math.random() - 0.5) * 0.05 * dpr
      });
    }
  }

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    initStars();
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      var twinkle = s.baseAlpha + Math.sin(time / 2200 + s.phase) * 0.15;
      ctx.globalAlpha = Math.max(0, Math.min(1, twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();
