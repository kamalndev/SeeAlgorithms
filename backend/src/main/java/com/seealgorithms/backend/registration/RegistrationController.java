package com.seealgorithms.backend.registration;

import com.seealgorithms.backend.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // tells spring this class handles http requests, should return data
@RequestMapping(path = "/api/v1/registration") // sets base URL path for endpoint in this controller class
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;
    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
}
