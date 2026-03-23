package com.project.resumeanalyzer.dto;

public class ResumeResponse {

    private String skills;
    private String recommendedJob;

    public String getSkills() { return skills; }

    public void setSkills(String skills) { this.skills = skills; }

    public String getRecommendedJob() { return recommendedJob; }

    public void setRecommendedJob(String recommendedJob) {
        this.recommendedJob = recommendedJob;
    }
}