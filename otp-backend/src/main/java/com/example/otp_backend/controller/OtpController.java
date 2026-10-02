package com.example.otp_backend.controller;

import com.example.otp_backend.dto.OtpSendRequest;
import com.example.otp_backend.dto.OtpVerifyRequest;
import com.example.otp_backend.dto.SendResultRequest;
import com.example.otp_backend.service.OtpService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send")
    public String sendOtp(@RequestBody OtpSendRequest request) {

        String email = request.getEmail();

        String otp = otpService.generateOtp(email);

        return "OTP generated";
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestBody OtpVerifyRequest request) {

        String email = request.getEmail();
        String otp = request.getOtp();

        boolean verified = otpService.verifyOtp(email, otp);

        if (verified) {
            return "OTP verified successfully";
        }

        return "Invalid OTP";
    }

    @PostMapping("/send-result")
    public String sendResult(@RequestBody SendResultRequest request) {

        String email = request.getEmail();
        String result = request.getResult();

        otpService.sendResult(email, result);

        return "Result email sent successfully";
    }
}
