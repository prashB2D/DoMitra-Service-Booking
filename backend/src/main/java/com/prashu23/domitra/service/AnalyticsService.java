package com.prashu23.domitra.service;

import com.prashu23.domitra.repository.ContactClickRepository;
import com.prashu23.domitra.repository.ServiceViewRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final ServiceViewRepository serviceViewRepository;
    private final ContactClickRepository contactClickRepository;

    public AnalyticsService(
        ServiceViewRepository serviceViewRepository,
        ContactClickRepository contactClickRepository
    ) {
        this.serviceViewRepository = serviceViewRepository;
        this.contactClickRepository = contactClickRepository;
        System.out.println("✅ AnalyticsService bean created");
    }

    public Long getViewCount(Long serviceId) {
        return serviceViewRepository.countByServiceId(serviceId);
    }

    public Long getContactClickCount(Long serviceId) {
        return contactClickRepository.countByServiceId(serviceId);
    }
}
