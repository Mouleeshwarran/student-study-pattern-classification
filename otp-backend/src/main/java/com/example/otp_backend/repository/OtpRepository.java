package com.example.otp_backend.repository;

import com.example.otp_backend.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    OtpVerification findByEmail(String email);
}