package nl.catriox.notifierapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        FirebaseMessaging messaging = FirebaseMessaging.getInstance();
        messaging.subscribeToTopic("general_notifications");
    }
}