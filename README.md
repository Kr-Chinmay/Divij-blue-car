# Divij's Blue Car

A gentle browser game for phones. Drag the blue car down a country road and
drive into the floating bubbles to score points. No obstacles, no timer, no way
to lose.

Most bubbles carry one of twenty kind words — *Kind*, *Share*, *Brave*,
*Keep Going* and so on. Catch those.

Mixed in are ten things to avoid — *Shout*, *Fight*, *Snatch*, *Give Up* and
the like. Those come as **spiky grey stars** rather than round bright bubbles,
so they're recognisable before the word has been read at all. Hitting one costs
a point, and the score can go below zero.

Each bad word mirrors a good one — *Snatch* against *Share*, *Give Up* against
*Keep Going*, *Speak Lies* against *Honest* — so the pairs teach the contrast.

A full run is 100 bubbles: each kind word four times, each bad one twice, in a
random order. When they're done you get a "well done" card and can go again.

Each pickup gives a coin-style pop, a burst of colour, a floating "+1", a quick
squeeze of the car and a bouncing score. Underneath there's a soft road hum and
an engine that idles when you're still and revs when you swerve. Tap the
speaker in the top-right to mute everything.

The road has a shadow under the car, exhaust puffing from its tail, and verges
of trees, bushes, flowers and fencing sliding past. A small speedometer sits in
the bottom-right corner — it idles at 28 km/h and climbs as you swerve, reading
the same number that drives the engine note, so needle and sound always agree.

A throttle slider sits on the left edge: push the knob up to accelerate, pull
it down to brake, let go and it springs back to cruising. Everything speeds up
together — road, scenery and bubbles — so going fast really does mean less time
to read each word.

Because the slider occupies the left edge, steering maps the rest of the width
onto the full road: touching just beside the slider puts the car on the left
kerb, the right edge puts it on the right. One thumb can still reach the whole
road while the other works the throttle.

A full run takes roughly two and a half minutes at cruising speed.

## Running it

Just open `index.html` in a browser — double-click the file, or drag it into a
browser window. There's no build step and nothing to install.

Phaser 3 is loaded from a CDN, so the **first** load needs an internet
connection. After that the browser usually caches it.

### Playing it on a phone

`file://` won't reach your phone, so serve the folder over your local network.
From inside this folder run one of these:

```bash
python -m http.server 8000
```

```bash
npx serve -l 8000
```

Then find your computer's local IP (`ipconfig` on Windows — look for IPv4
Address, e.g. `192.168.1.42`) and on the phone browse to `http://192.168.1.42:8000`.
Both devices need to be on the same Wi-Fi.

## Tweaking it

Everything worth adjusting lives in the `CONFIG` object at the top of the
`<script>` block in `index.html` — car size and colour, how far above your
finger the car floats, how fast the bubbles fall, how often they appear.

A couple of good first knobs:

- `WORDS` / `BAD_WORDS` — the word lists. Change them to whatever you like.
- `REPEATS_PER_WORD` / `BAD_REPEATS_PER_WORD` — 4 and 2, so a run is
  20 × 4 good + 10 × 2 bad = 100 bubbles. Raise the second one for more dodging.
- `BAD_PENALTY` — points lost per bad bubble. The score is deliberately allowed
  to go negative; it turns red when it is.
- `BAD_HITBOX_FRAC` — bad bubbles collide slightly smaller than they look
  (0.86), so a near miss counts as a miss. Lower it to be kinder still.
- `FINGER_OFFSET_Y` — raise it if a thumb still covers the car.
- `GAP_MIN_PX` / `GAP_MAX_PX` — road travelled between bubbles. Lower for more
  of them, but never below `BUBBLE_RADIUS × 2` or they start overlapping.
- `SPEED_MUL_MIN` / `SPEED_MUL_MAX` — how much the brake and throttle change
  the pace. Currently 0.55× and 1.7×.
- `CAR_FOLLOW_SPEED` — higher is twitchier, lower is floatier.
- `HUM_VOLUME` / `ENGINE_VOLUME` — set either to `0` to drop that sound.
- `ENGINE_BASE_HZ` — the engine's idle pitch; lower sounds like a bigger car,
  but don't go far below 75 or phone speakers stop reproducing it at all.
- `ENGINE_GRIT` — how rough the engine sounds. This is the main "character"
  knob; drop it towards 0 and you're left with a smooth synth drone.
- `SCORE_BOUNCE_SCALE` / `CAR_BOUNCE_SCALE` — how big the pickup bounces get.

### Changing the overall pace

`SCROLL_SPEED` and `BUBBLE_SPEED` set the cruising pace. Multiply both by the
same number to make the whole game faster or slower.

Spacing looks after itself. Bubbles are spawned once enough **road has gone
by** — `GAP_MIN_PX` to `GAP_MAX_PX` — rather than after a set number of
milliseconds. Since the only rule that matters is "keep more than a bubble's
width between them", measuring the gap in the same units as the bubble is
what makes it correct. All you have to keep is:

```
GAP_MIN_PX  >  BUBBLE_RADIUS × 2
```

Currently 250 against 168, so 82px of clearance.

This is why the throttle can't break anything. A timer only guarantees spacing
while the speed is constant — brake halfway through a pause and the bubble
ahead covers less ground than the timer assumed, and the next one lands on top
of it. Counting distance is correct at any speed, including while the speed is
changing. Simulated with the throttle slammed between full brake and full
throttle for 40 seconds, the closest two bubbles came was 266px.

Set `debug: true` in the `physics.arcade` block to see the collision boxes.
`window.game` is exposed too, so `game.scene.keys.CarScene` reaches the live
game from the browser console.

## How it's built

One file, no assets. Everything on screen is drawn in code — the car and the
roadside trees are drawn once with Phaser's Graphics object and baked into
textures at start-up, and the road, verges and bubbles are plain shapes. All
three sounds — the pop, the road hum and the engine — are generated at runtime
with the Web Audio API. There are no image or audio files to load. The game
runs at a fixed 450x800 portrait size and is scaled to fit whatever screen it
lands on, so it looks the same everywhere.

The word inside each bubble is auto-fitted: it starts at 34px and steps down
until Phaser measures it as fitting inside the circle, so a long phrase like
*Keep Going* wraps onto two lines and shrinks a little rather than spilling out.

Note that browsers block audio until the player touches the screen, so the hum
only starts on the first tap. That's a browser rule, not a bug.
