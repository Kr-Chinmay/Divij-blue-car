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

The game collects nothing. There is no sign-in, no account, and no personal information is asked for at any point. High scores stay on the device. The game works fully offline.

There is one small advert banner on the home screen. No adverts appear while your child is playing, and none are full screen. Adverts are non-personalised and limited to a general audiences rating.

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
| Does your app contain ads? | **Yes** |

This adds an "Contains ads" badge to your listing. It is not optional and
declaring it wrongly is a common cause of suspension.

---

## 4. App content → Data safety

This is the long one. The important thing to understand before you start:

> **Your game collects nothing. Every answer below exists because of the
> Google advert library, not because of anything the game does.**

The name typed on the high score screen and the scores themselves never
leave the phone, and Data Safety only asks about data that is *transmitted
off the device*. So none of that is declared.

### Opening questions

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **Yes** |
| Is all of the user data collected by your app encrypted in transit? | **Yes** |
| Do you provide a way for users to request that their data is deleted? | **No** |

*Encrypted in transit is Yes because Google states the ads SDK uses TLS
for everything it sends.*

### Data types to declare

All four are **Collected: Yes** and **Shared: Yes**, all are **Required**
(the user cannot switch them off), and none are processed ephemerally.

| Category | Data type | Purposes to tick |
|---|---|---|
| **Location** | Approximate location | Advertising or marketing; Fraud prevention, security and compliance |
| **App activity** | App interactions | Advertising or marketing; Analytics |
| **App info and performance** | Crash logs | Analytics |
| **App info and performance** | Diagnostics | Analytics |
| **Device or other IDs** | Device or other IDs | Advertising or marketing; Fraud prevention, security and compliance; Analytics |

**Everything else: leave unticked.** No name, no email, no photos, no
contacts, no files, no health data, no financial data, no messages.

> **A caveat you should read.** These answers are drawn from Google's own
> published disclosure for the Mobile Ads SDK (linked at the bottom), and
> they match what version 25.4 of that library actually sends. But *you*
> sign this declaration, not me. If the Console's wording differs from what
> I have written, follow the Console and tell me — an inaccurate Data
> Safety form is treated seriously.

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
| Contains ads | **Yes** |

Expect to be rated **PEGI 3 / ESRB Everyone** or the equivalent.

---

## 6. App content → Target audience and content

| Question | Answer |
|---|---|
| Target age groups | **Ages 5 and under, and 6–8** |
| Is your app designed for children? | **Yes** |
| Do you want it in the Designed for Families programme? | Yes |

Selecting only children's age groups means the full **Families policy**
applies. The app is already built for that — non-personalised adverts, a
general-audiences content rating, one banner on a menu and none during
play — but see the note below about the advertising ID.

---

## 7. App content → Advertising ID

**Read section 8 before answering this one.** The correct answer depends on
a change we may still want to make to the app.

---

## 8. The advertising ID question — needs a decision

While checking the built bundle I found that the Google ads library
automatically adds this to your app:

```
com.google.android.gms.permission.AD_ID
android.permission.ACCESS_ADSERVICES_AD_ID
```

These grant access to the **Android Advertising ID** — the identifier used
to track a device across apps.

Google's Families policy states that if children are a target audience,
the app must not transmit the advertising ID.

**Your app is already compliant**, by the first of the two routes Google
offers: `MainActivity.java` sets `setTagForChildDirectedTreatment(true)`,
and from ads SDK version 20.6.0 onward that stops the ID being sent. You
are on 25.4.

**But the permission is still declared**, and Play Console asks whether
your app uses the advertising ID. With the permission present, the honest
answer is "yes" — on a listing that also declares children as its only
audience. That combination is exactly what a policy reviewer looks at
twice.

Google offers a second route: remove the permission entirely.

| | Keep it | Remove it |
|---|---|---|
| Complies with Families policy | Yes | Yes |
| Advertising ID declaration | Awkward "yes" | Clean "no" |
| Rejection risk | Small but real | None from this |
| Cost to you | Nothing | One rebuild, about 10 minutes |
| Effect on ad revenue | None — the ID is already not being sent | None |

**Recommendation: remove it.** It costs one rebuild, it changes nothing
about how the app behaves, and it turns an awkward declaration into a
simple one.

If you agree, the change is three lines in `AndroidManifest.xml` and then
you regenerate the signed bundle exactly as before — the passwords are
remembered, so it is quicker the second time.

---

## Sources

- [Google Play data disclosure — Mobile Ads SDK](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [Comply with Google Play's Families Policy using AdMob](https://support.google.com/admob/answer/6223431?hl=en)
- [App testing requirements for new personal developer accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
