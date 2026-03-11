package com.prashu23.domitra.repository;

import com.prashu23.domitra.entity.ServiceView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceViewRepository extends JpaRepository<ServiceView, Long> {

    Long countByServiceId(Long serviceId);
}