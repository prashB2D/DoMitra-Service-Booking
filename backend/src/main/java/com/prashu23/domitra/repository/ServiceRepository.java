package com.prashu23.domitra.repository;

import com.prashu23.domitra.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    Page<Service> findByCityAndCategoryIdAndStatusAndDeletedAtIsNull(
        String city,
        Long categoryId,
        Service.Status status,
        Pageable pageable
    );

    Optional<Service> findByIdAndStatusAndDeletedAtIsNull(
        Long id,
        Service.Status status
    );

    Page<Service> findByCityAndStatusAndDeletedAtIsNull(
        String city,
        Service.Status status,
        Pageable pageable
    );

    Page<Service> findByCategoryIdAndStatusAndDeletedAtIsNull(
        Long categoryId,
        Service.Status status,
        Pageable pageable
    );

    Page<Service> findByStatusAndDeletedAtIsNull(
        Service.Status status,
        Pageable pageable
    );
    Page<Service> findByUserIdAndStatusAndDeletedAtIsNull(
            Long userId,
            Service.Status status,
            Pageable pageable
    );
}