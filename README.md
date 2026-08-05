# Mini Driver, Mega Values

A gentle browser game for phones. Drag the blue car down a country road and
drive into the floating bubbles to score points. No obstacles, no timer, no way
to lose.

Opens on a home screen carrying the logo, the name, and *Made with ♥ for Kids*,
with a Play button and the best score so far.

Most bubbles carry one of twenty kind words — *Kind*, *Share*, *Brave*,
*Keep Going* and so on. Catch those.

Mixed in are ten things to avoid — *Shout*, *Fight*, *Snatch*, *Give Up* and
the like. Those come as **spiky grey stars** rather than round bright bubbles,
so they're recognisable before the word has been read at all. Hitting one costs
a point, and the score can go below zero.

Each bad word mirrors a good one — *Snatch* against *Share*, *Give Up* against
*Keep Going*, *Speak Lies* against *Honest* — so the pairs teach the contrast.

Thirty of the kind bubbles are worth more than one point — twenty at **+3** and
ten at **+5**. They carry a coloured coin showing the value and wear a gold rim,
and the collect chime climbs higher the more the bubble was worth. Which words
get the bonuses is decided fresh each run, so there's nothing to memorise. A
perfect run is 160.

A full run is 100 bubbles: each kind word four times, each bad one twice, in a
random order. When they're done you get a card with your score and the best
scores so far, and can go again.

### High scores

The top five scores are kept, with a name typed in when you make the table.
They're stored in the browser's own storage, which means they live on **that
phone in that browser** — there's no server behind the game, so scores don't
travel between devices and nobody else can see them. If the browser refuses to
store anything (private browsing does, and some browsers block it for pages
opened straight off the disk), the game says so on the card and carries on
without saving.

Each pickup gives a coin-style pop, a burst of colour, a floating "+1", a quick
squeeze of the car and a bouncing score. Underneath there's a soft road hum and
an engine that idles when you're still and revs when you swerve. Tap the
speaker in the top-right to mute everything.

The road has a shadow under the car, exhaust puffing from its tail, and verges
of trees, bushes, flowers and fencing sliding past. A small speedometer sits in
the bottom-right corner — it idles at 28 km/h and climbs as you swerve, reading
the same number that drives the engine note, so needle and sound always agree.

A speed selector sits on the left edge with three notches, marked with up and
down arrows: 1 at the bottom, 2 in the middle, 3 at the top. Tap a notch and it
stays there — no holding required, so a thumb is only needed to *change* speed,
never to maintain it. Everything speeds up together — road, scenery and bubbles
— so a higher setting really does mean less time to read each word:

| Speed | Multiplier | Seconds before a word can be caught |
|---|---|---|
| 1 | 1× | 2.8s |
| 2 | 1.5× | 1.8s |
| 3 | 2.1× | 1.3s |

The car is held to the bottom fifth of the screen, which is what makes those
numbers what they are. It can't charge up the road to meet a bubble early, so
every word has to fall most of the way down before it can be collected —
roughly double the reading time an unrestricted car allowed.

The labels say 1, 2, 3 but the speeds behind them are gentler than that. A
literal 3× leaves about 1.6 seconds to read a word, notice it's one to dodge
and steer around it — past fun and into frustrating at five. Every run starts
in gear 1.

Because the selector occupies the left edge, steering maps the rest of the
width onto the full road: touching just beside it puts the car on the left
kerb, the right edge puts it on the right. One thumb can reach the whole road
while the other changes gear.

A full run takes roughly two and a half minutes in gear 1, or about seventy
seconds in gear 3.

## Running it

Just open `index.html` in a browser — double-click the file, or drag it into a
browser window. There's no build step and nothing to install.

It works with no internet connection at all. Phaser sits next to the game as
`phaser.min.js` rather than being fetched from a CDN — worth the 1.13MB in the
repo, because a game played in cars that can't start without a signal isn't
much of a game, and because it means nothing the app does reaches the network.

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
- `CAR_MIN_Y_FRAC` — how far up the screen the car may drive. This is the main
  reading-time control: 0.80 keeps it in the bottom fifth, lower values let an
  eager driver charge up and catch words sooner.
- `GAP_MIN_PX` / `GAP_MAX_PX` — road travelled between bubbles. Lower for more
  of them, but never below `BUBBLE_RADIUS × 2` or they start overlapping.
- `GEAR_SPEEDS` — the speed behind each setting, currently `[1, 1.5, 2.1]`. Add
  a fourth number and a fourth notch appears on the selector automatically.
- `BONUS_3_COUNT` / `BONUS_5_COUNT` — how many of the 80 positives are worth
  +3 and +5. The rest stay at +1.
- `HIGHSCORE_KEEP` — how many places the table holds, currently 5.
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

## Screen shapes

The canvas is a fixed 450 wide, but its height is worked out at start-up from
the shape of the screen it landed on. That means the game fills the display
edge to edge on any phone instead of sitting in black bars — a 16:9 handset
gets a 450×800 canvas, a 20:9 one gets 450×999, and both are letterbox-free.

Holding the width fixed is what keeps play identical everywhere: the car and
the bubbles stay the same size relative to the road on every device. Only the
amount of road above you changes, so a taller phone gives slightly more time
to read each word.

The height is clamped to 720–1150. Below that a landscape desktop window would
ask for a canvas too short to fit the controls; above it the layout stretches
past what it was designed for. Outside the clamp the game letterboxes rather
than breaking, and the page background is set to the road colour so any bars
read as more road.

## The logo and app icons

`logo.js` is the only place the logo is defined — a blue smiling car on the
game's own orange (`#ffa726`). It's drawn with plain Canvas 2D rather than with
Phaser, because the same code has to produce both the badge on the home screen
and the PNG files Android wants, and Phaser isn't available in the second case.
Every measurement is a fraction of the size requested, so one function draws
correctly at 48px in an app drawer and at 1024px for a store listing.

Open `icon.html` in a browser to save the icon files. It offers:

- **1024×1024 master** — feed this to `@capacitor/assets` or Android Studio's
  Image Asset wizard and every launcher size is generated from it.
- **512×512 square** — the Play Store listing icon. Google applies its own
  mask, so this one deliberately has no rounded corners and no transparency.
- **Adaptive icon layers** — a transparent foreground plus a flat `#ffa726`
  background. Android crops these to whatever shape a launcher prefers and only
  guarantees the middle 66%, so the car is drawn smaller here to keep its
  wheels out of the crop. Verified: zero pixels fall outside that safe zone.

Sharing one file between the game and the icon builder is the reason the
project is no longer a single `index.html`. It's a deliberate trade: an icon
that silently drifts away from the car in the game would be worse.

## Packaging it as an Android app

Planned identity: **Mini Driver, Mega Values**, package `com.krchinmay.minidriver`.
The package name is permanent once published and can never be changed.

`build-www.ps1` gathers the files that actually ship into `www/` — the game,
Phaser, the two shared scripts and the manifest, about 1.26MB in total. That
folder is what Capacitor copies into the Android project.

It exists because Capacitor copies its web directory wholesale: pointing it at
the repo root would sweep in the README, both dev pages and the entire `.git`
directory. Moving the game into `docs/` would have solved that too, but Pages
would then need its source changed in the repo settings and the live link
would 404 until that happened — a poor trade for tidiness, given that link is
how the game gets tested. So the game stays at the root, Pages is untouched,
and the script picks out what ships.

`www/` is gitignored: everything in it is copied from files already tracked
here, so it can be rebuilt in a second.

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
