/* =====================================================================
   MINI DRIVER, MEGA VALUES  -  music
   ---------------------------------------------------------------------
   Three candidate backing tracks, all synthesised - no audio files, so
   this stays bundleable inside the app with nothing to download.

   Written against a plain AudioContext rather than against Phaser, so the
   same file drives both the demo page and, once a style is chosen, the
   game itself. Whatever wins moves across without being rewritten.

   THE ONE IDEA THAT MAKES ALL THIS WORK
   Every note comes from a pentatonic scale. A pentatonic scale has no
   semitone clashes anywhere in it, so any two of its notes sound fine
   together - which means a melody can be generated at random and still
   never hit a wrong note, and a collect sound can fire at any moment and
   still land in tune with whatever is playing underneath it.
   ================================================================== */
(function (root) {
  'use strict';

  // C major pentatonic, as semitone offsets from the root.
  var PENTATONIC = [0, 2, 4, 7, 9];
  var ROOT_HZ = 261.63;   // middle C

  /* Note `i` of the scale, counting upwards through octaves. i=0 is the
     root, i=5 is the root an octave up, and negatives go down. */
  function scaleHz(i) {
    var len = PENTATONIC.length;
    var octave = Math.floor(i / len);
    var degree = ((i % len) + len) % len;
    return ROOT_HZ * Math.pow(2, (PENTATONIC[degree] + octave * 12) / 12);
  }

  /* One plucked note. The envelope is the whole character here: a fast
     rise and a long exponential fall reads as something struck, where a
     slow rise would read as something blown. */
  function pluck(ctx, out, hz, when, dur, type, peak) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = type || 'triangle';
    osc.frequency.value = hz;

    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(peak, when + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    osc.connect(gain);
    gain.connect(out);
    osc.start(when);
    osc.stop(when + dur + 0.05);
  }

  // A short burst of filtered noise - shakers, and the grit in the engine.
  function noiseBurst(ctx, out, when, dur, hz, peak) {
    var frames = Math.ceil(ctx.sampleRate * (dur + 0.05));
    var buf = ctx.createBuffer(1, frames, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < frames; i++) d[i] = Math.random() * 2 - 1;

    var src = ctx.createBufferSource();
    src.buffer = buf;

    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = hz;
    filter.Q.value = 1.2;

    var gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, when);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    src.connect(filter); filter.connect(gain); gain.connect(out);
    src.start(when);
    src.stop(when + dur + 0.05);
  }

  // A soft kick: a sine whose pitch drops away sharply.
  function kick(ctx, out, when, peak) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, when);
    osc.frequency.exponentialRampToValueAtTime(45, when + 0.12);
    gain.gain.setValueAtTime(peak, when);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.22);
    osc.connect(gain); gain.connect(out);
    osc.start(when); osc.stop(when + 0.25);
  }

  /* -------------------------------------------------------------------
     A look-ahead scheduler.

     setInterval alone is far too jittery to place notes on - a few
     milliseconds late is audible as a stumble. So the timer only decides
     WHAT to play, while the times themselves are handed to Web Audio in
     advance, where the audio clock places them exactly.
     ---------------------------------------------------------------- */
  function Scheduler(ctx, stepSeconds, onStep) {
    this.ctx = ctx;
    this.stepSeconds = stepSeconds;
    this.onStep = onStep;
    this.nextTime = 0;
    this.step = 0;
    this.timer = null;
  }

  Scheduler.prototype.start = function () {
    var self = this;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.step = 0;
    this.timer = setInterval(function () {
      while (self.nextTime < self.ctx.currentTime + 0.25) {
        self.onStep(self.step, self.nextTime);
        self.step++;
        self.nextTime += self.stepSeconds;
      }
    }, 60);
  };

  Scheduler.prototype.stop = function () {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  };

  Scheduler.prototype.setStep = function (s) { this.stepSeconds = s; };


  /* =================================================================
     STYLE 1 - Sunny tune
     A written melody over a bass note per bar. The most obviously
     "a tune" of the three, and the one most at risk of wearing thin,
     because a loop is a loop however nice it is.
     ================================================================= */
  function sunnyTune(ctx, out) {
    // Scale degrees, -1 meaning a rest. Sixteen steps to the phrase.
    var melody = [4, -1, 2, 4, 7, -1, 4, 2, 0, -1, 2, 4, 2, -1, 0, -1];
    var bass   = [0, -1, -1, -1, 3, -1, -1, -1, 1, -1, -1, -1, 4, -1, -1, -1];

    var lead = ctx.createGain(); lead.gain.value = 0.16; lead.connect(out);
    var low  = ctx.createGain(); low.gain.value  = 0.20; low.connect(out);

    var sched = new Scheduler(ctx, 0.30, function (step, when) {
      var i = step % melody.length;
      if (melody[i] >= 0) pluck(ctx, lead, scaleHz(melody[i] + 5), when, 0.45, 'triangle', 0.5);
      if (bass[i] >= 0)   pluck(ctx, low,  scaleHz(bass[i] - 5),  when, 0.9,  'sine', 0.6);
    });

    return {
      start: function () { sched.start(); },
      stop:  function () { sched.stop(); },
      // Faster gears push the tempo a little.
      setIntensity: function (t) { sched.setStep(0.30 - 0.07 * Math.max(0, Math.min(1, t))); }
    };
  }


  /* =================================================================
     STYLE 2 - Driving groove
     Percussion and a bouncy bass. Tempo follows the speed selector, so
     third gear genuinely sounds faster rather than merely being faster.
     ================================================================= */
  function drivingGroove(ctx, out) {
    var bassLine = [0, 0, 4, 0, 2, 2, 4, 3];
    var riff     = [7, -1, 9, 7, 4, -1, 2, -1];

    var drums = ctx.createGain(); drums.gain.value = 0.5;  drums.connect(out);
    var low   = ctx.createGain(); low.gain.value   = 0.22; low.connect(out);
    var lead  = ctx.createGain(); lead.gain.value  = 0.11; lead.connect(out);

    var sched = new Scheduler(ctx, 0.24, function (step, when) {
      var i = step % 8;

      if (i % 4 === 0) kick(ctx, drums, when, 0.35);
      if (i % 2 === 1) noiseBurst(ctx, drums, when, 0.05, 6000, 0.06);

      if (bassLine[i] >= 0) pluck(ctx, low, scaleHz(bassLine[i] - 5), when, 0.22, 'square', 0.32);
      if (riff[i] >= 0)     pluck(ctx, lead, scaleHz(riff[i] + 5),    when, 0.30, 'triangle', 0.42);
    });

    return {
      start: function () { sched.start(); },
      stop:  function () { sched.stop(); },
      setIntensity: function (t) { sched.setStep(0.24 - 0.08 * Math.max(0, Math.min(1, t))); }
    };
  }


  /* =================================================================
     STYLE 3 - Endless sparkle
     A slow chord pad with bell notes falling at random over it. Because
     the notes are pentatonic, a random order can never be wrong - so this
     one genuinely never repeats and cannot wear out its welcome.
     ================================================================= */
  function endlessSparkle(ctx, out) {
    var padGain = ctx.createGain(); padGain.gain.value = 0.0001; padGain.connect(out);
    var bells   = ctx.createGain(); bells.gain.value = 0.13; bells.connect(out);

    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.connect(padGain);

    var chords = [[0, 2, 4], [3, 5, 7], [1, 3, 5], [4, 6, 8]];
    var oscs = [];
    var started = false;
    var sched;

    function build() {
      for (var i = 0; i < 3; i++) {
        var o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.value = scaleHz(chords[0][i] - 3);
        o.connect(filter);
        o.start();
        oscs.push(o);
      }
    }

    sched = new Scheduler(ctx, 0.36, function (step, when) {
      // Move the pad to a new chord every 16 steps.
      if (step % 16 === 0) {
        var chord = chords[(step / 16) % chords.length];
        for (var i = 0; i < oscs.length; i++) {
          oscs[i].frequency.setTargetAtTime(scaleHz(chord[i] - 3), when, 0.6);
        }
      }
      // Bells arrive on roughly half the steps, so the rhythm never settles.
      if (Math.random() < 0.5) {
        var note = 4 + Math.floor(Math.random() * 8);
        pluck(ctx, bells, scaleHz(note), when, 1.1, 'sine', 0.45);
      }
    });

    return {
      start: function () {
        if (!started) { build(); started = true; }
        padGain.gain.setTargetAtTime(0.10, ctx.currentTime, 0.8);
        sched.start();
      },
      stop: function () {
        padGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
        sched.stop();
      },
      setIntensity: function (t) { sched.setStep(0.36 - 0.12 * Math.max(0, Math.min(1, t))); }
    };
  }


  /* -------------------------------------------------------------------
     The collect sound, in tune with the music.

     Rather than a fixed pair of pitches, this climbs the same pentatonic
     scale the backing uses, so it always lands in key. Worth more points
     means more notes and a higher start - what you hear tells you what you
     caught before you have read the number.
     ---------------------------------------------------------------- */
  function collect(ctx, out, value) {
    var base = value >= 5 ? 9 : value >= 3 ? 7 : 5;
    var count = value >= 5 ? 4 : value >= 3 ? 3 : 2;
    for (var i = 0; i < count; i++) {
      pluck(ctx, out, scaleHz(base + i), ctx.currentTime + i * 0.055, 0.28, 'triangle', 0.5);
    }
  }

  /* The bump, deliberately NOT in the scale. Everything else is consonant,
     so a note from outside it is instantly recognisable as "that was the
     wrong one" - which is precisely the job. */
  function bump(ctx, out) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    var t = ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(196, t);
    osc.frequency.exponentialRampToValueAtTime(92, t + 0.22);
    gain.gain.setValueAtTime(0.30, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.30);
    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 700;
    osc.connect(lp); lp.connect(gain); gain.connect(out);
    osc.start(t); osc.stop(t + 0.32);
  }


  /* An approximation of the engine already in the game, so the demo can be
     judged as a mix rather than in isolation. Same shape as the real one:
     detuned sawtooths, an octave above, grit, and a chug that quickens. */
  function engine(ctx, out) {
    var mix = ctx.createGain(); mix.gain.value = 1;

    var o1 = ctx.createOscillator(); o1.type = 'sawtooth';
    var o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.detune.value = 9;
    var o3 = ctx.createOscillator(); o3.type = 'square';
    var o3g = ctx.createGain(); o3g.gain.value = 0.22;

    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.Q.value = 2.2;

    var gain = ctx.createGain(); gain.gain.value = 0.07;

    var chug = ctx.createOscillator();
    var chugDepth = ctx.createGain();
    chug.frequency.value = 7; chugDepth.gain.value = 0.03;
    chug.connect(chugDepth); chugDepth.connect(gain.gain);

    o1.connect(mix); o2.connect(mix); o3.connect(o3g); o3g.connect(mix);
    mix.connect(filter); filter.connect(gain); gain.connect(out);

    o1.start(); o2.start(); o3.start(); chug.start();

    function setLoad(t) {
      t = Math.max(0, Math.min(1, t));
      var hz = 75 + t * 65;
      o1.frequency.value = hz;
      o2.frequency.value = hz;
      o3.frequency.value = hz * 2;
      filter.frequency.value = 500 + t * 1400;
      chug.frequency.value = 6 + t * 17;
      gain.gain.value = 0.07 * (0.75 + 0.5 * t);
    }
    setLoad(0);

    return {
      setLoad: setLoad,
      stop: function () {
        [o1, o2, o3, chug].forEach(function (n) {
          try { n.stop(); } catch (e) {}
          try { n.disconnect(); } catch (e) {}
        });
      }
    };
  }

  root.MiniDriverMusic = {
    scaleHz: scaleHz,
    styles: {
      tune:    sunnyTune,
      groove:  drivingGroove,
      sparkle: endlessSparkle
    },
    collect: collect,
    bump: bump,
    engine: engine
  };
})(window);
