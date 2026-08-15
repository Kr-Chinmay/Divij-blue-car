package com.krchinmay.minidriver;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

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
    }
}
