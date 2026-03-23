package com.project.resumeanalyzer.model;

import jakarta.persistence.*;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String skills;

    @ManyToOne
    private User user;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }

    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getSkills() { return skills; }

    public void setSkills(String skills) { this.skills = skills; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}