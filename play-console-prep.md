# Play Console prep sheet

Everything to paste or tick when filling in the Play Console listing, in
roughly the order the Console asks for it.

**Written for `com.krchinmay.minidriver` — Mini Driver, Mega Values.**

---

## 1. Main store listing

### App name — max 30 characters

```
Mini Driver, Mega Values
```
*24 characters.*

### Short description — max 80 characters

```
Catch the kind words, dodge the unkind ones. A gentle driving game for kids.
```
*76 characters. This is the line that appears under the icon in search
results, so it does the most work of any text here.*

### Full description — max 4000 characters

```
Mini Driver, Mega Values is a gentle driving game for young children, and a quiet way to talk about kindness.

Your child steers a cheerful little car with one finger. Bubbles drift down the road carrying words: Kind, Share, Thank you, Brave, Keep Going. Catch them and the score goes up. Grey spiky bubbles carry the other sort of word, such as Shout, Snatch, Give Up and Blame Others, and those are the ones to steer around.

That is the whole game. There is no timer, no enemy, and no way to lose. A run lasts about two and a half minutes and always finishes with an encouraging message.

WHAT IS INSIDE

- 20 kind words to collect, and 10 habits to avoid, each paired with its opposite
- Three speeds, chosen by your child. A gentle first gear for small hands, quicker ones when they are ready
- Bonus bubbles worth extra points, picked at random each run, so there is nothing to memorise
- A high score table with room for five names
- Engine sounds and music built entirely from simple tones, with a mute button always on screen

MADE FOR SMALL HANDS

The car sits near the bottom of the screen and rides above the finger, so a child's hand never covers the word they are trying to read. Only four bubbles appear at a time, each large enough to read at arm's length. The words are short, and chosen for a child who is only just beginning to read.

The bubbles to avoid are grey AND spiky, different in colour and in shape, so a child who is colour blind gets exactly the same warning as everyone else.

PRIVACY

This game collects nothing. There is no sign-in, no account, and no personal information is asked for at any point. High scores stay on the device.

There are no adverts of any kind, and no tracking. The app requests no permissions at all and cannot connect to the internet, so it works exactly the same in aeroplane mode as anywhere else.

A father made this for his son. I hope yours enjoys it too.
```

### Category and details

| Field | Value |
|---|---|
| App or game | **Game** |
| Category | **Educational** |
| Tags | Casual, Educational, Family, Pretend play |
| Email address | `atozofdiabesity@gmail.com` |
| Website | `https://kr-chinmay.github.io/Divij-blue-car/privacy.html` *(optional)* |
| Phone | leave blank — optional, and it becomes public |

### Graphics checklist

| Asset | Size | Where it comes from |
|---|---|---|
| App icon | 512 × 512 | `icon.html` → `play-listing-512.png` ✅ |
| Feature graphic | 1024 × 500 | `feature-graphic.html` → pick one of three ✅ |
| Phone screenshots | min 2, max 8 | **you still need these** |

**Screenshots** are the only listing asset left. Take four or five on your
phone: the home screen, a run in progress with a few bubbles visible, a grey
spiky bubble on screen, and the finish card with a score. Portrait. Play
accepts whatever your phone produces.

---

## 2. App content → Privacy policy

```
https://kr-chinmay.github.io/Divij-blue-car/privacy.html
```

Verified live and returning HTTP 200.

---

## 3. App content → Ads

| Question | Answer |
|---|---|
| Does your app contain ads? | **No** |

The adverts were removed on 3 October 2026. No advertising library remains
in the app, so there is no "Contains ads" badge on the listing.

---

## 4. App content → Data safety

**This used to be the long one. It is now a single question.**

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **No** |

That is the whole form. Answer No and it ends.

Nothing further is asked because nothing leaves the device:

- the app holds **no permissions at all** and cannot reach the internet
- the high scores and the name typed beside them are stored on the phone
  only, and Data Safety asks solely about data *transmitted off the device*
- there is no advertising library, so no third party receives anything

When the adverts were still in, this section ran to five declared data
types — approximate location, device identifiers, app interactions, crash
logs and diagnostics — every one of them required by the Google advert
library rather than by anything the game did. Removing the adverts removed
all five.

---

## 5. App content → Content rating

Fill in the questionnaire honestly; every answer for this game is the
harmless one.

| Question area | Answer |
|---|---|
| Category | Game |
| Violence of any kind | No |
| Sexual or suggestive content | No |
| Bad language | No |
| Controlled substances | No |
| Gambling or simulated gambling | No |
| Users can interact or communicate | No |
| Users can share their location | No |
| User-generated content | No |
| Digital purchases | No |
| Contains ads | **No** |

Expect to be rated **PEGI 3 / ESRB Everyone** or the equivalent.

---

## 6. App content → Target audience and content

| Question | Answer |
|---|---|
| Target age groups | **Ages 5 and under, and 6–8** |
| Is your app designed for children? | **Yes** |
| Do you want it in the Designed for Families programme? | Yes |

Selecting only children's age groups means the full **Families policy**
applies. The parts of that policy about advertising — personalisation,
content ratings on adverts, placement around children — no longer apply to
this app at all, because it carries no adverts.

---

## 7. App content → Advertising ID

| Question | Answer |
|---|---|
| Does your app use an advertising ID? | **No** |

This was an open question while the adverts were in: the Google ads library
added the `AD_ID` permission by itself, which would have forced a "yes" on a
listing naming children as its only audience. Removing the adverts removed
the permission with them. Verified by reading the merged manifest of the
built app, which now declares **no permissions at all**.

---

## 8. Everything else

| Question | Answer |
|---|---|
| Government app | No |
| Financial features | No |
| Health apps | No |
| News app | No |
| Contains social features | No |
| Data deletion request mechanism | Not applicable — nothing is collected |

---

## Sources

- [App testing requirements for new personal developer accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
