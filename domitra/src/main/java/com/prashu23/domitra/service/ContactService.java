package com.prashu23.domitra.service;

import com.prashu23.domitra.entity.ContactClick;
import com.prashu23.domitra.entity.Service;
import com.prashu23.domitra.repository.ContactClickRepository;
import com.prashu23.domitra.repository.ServiceRepository;
import java.time.LocalDateTime;

@org.springframework.stereotype.Service
public class ContactService {

    private final ServiceRepository serviceRepository;
    private final ContactClickRepository contactClickRepository;

    public ContactService(
        ServiceRepository serviceRepository,
        ContactClickRepository contactClickRepository
    ) {
        this.serviceRepository = serviceRepository;
        this.contactClickRepository = contactClickRepository;
        System.out.println("✅ ContactService bean created");
    }

    public String revealContact(Long serviceId, String viewerIp) {

        // Find service
        Service service = serviceRepository.findByIdAndStatusAndDeletedAtIsNull(serviceId, Service.Status.ACTIVE)
            .orElseThrow(() -> new RuntimeException("Service not found"));

        // Record contact click
        ContactClick click = new ContactClick();
        click.setService(service);
        click.setViewerIp(viewerIp);
        click.setCreatedAt(LocalDateTime.now());
        contactClickRepository.save(click);

        System.out.println("✅ Contact click recorded for service: " + serviceId);

        // Return phone number
        return service.getPhone();
    }
}