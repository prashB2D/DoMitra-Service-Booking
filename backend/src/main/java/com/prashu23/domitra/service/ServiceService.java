package com.prashu23.domitra.service;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.prashu23.domitra.entity.Category;
import com.prashu23.domitra.entity.ServiceView;
import com.prashu23.domitra.entity.User;

import com.prashu23.domitra.repository.CategoryRepository;
import com.prashu23.domitra.repository.ServiceRepository;
import com.prashu23.domitra.repository.ServiceViewRepository;
import com.prashu23.domitra.repository.UserRepository;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ServiceViewRepository serviceViewRepository;
    private final ImageService imageService;

    public ServiceService(
            ServiceRepository serviceRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            ServiceViewRepository serviceViewRepository,
            ImageService imageService) {

        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.serviceViewRepository = serviceViewRepository;
        this.imageService = imageService;

        System.out.println("✅ ServiceService bean created");
    }

    // Create a new service listing
    @Transactional
    public com.prashu23.domitra.entity.Service createService(
            String title,
            String description,
            String priceRange,
            String city,
            String state,
            String phone,
            Long categoryId,
            Long userId,
            MultipartFile image) throws IOException {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find category
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        System.out.println("🔥 Uploading image...");

        // Upload image to Cloudinary
        String imageUrl = imageService.uploadImage(image);

        System.out.println("🔥 Image uploaded: " + imageUrl);

        // Create service entity
        com.prashu23.domitra.entity.Service service = new com.prashu23.domitra.entity.Service();

        service.setTitle(title);
        service.setSlug(generateSlug(title, city));
        service.setDescription(description);
        service.setPriceRange(priceRange);
        service.setCity(city);
        service.setState(state);
        service.setPhone(phone);
        service.setStatus(com.prashu23.domitra.entity.Service.Status.ACTIVE);
        service.setUser(user);
        service.setCategory(category);
        service.setCreatedAt(LocalDateTime.now());
        service.setUpdatedAt(LocalDateTime.now());

        // Save service
        com.prashu23.domitra.entity.Service savedService = serviceRepository.save(service);

        System.out.println("🔥 Service saved with ID: " + savedService.getId());

        // Save image record
        imageService.saveImageRecord(savedService, imageUrl, 1);

        System.out.println("🔥 Image record saved!");

        return savedService;
    }

    // Search services
    public Page<com.prashu23.domitra.entity.Service> searchServices(String city, Long categoryId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        if (city != null && categoryId != null) {
            return serviceRepository.findByCityAndCategoryIdAndStatusAndDeletedAtIsNull(
                    city,
                    categoryId,
                    com.prashu23.domitra.entity.Service.Status.ACTIVE,
                    pageable
            );
        }

        if (city != null) {
            return serviceRepository.findByCityAndStatusAndDeletedAtIsNull(
                    city,
                    com.prashu23.domitra.entity.Service.Status.ACTIVE,
                    pageable
            );
        }

        if (categoryId != null) {
            return serviceRepository.findByCategoryIdAndStatusAndDeletedAtIsNull(
                    categoryId,
                    com.prashu23.domitra.entity.Service.Status.ACTIVE,
                    pageable
            );
        }

        return serviceRepository.findByStatusAndDeletedAtIsNull(
                com.prashu23.domitra.entity.Service.Status.ACTIVE,
                pageable
        );
    }

    // Get service by id — record view
    public com.prashu23.domitra.entity.Service getServiceById(Long id, String viewerIp) {

        com.prashu23.domitra.entity.Service service = serviceRepository
                .findByIdAndStatusAndDeletedAtIsNull(id, com.prashu23.domitra.entity.Service.Status.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        ServiceView view = new ServiceView();
        view.setService(service);
        view.setViewerIp(viewerIp);
        view.setCreatedAt(LocalDateTime.now());

        serviceViewRepository.save(view);

        System.out.println("✅ View recorded for service: " + id);

        return service;
    }

    // Generate slug
    private String generateSlug(String title, String city) {

        String raw = title + "-" + city;

        return raw
                .toLowerCase()
                .replaceAll("[^a-z0-9\\-]", "-")
                .replaceAll("-+", "-");
    }
}