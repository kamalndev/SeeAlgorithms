package com.seealgorithms.backend.registration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;

@Component
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String email) {
        // TODO : Regex to validate email
        return true;
    }
}
