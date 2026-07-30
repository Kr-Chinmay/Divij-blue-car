/* =====================================================================
   MINI DRIVER, MEGA VALUES  -  the logo
   ---------------------------------------------------------------------
   Drawn with plain Canvas 2D rather than with Phaser, deliberately: the
   same code has to produce the badge on the game's home screen AND the
   PNG files Android wants for its launcher icon. Phaser isn't available
   in the second case, but a canvas always is.

   Every measurement is a fraction of `size`, so one function draws
   correctly at 48px in a phone's app drawer and at 1024px for the Play
   Store listing. Nothing here is pixel-tuned to a single size.

   This is the only place the logo is defined. Both index.html and
   icon.html load this file, so the icon can never drift away from the
   badge the player sees when the game opens.
   ================================================================== */
(function (root) {
  'use strict';

  var COLOURS = {
    background: '#ffa726',   // the game's own orange, straight from BUBBLE_COLOURS
    body:       '#2f6fed',   // the same blue as the car in the game
    glass:      '#0f2a5e',
    eyeWhite:   '#ffffff',
    pupil:      '#101828',
    headlight:  '#fff3c4',
    smile:      '#b9d5ff',
    tyre:       '#14161d'
  };

  // Not every browser we might meet has ctx.roundRect, and a launcher icon
  // failing to draw is a worse outcome than four lines of arc maths.
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x,     y + h, r);
    ctx.arcTo(x,     y + h, x,     y,     r);
    ctx.arcTo(x,     y,     x + w, y,     r);
    ctx.closePath();
    ctx.fill();
  }

  /* The car alone, on whatever is already behind it.

     `scale` shrinks it about the centre. Android's adaptive icons crop to
     a circle and reserve only the middle 66% as a safe zone, so the
     foreground layer passes a smaller scale to keep the wheels from being
     sliced off. */
  function drawCar(ctx, size, scale) {
    scale = scale || 1;

    var s = size * scale;
    var ox = (size - s) / 2;
    var oy = (size - s) / 2;
    var f = function (v) { return ox + v * s; };   // x fraction -> pixels
    var g = function (v) { return oy + v * s; };   // y fraction -> pixels

    // Tyres first, so the bodywork covers their inner halves.
    ctx.fillStyle = COLOURS.tyre;
    roundRect(ctx, f(0.131), g(0.615), s * 0.100, s * 0.200, s * 0.031);
    roundRect(ctx, f(0.769), g(0.615), s * 0.100, s * 0.200, s * 0.031);

    // Body.
    ctx.fillStyle = COLOURS.body;
    roundRect(ctx, f(0.177), g(0.200), s * 0.646, s * 0.631, s * 0.146);

    // Windscreen, dark so the eyes read against it.
    ctx.fillStyle = COLOURS.glass;
    roundRect(ctx, f(0.254), g(0.277), s * 0.492, s * 0.238, s * 0.069);

    // Eyes. The pupils sit slightly low and right of centre, which is what
    // makes them look friendly rather than blank.
    ctx.fillStyle = COLOURS.eyeWhite;
    ctx.beginPath(); ctx.arc(f(0.392), g(0.392), s * 0.069, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(f(0.608), g(0.392), s * 0.069, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = COLOURS.pupil;
    ctx.beginPath(); ctx.arc(f(0.408), g(0.408), s * 0.031, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(f(0.623), g(0.408), s * 0.031, 0, Math.PI * 2); ctx.fill();

    // Headlights.
    ctx.fillStyle = COLOURS.headlight;
    roundRect(ctx, f(0.238), g(0.569), s * 0.138, s * 0.077, s * 0.031);
    roundRect(ctx, f(0.623), g(0.569), s * 0.138, s * 0.077, s * 0.031);

    // Smile.
    ctx.strokeStyle = COLOURS.smile;
    ctx.lineWidth = s * 0.038;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(f(0.362), g(0.708));
    ctx.quadraticCurveTo(f(0.500), g(0.792), f(0.638), g(0.708));
    ctx.stroke();
  }

  /* The whole icon: orange field, rounded corners, car on top.

     `squared` fills the canvas edge to edge instead of rounding the
     corners - which is what the Play Store listing icon wants, since
     Google applies its own mask. */
  function drawLogo(ctx, size, squared) {
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = COLOURS.background;
    if (squared) {
      ctx.fillRect(0, 0, size, size);
    } else {
      roundRect(ctx, 0, 0, size, size, size * 0.215);
    }

    drawCar(ctx, size, 1);
  }

  root.MiniDriverLogo = {
    COLOURS: COLOURS,
    drawLogo: drawLogo,
    drawCar: drawCar
  };
})(window);
