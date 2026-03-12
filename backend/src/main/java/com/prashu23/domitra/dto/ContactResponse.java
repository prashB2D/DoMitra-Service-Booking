package com.prashu23.domitra.dto;

public class ContactResponse {

    private String phone;
    private String message;

    public ContactResponse(String phone, String message) {
        this.phone = phone;
        this.message = message;
        System.out.println("✅ ContactResponse created for phone: " + phone);
    }

    // ---- Getters and Setters ----

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}