package com.project.resumeanalyzer.controller;

import org.springframework.web.multipart.MultipartFile;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.resumeanalyzer.model.Job;
import com.project.resumeanalyzer.repository.JobRepository;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin
public class ResumeController {

    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/upload")
    public Map<String, Object> uploadResume(@RequestParam("file") MultipartFile file) {

        Map<String, Object> response = new HashMap<>();

        try {

            String content = new String(file.getBytes()).toLowerCase();

            // 🔹 Step 1: Extract Skills
            List<String> skills = new ArrayList<>();

            if(content.contains("java")) skills.add("Java");
            if(content.contains("react")) skills.add("React");
            if(content.contains("mysql")) skills.add("MySQL");
            if(content.contains("spring")) skills.add("Spring Boot");

            // 🔹 Step 2: Fetch Jobs from DB
            List<Job> jobs = jobRepository.findAll();

            // 🔹 Step 3: Match Skills
            List<Map<String, Object>> recommendations = new ArrayList<>();

            for(Job job : jobs){

                String jobSkills = job.getRequiredSkills().toLowerCase();
                int matchCount = 0;

                for(String skill : skills){
                    if(jobSkills.contains(skill.toLowerCase())){
                        matchCount++;
                    }
                }

                if(!skills.isEmpty()){
                    int matchPercentage = (matchCount * 100) / skills.size();

                    if(matchPercentage > 0){
                        Map<String, Object> jobMap = new HashMap<>();
                        jobMap.put("title", job.getTitle());
                        jobMap.put("match", matchPercentage);

                        recommendations.add(jobMap);
                    }
                }
            }

            // 🔹 Final Response
            response.put("skills", skills);
            response.put("jobs", recommendations);

        } catch (Exception e) {
            response.put("error", "File processing failed");
        }

        return response;
    }
}