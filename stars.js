(function () {
  var canvas = document.getElementById("stars");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var dpr = Math.max(window.devicePixelRatio || 1, 1);
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stars = [];
  var shooting = [];
  var nextShootingAt = 2000;

  function initStars() {
    // depth 0 = far/dim/slow, depth 1 = near/bright/fast
    var count = Math.floor((canvas.width * canvas.height) / (dpr * dpr) / 2600);
    stars = [];
    for (var i = 0; i < count; i++) {
      var depth = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (0.5 + depth * 1.3) * dpr,
        baseAlpha: 0.35 + depth * 0.45,
        amp: 0.2 + Math.random() * 0.35,
        speed: 0.0008 + Math.random() * 0.0022,
        phase: Math.random() * Math.PI * 2,
        vx: (0.06 + depth * 0.26) * dpr,
        vy: (Math.random() - 0.5) * 0.08 * dpr,
      });
    }
  }

  function spawnShootingStar() {
    var angle = Math.PI / 5 + (Math.random() - 0.5) * 0.4;
    var speed = (7 + Math.random() * 5) * dpr;
    shooting.push({
      x: Math.random() * canvas.width * 0.7,
      y: Math.random() * canvas.height * 0.45,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: (90 + Math.random() * 130) * dpr,
      life: 0,
      maxLife: 55 + Math.random() * 35,
    });
  }

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    initStars();
  }

  function drawStars(time) {
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (!reduceMotion) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x - s.r > canvas.width) s.x = -s.r;
        if (s.x + s.r < 0) s.x = canvas.width + s.r;
        if (s.y - s.r > canvas.height) s.y = -s.r;
        if (s.y + s.r < 0) s.y = canvas.height + s.r;
      }

      var twinkle = reduceMotion
        ? s.baseAlpha
        : s.baseAlpha + Math.sin(time * s.speed + s.phase) * s.amp;
      ctx.globalAlpha = Math.max(0.05, Math.min(1, twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawShootingStars() {
    for (var i = shooting.length - 1; i >= 0; i--) {
      var m = shooting[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life++;

      var mag = Math.sqrt(m.vx * m.vx + m.vy * m.vy) || 1;
      var tailX = m.x - (m.vx / mag) * m.len;
      var tailY = m.y - (m.vy / mag) * m.len;
      var fade = 1 - m.life / m.maxLife;

      var gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      gradient.addColorStop(0, "rgba(255, 255, 255, " + fade * 0.9 + ")");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6 * dpr;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      if (
        m.life >= m.maxLife ||
        m.x - m.len > canvas.width ||
        m.y - m.len > canvas.height
      ) {
        shooting.splice(i, 1);
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars(time);

    if (!reduceMotion) {
      if (time >= nextShootingAt) {
        spawnShootingStar();
        nextShootingAt = time + 5000 + Math.random() * 7000;
      }
      drawShootingStars();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();

  if (reduceMotion) {
    drawStars(0);
  } else {
    requestAnimationFrame(draw);
  }
})();
