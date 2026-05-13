/* ─── Floating orb background ─── */
(function () {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const orbs = Array.from({ length: 6 }, () => ({
    x:   Math.random() * window.innerWidth,
    y:   Math.random() * window.innerHeight,
    r:   180 + Math.random() * 160,
    vx:  (Math.random() - 0.5) * 0.45,
    vy:  (Math.random() - 0.5) * 0.45,
    hue: Math.random() < 0.5 ? 145 : 220,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `hsla(${o.hue}, 80%, 45%, 0.18)`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();

      o.x += o.vx;
      o.y += o.vy;
      if (o.x < -o.r || o.x > canvas.width  + o.r) o.vx *= -1;
      if (o.y < -o.r || o.y > canvas.height + o.r) o.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
