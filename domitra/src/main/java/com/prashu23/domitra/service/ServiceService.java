package com.prashu23.domitra.service;

import com.prashu23.domitra.entity.Category;
import com.prashu23.domitra.entity.Service;
import com.prashu23.domitra.entity.ServiceView;
import com.prashu23.domitra.entity.User;
import com.prashu23.domitra.repository.CategoryRepository;
import com.prashu23.domitra.repository.ServiceRepository;
import com.prashu23.domitra.repository.ServiceViewRepository;
import com.prashu23.domitra.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;

@org.springframework.stereotype.Service
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
        ImageService imageService
    ) {
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.serviceViewRepository = serviceViewRepository;
        this.imageService = imageService;
        System.out.println("✅ ServiceService bean created");
    }

    // Create a new service listing
    public Service createService(
        String title,
        String description,
        String priceRange,
        String city,
        String state,
        String phone,
        Long categoryId,
        Long userId,
        MultipartFile image
    ) throws IOException {

        // Find user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Find category
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));

        // Upload image to Cloudinary
        String imageUrl = imageService.uploadImage(image);

        // Create service
        Service service = new Service();
        service.setTitle(title);
        service.setSlug(generateSlug(title, city));
        service.setDescription(description);
        service.setPriceRange(priceRange);
        service.setCity(city);
        service.setState(state);
        service.setPhone(phone);
        service.setStatus(Service.Status.ACTIVE);
        service.setUser(user);
        service.setCategory(category);
        service.setCreatedAt(LocalDateTime.now());
        service.setUpdatedAt(LocalDateTime.now());

        Service savedService = serviceRepository.save(service);

        // Save image record
        imageService.saveImageRecord(savedService, imageUrl, 1);

        System.out.println("✅ Service created: " + savedService.getId());
        return savedService;
    }

    // Search services
    public Page<Service> searchServices(String city, Long categoryId, int page, int size) {
        return serviceRepository.findByCityAndCategoryIdAndStatusAndDeletedAtIsNull(
            city,
            categoryId,
            Service.Status.ACTIVE,
            PageRequest.of(page, size)
        );
    }

    // Get service by id — also records a view
    public Service getServiceById(Long id, String viewerIp) {
        Service service = serviceRepository.findByIdAndStatusAndDeletedAtIsNull(id, Service.Status.ACTIVE)
            .orElseThrow(() -> new RuntimeException("Service not found"));

        // Record view
        ServiceView view = new ServiceView();
        view.setService(service);
        view.setViewerIp(viewerIp);
        view.setCreatedAt(LocalDateTime.now());
        serviceViewRepository.save(view);

        System.out.println("✅ View recorded for service: " + id);
        return service;
    }

    // Generate slug from title and city
    private String generateSlug(String title, String city) {
        String raw = title + "-" + city;
        return raw.toLowerCase()
            .replaceAll("[^a-z0-9\\-]", "-")
            .replaceAll("-+", "-");
    }
}