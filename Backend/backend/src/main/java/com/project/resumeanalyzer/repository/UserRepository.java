package com.project.resumeanalyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.resumeanalyzer.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}