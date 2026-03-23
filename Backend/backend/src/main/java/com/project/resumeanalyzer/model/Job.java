package com.project.resumeanalyzer.model;

import jakarta.persistence.*;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String requiredSkills;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getRequiredSkills() { return requiredSkills; }

    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }
}