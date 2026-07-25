# Divij's Blue Car

A simple, endless browser game for phones. Drag the blue car around and drive
into the yellow circles to score points. No obstacles, no timer, no way to lose.

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
finger the car floats, how fast the circles fall, how often they appear.

A couple of good first knobs:

- `FINGER_OFFSET_Y` — raise it if a thumb still covers the car.
- `COIN_SPAWN_MS` — lower it for more circles, raise it for fewer.
- `CAR_FOLLOW_SPEED` — higher is twitchier, lower is floatier.
- `HUM_VOLUME` — set to `0` to drop the background hum entirely.
- `SCORE_BOUNCE_SCALE` / `CAR_BOUNCE_SCALE` — how big the pickup bounces get.

Set `debug: true` in the `physics.arcade` block to see the collision boxes.

## How it's built

One file, no assets. Everything on screen is a rectangle or a circle drawn in
code by Phaser, and both sounds are generated at runtime with the Web Audio API
— there are no image or audio files to load. The game runs at a fixed 450x800
portrait size and is scaled to fit whatever screen it lands on, so it looks the
same everywhere.

Note that browsers block audio until the player touches the screen, so the hum
only starts on the first tap. That's a browser rule, not a bug.
