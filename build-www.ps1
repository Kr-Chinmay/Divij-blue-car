# =====================================================================
#  Assemble www/ - the folder Capacitor copies into the Android app.
# ---------------------------------------------------------------------
#  Capacitor copies its web directory WHOLESALE. Pointing it at the repo
#  root would sweep in README.md, both dev pages, and - much worse - the
#  entire .git directory, which is far larger than the game itself.
#
#  The obvious alternative was to move the game into a docs/ folder and
#  serve GitHub Pages from there. That works, but it means changing the
#  Pages source in the repo settings, and the live link 404s until that
#  is done. Since that link is how the game gets tested on a phone,
#  breaking it to tidy a folder is a poor trade.
#
#  So the game stays at the root, Pages carries on untouched, and this
#  script gathers only what actually ships.
#
#  Run:  ./build-www.ps1
# =====================================================================

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$www  = Join-Path $root 'www'

# Everything the app needs at runtime, and nothing else.
$ship = @(
  'index.html',
  'phaser.min.js',
  'logo.js',
  'music.js',
  'manifest.json'
)

# Icons are optional: they only exist once they have been saved out of
# icon.html. Missing ones are reported rather than treated as a failure.
$optional = @('icon-192.png', 'icon-512.png')

if (Test-Path $www) { Remove-Item $www -Recurse -Force }
New-Item -ItemType Directory -Path $www | Out-Null

$missing = @()
foreach ($f in $ship) {
  $src = Join-Path $root $f
  if (Test-Path $src) {
    Copy-Item $src -Destination $www
  } else {
    $missing += $f
  }
}

foreach ($f in $optional) {
  $src = Join-Path $root $f
  if (Test-Path $src) { Copy-Item $src -Destination $www } else { $missing += "$f (optional)" }
}

$size = (Get-ChildItem $www -Recurse | Measure-Object -Property Length -Sum).Sum
"Assembled www/"
Get-ChildItem $www | ForEach-Object { "  {0,-16} {1,9:N0} bytes" -f $_.Name, $_.Length }
""
"Total: {0:N0} bytes ({1:N2} MB)" -f $size, ($size / 1MB)

if ($missing.Count) {
  ""
  "Not copied:"
  $missing | ForEach-Object { "  $_" }
}
