# Divij's Blue Car

A gentle browser game for phones. Drag the blue car down a country road and
drive into the floating bubbles to score points. No obstacles, no timer, no way
to lose.

Each bubble carries one of twenty kind words — *Kind*, *Share*, *Brave*,
*Keep Going* and so on. A full run is 200 bubbles: every word ten times, in a
random order. When they're done you get a "well done" card and can go again.

Each pickup gives a coin-style pop, a quick squeeze of the car, and a bouncing
score. There's a soft road hum underneath — tap the speaker in the top-right to
mute everything.

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

- `WORDS` — the twenty words. Change them to whatever you like.
- `REPEATS_PER_WORD` — 10 by default, so a run is 20 × 10 = 200 bubbles.
- `FINGER_OFFSET_Y` — raise it if a thumb still covers the car.
- `SPAWN_MIN_MS` / `SPAWN_MAX_MS` — lower them for more bubbles.
- `CAR_FOLLOW_SPEED` — higher is twitchier, lower is floatier.
- `HUM_VOLUME` — set to `0` to drop the background hum entirely.
- `SCORE_BOUNCE_SCALE` / `CAR_BOUNCE_SCALE` — how big the pickup bounces get.

One catch worth knowing if you change the timing: every bubble deliberately
falls at the same speed, so the pause between spawns is also the gap between
bubbles on screen. Drop `SPAWN_MIN_MS` too far and bubbles start overlapping
and covering each other's words. Keep `SPAWN_MIN_MS × BUBBLE_SPEED / 1000`
comfortably above `BUBBLE_RADIUS × 2`.

Set `debug: true` in the `physics.arcade` block to see the collision boxes.
`window.game` is exposed too, so `game.scene.keys.CarScene` reaches the live
game from the browser console.

## How it's built

One file, no assets. Everything on screen is drawn in code — the car and the
roadside trees are drawn once with Phaser's Graphics object and baked into
textures at start-up, and the road, verges and bubbles are plain shapes. Both
sounds are generated at runtime with the Web Audio API. There are no image or
audio files to load. The game runs at a fixed 450x800 portrait size and is
scaled to fit whatever screen it lands on, so it looks the same everywhere.

The word inside each bubble is auto-fitted: it starts at 34px and steps down
until Phaser measures it as fitting inside the circle, so a long phrase like
*Keep Going* wraps onto two lines and shrinks a little rather than spilling out.

Note that browsers block audio until the player touches the screen, so the hum
only starts on the first tap. That's a browser rule, not a bug.
