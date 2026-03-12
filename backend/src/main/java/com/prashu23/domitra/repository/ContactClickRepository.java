package com.prashu23.domitra.repository;

import com.prashu23.domitra.entity.ContactClick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactClickRepository extends JpaRepository<ContactClick, Long> {

    Long countByServiceId(Long serviceId);
}