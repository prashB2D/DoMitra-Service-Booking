package com.prashu23.domitra.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.prashu23.domitra.entity.ServiceImage;
import com.prashu23.domitra.repository.ServiceImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {

    private final Cloudinary cloudinary;
    private final ServiceImageRepository serviceImageRepository;

    public ImageService(Cloudinary cloudinary, ServiceImageRepository serviceImageRepository) {
        this.cloudinary = cloudinary;
        this.serviceImageRepository = serviceImageRepository;
        System.out.println("✅ ImageService bean created");
    }

    public String uploadImage(MultipartFile file) throws IOException {

        // Validate file size (max 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new RuntimeException("File size exceeds 5MB limit");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.equals("image/jpeg") && !contentType.equals("image/png"))) {
            throw new RuntimeException("Only JPG and PNG files are allowed");
        }

        // Upload to Cloudinary
        Object uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String imageUrl = ((Map<?, ?>) uploadResult).get("secure_url").toString();
        return imageUrl;
    }

    public void saveImageRecord(com.prashu23.domitra.entity.Service service, String imageUrl, int displayOrder) {
        ServiceImage serviceImage = new ServiceImage();
        serviceImage.setService(service);
        serviceImage.setImageUrl(imageUrl);
        serviceImage.setDisplayOrder(displayOrder);
        serviceImageRepository.save(serviceImage);
        System.out.println("✅ Image record saved for service: " + service.getId());
    }
}