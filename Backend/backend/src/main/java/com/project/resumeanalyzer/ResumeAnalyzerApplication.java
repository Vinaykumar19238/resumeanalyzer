package com.project.resumeanalyzer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class ResumeAnalyzerApplication {

	private static final Logger logger = LoggerFactory.getLogger(ResumeAnalyzerApplication.class);

	@Value("${spring.datasource.url}")
	private String dbUrl;

	public static void main(String[] args) {
		SpringApplication.run(ResumeAnalyzerApplication.class, args);
	}

	@PostConstruct
	public void logDbUrl() {
		logger.info("Connecting to Database: {}", dbUrl.contains("@") ? dbUrl.substring(dbUrl.lastIndexOf("@")) : dbUrl);
	}

}
