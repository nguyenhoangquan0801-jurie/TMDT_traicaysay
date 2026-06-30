package vn.edu.nlu.fit.nonglamfood.controller;

import vn.edu.nlu.fit.nonglamfood.dto.LoginRequest;
import vn.edu.nlu.fit.nonglamfood.dto.LoginResponse;
import vn.edu.nlu.fit.nonglamfood.dto.RegisterRequest;
import vn.edu.nlu.fit.nonglamfood.dto.UserResponse;
import vn.edu.nlu.fit.nonglamfood.service.AuthService;
import vn.edu.nlu.fit.nonglamfood.dto.ForgotPasswordRequest;
import vn.edu.nlu.fit.nonglamfood.dto.VerifyOtpRequest;
import vn.edu.nlu.fit.nonglamfood.dto.ResetPasswordRequest;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

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
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request){

        authService.forgotPassword(request.getEmail());

        return "OTP đã được gửi tới email.";

    }
    @PostMapping("/verify-otp")
    public boolean verifyOtp(@RequestBody VerifyOtpRequest request){

        return authService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );

    }
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request){

        authService.resetPassword(
                request.getEmail(),
                request.getNewPassword()
        );

        return "Đổi mật khẩu thành công.";

    }
    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        return authService.getCurrentUser(authentication.getName());
    }
}