package com.example.otp_backend.dto;

public class SendResultRequest {

    private String email;
    private String result;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}