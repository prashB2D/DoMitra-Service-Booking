package com.prashu23.domitra.service;

import com.prashu23.domitra.repository.ServiceRepository;
import com.prashu23.domitra.repository.ContactClickRepository;
import com.prashu23.domitra.repository.ServiceViewRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDashboardService {

    private final ServiceRepository serviceRepository;
    private final ServiceViewRepository serviceViewRepository;
    private final ContactClickRepository contactClickRepository;

    public UserDashboardService(
            ServiceRepository serviceRepository,
            ServiceViewRepository serviceViewRepository,
            ContactClickRepository contactClickRepository) {

        this.serviceRepository = serviceRepository;
        this.serviceViewRepository = serviceViewRepository;
        this.contactClickRepository = contactClickRepository;
    }

    public List<com.prashu23.domitra.entity.Service> getUserServices(Long userId) {
        return serviceRepository.findAll()
                .stream()
                .filter(s -> s.getUser().getId().equals(userId))
                .toList();
    }

    public Long getViews(Long serviceId) {
        return serviceViewRepository.countByServiceId(serviceId);
    }

    public Long getContacts(Long serviceId) {
        return contactClickRepository.countByServiceId(serviceId);
    }
}