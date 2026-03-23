package com.project.resumeanalyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.resumeanalyzer.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}