package com.prashu23.domitra.controller;

import com.prashu23.domitra.dto.CreateServiceRequest;
import com.prashu23.domitra.dto.ServiceDetailResponse;
import com.prashu23.domitra.dto.ServiceResponse;
import com.prashu23.domitra.entity.Service;
import com.prashu23.domitra.mapper.ServiceMapper;
import com.prashu23.domitra.service.ServiceService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ServiceController {

    private final ServiceService serviceService;
    private final ServiceMapper serviceMapper;

    public ServiceController(ServiceService serviceService, ServiceMapper serviceMapper) {
        this.serviceService = serviceService;
        this.serviceMapper = serviceMapper;
        System.out.println("✅ ServiceController bean created");
    }

    // POST /services — create new service
    @PostMapping
    public ResponseEntity<ServiceResponse> createService(
        @Valid @ModelAttribute CreateServiceRequest request,
        @RequestParam("image") MultipartFile image
    ) throws IOException {

        Service service = serviceService.createService(
            request.getTitle(),
            request.getDescription(),
            request.getPriceRange(),
            request.getCity(),
            request.getState(),
            request.getPhone(),
            request.getCategoryId(),
            request.getUserId(),
            image
        );

        return ResponseEntity.ok(serviceMapper.toServiceResponse(service));
    }

    // GET /services?city=&category=&page=&size=
    @GetMapping
    public ResponseEntity<Page<ServiceResponse>> searchServices(
        @RequestParam(required = false) String city,
        @RequestParam(required = false) Long category,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Page<Service> services = serviceService.searchServices(city, category, page, size);
        Page<ServiceResponse> response = services.map(serviceMapper::toServiceResponse);
        return ResponseEntity.ok(response);
    }

    // GET /services/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ServiceDetailResponse> getServiceById(
        @PathVariable Long id,
        HttpServletRequest request
    ) {
        String viewerIp = request.getRemoteAddr();
        Service service = serviceService.getServiceById(id, viewerIp);
        return ResponseEntity.ok(serviceMapper.toServiceDetailResponse(service));
    }
}