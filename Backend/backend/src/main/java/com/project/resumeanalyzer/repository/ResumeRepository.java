package com.project.resumeanalyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.resumeanalyzer.model.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}