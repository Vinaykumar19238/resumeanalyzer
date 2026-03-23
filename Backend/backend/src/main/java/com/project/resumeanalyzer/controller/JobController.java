package com.project.resumeanalyzer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.resumeanalyzer.model.Job;
import com.project.resumeanalyzer.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getJobs(){
        return jobService.getAllJobs();
    }

}