package com.prashu23.domitra.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation errors (@NotBlank, @NotNull)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
        MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        System.out.println("❌ Validation error: " + errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    // Handle runtime errors (service not found, user not found etc)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(
        RuntimeException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        System.out.println("❌ Runtime error: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // Handle all other unexpected errors - UPDATED to ignore static resource errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        
        // Ignore browser requests for static resources
        if (ex.getMessage() != null && 
            (ex.getMessage().contains("No static resource") || 
             ex.getMessage().contains("favicon.ico"))) {
            return ResponseEntity.notFound().build();
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Something went wrong");
        
        System.out.println("❌ Unexpected error: " + ex.getMessage());
        ex.printStackTrace(); // This helps with debugging
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}