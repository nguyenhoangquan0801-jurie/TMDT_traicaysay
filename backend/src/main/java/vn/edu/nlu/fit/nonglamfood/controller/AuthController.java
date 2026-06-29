package vn.edu.nlu.fit.nonglamfood.controller;

import vn.edu.nlu.fit.nonglamfood.dto.LoginRequest;
import vn.edu.nlu.fit.nonglamfood.dto.LoginResponse;
import vn.edu.nlu.fit.nonglamfood.dto.RegisterRequest;
import vn.edu.nlu.fit.nonglamfood.dto.UserResponse;
import vn.edu.nlu.fit.nonglamfood.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}