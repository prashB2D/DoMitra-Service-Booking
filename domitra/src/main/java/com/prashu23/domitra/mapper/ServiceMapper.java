package com.prashu23.domitra.mapper;

import com.prashu23.domitra.dto.ServiceDetailResponse;
import com.prashu23.domitra.dto.ServiceResponse;
import com.prashu23.domitra.entity.Service;
import com.prashu23.domitra.entity.ServiceImage;
import com.prashu23.domitra.repository.ServiceImageRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ServiceMapper {

    private final ServiceImageRepository serviceImageRepository;

    public ServiceMapper(ServiceImageRepository serviceImageRepository) {
        this.serviceImageRepository = serviceImageRepository;
        System.out.println("✅ ServiceMapper bean created");
    }

    // Map Service entity → ServiceResponse (for search results list)
    public ServiceResponse toServiceResponse(Service service) {
        ServiceResponse response = new ServiceResponse();
        response.setId(service.getId());
        response.setTitle(service.getTitle());
        response.setCity(service.getCity());
        response.setState(service.getState());
        response.setPriceRange(service.getPriceRange());
        response.setCategoryName(service.getCategory().getName());

        // Get first image
        List<ServiceImage> images = serviceImageRepository.findByServiceId(service.getId());
        if (!images.isEmpty()) {
            response.setImageUrl(images.get(0).getImageUrl());
        }

        return response;
    }

    // Map Service entity → ServiceDetailResponse (for detail page)
    public ServiceDetailResponse toServiceDetailResponse(Service service) {
        ServiceDetailResponse response = new ServiceDetailResponse();
        response.setId(service.getId());
        response.setTitle(service.getTitle());
        response.setDescription(service.getDescription());
        response.setPriceRange(service.getPriceRange());
        response.setCity(service.getCity());
        response.setState(service.getState());
        response.setCategoryName(service.getCategory().getName());
        response.setOwnerName(service.getUser().getName());
        response.setCreatedAt(service.getCreatedAt());

        // Get all image URLs
        List<ServiceImage> images = serviceImageRepository.findByServiceId(service.getId());
        List<String> imageUrls = images.stream()
            .map(ServiceImage::getImageUrl)
            .collect(Collectors.toList());
        response.setImageUrls(imageUrls);

        return response;
    }
}