package com.prashu23.domitra.service;

import com.prashu23.domitra.entity.Category;
import com.prashu23.domitra.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        System.out.println("✅ CategoryService bean created");
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}