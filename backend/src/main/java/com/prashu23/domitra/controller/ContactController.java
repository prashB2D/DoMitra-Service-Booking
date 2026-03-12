package com.prashu23.domitra.controller;

import com.prashu23.domitra.dto.ContactResponse;
import com.prashu23.domitra.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
        System.out.println("✅ ContactController bean created");
    }

    // POST /services/{id}/contact
    @PostMapping("/{id}/contact")
    public ResponseEntity<ContactResponse> revealContact(
        @PathVariable Long id,
        HttpServletRequest request
    ) {
        String viewerIp = request.getRemoteAddr();
        String phone = contactService.revealContact(id, viewerIp);
        return ResponseEntity.ok(new ContactResponse(phone, "Contact revealed successfully"));
    }
}