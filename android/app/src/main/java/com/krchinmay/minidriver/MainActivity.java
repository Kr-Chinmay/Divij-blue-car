package com.krchinmay.minidriver;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Let the game start its music without waiting for a touch.
        //
        // Browsers refuse to play sound until the user has interacted with
        // the page - a sensible rule for the open web, where any tab could
        // otherwise start blaring. It is the reason the web version of this
        // game is silent until the first tap, and nothing written in
        // JavaScript can change it there.
        //
        // An installed app is a different case: the user chose to open it,
        // so the protection buys nothing and only makes the app feel broken.
        // This lifts it for our own web view only.
        getBridge().getWebView()
                   .getSettings()
                   .setMediaPlaybackRequiresUserGesture(false);

        // Advert rules for an app aimed at children.
        //
        // These are set here rather than in the game's JavaScript because the
        // Capacitor plugin does not expose them, and they are not optional:
        // Google Play's Families policy requires that adverts shown to
        // children are not personalised and are age-appropriate. Getting this
        // wrong is grounds for the app being removed, not merely a warning.
        //
        //   TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE
        //     Declares the app as directed at children under 13. Google then
        //     serves no interest-based adverts and collects no advertising
        //     identifier for the request.
        //
        //   MAX_AD_CONTENT_RATING_G
        //     Suitable for general audiences. Without it an advert for
        //     something aimed at adults could appear in a five-year-old's
        //     game.
        //
        // The game additionally asks for non-personalised adverts on every
        // request, which is the same intent expressed a second way.
        MobileAds.setRequestConfiguration(
            new RequestConfiguration.Builder()
                .setTagForChildDirectedTreatment(
                    RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
                .setMaxAdContentRating(
                    RequestConfiguration.MAX_AD_CONTENT_RATING_G)
                .build()
        );
    }
}
