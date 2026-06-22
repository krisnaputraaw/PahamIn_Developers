package com.intercorp.pahamin.bot;

import com.intercorp.pahamin.task.EisenhowerQuadrant;
import com.intercorp.pahamin.task.EisenhowerTask;
import com.intercorp.pahamin.user.UserProfile;

public class SchedulerBot extends PahamInBot {

    public SchedulerBot(String userName, UserProfile userProfile) {
        super(userName, userProfile);
    }

    @Override
    public String respond(String input) {
        return "SchedulerBot merespons: " + input;
    }

    public EisenhowerQuadrant suggestTaskQuadrant(EisenhowerTask task) {
        return EisenhowerQuadrant.valueOf(task.determineQuadrant());
    }
}