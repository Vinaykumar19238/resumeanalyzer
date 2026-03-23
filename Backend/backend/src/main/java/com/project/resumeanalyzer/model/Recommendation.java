package com.project.resumeanalyzer.model;

public class Recommendation {

    private String jobTitle;
    private int matchPercentage;

    public String getJobTitle() { return jobTitle; }

    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public int getMatchPercentage() { return matchPercentage; }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
    }
}