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

A full run takes roughly two and a half minutes.

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
- `SPAWN_MIN_MS` / `SPAWN_MAX_MS` — lower them for more bubbles.
- `CAR_FOLLOW_SPEED` — higher is twitchier, lower is floatier.
- `HUM_VOLUME` / `ENGINE_VOLUME` — set either to `0` to drop that sound.
- `ENGINE_BASE_HZ` — the engine's idle pitch; lower sounds like a bigger car.
- `SCORE_BOUNCE_SCALE` / `CAR_BOUNCE_SCALE` — how big the pickup bounces get.

### Changing the overall pace

Speed lives in three values that have to move together: `SCROLL_SPEED` (how
fast the road slides past), `BUBBLE_SPEED` (how fast bubbles fall), and the
`SPAWN_MIN_MS` / `SPAWN_MAX_MS` pause between them.

To make the game *n* times faster, multiply the two speeds by *n* and **divide**
both pauses by *n*. That keeps the same three-or-four bubbles on screen and the
same spacing between them — only the pace changes.

The reason the pauses matter: every bubble deliberately falls at the same
speed, so the pause between spawns is also the gap between bubbles on screen.
Shorten the pause without slowing the fall and bubbles start overlapping and
covering each other's words. The rule to keep is:

```
SPAWN_MIN_MS × BUBBLE_SPEED / 1000  >  BUBBLE_RADIUS × 2
```

At the current settings that's `1133 × 218 / 1000 = 247px` against a 168px
bubble, so there's 79px of clearance no matter how the timing falls.

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
