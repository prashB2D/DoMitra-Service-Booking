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

        List<ServiceImage> images = serviceImageRepository.findByServiceId(service.getId());

        if (!images.isEmpty()) {
            response.setImageUrl(images.get(0).getImageUrl());
        } else {
            // fallback placeholder
            response.setImageUrl("https://via.placeholder.com/400x250?text=No+Image");
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
        response.setPhone(service.getPhone());
        response.setCreatedAt(service.getCreatedAt());

        List<ServiceImage> images = serviceImageRepository.findByServiceId(service.getId());

        List<String> imageUrls;

        if (!images.isEmpty()) {
            imageUrls = images.stream()
                    .map(ServiceImage::getImageUrl)
                    .collect(Collectors.toList());
        } else {
            imageUrls = List.of("https://via.placeholder.com/600x400?text=No+Image");
        }

        response.setImageUrls(imageUrls);

        return response;
    }
}