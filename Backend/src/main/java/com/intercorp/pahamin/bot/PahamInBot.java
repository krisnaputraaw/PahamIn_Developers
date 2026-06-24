package com.intercorp.pahamin.bot;

import com.intercorp.pahamin.user.UserProfile;

public abstract class PahamInBot {

    protected String userName;
    protected UserProfile userProfile;

    public PahamInBot(String userName, UserProfile userProfile) {
        this.userName = userName;
        this.userProfile = userProfile;
    }

    public abstract String respond(String input);

    public void adaptToUser(UserProfile profile) {
        this.userProfile = profile;
    }
}