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
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import vn.edu.nlu.fit.nonglamfood.dto.UpdateProfileRequest;
import vn.edu.nlu.fit.nonglamfood.dto.ChangePasswordRequest;

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

    System.out.println("===== LOGIN CONTROLLER =====");

    try {

        System.out.println("Before Service");

        LoginResponse response = authService.login(request);

        System.out.println("After Service");

        return response;

    } catch (Exception e) {

        e.printStackTrace();

        throw e;
    }
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
    @GetMapping("/profile")
    public ResponseEntity<?> profile(Authentication authentication) {

        String email = authentication.getName();

        UserResponse user = authService.getProfile(email);

        return ResponseEntity.ok(user);
    }
    @PutMapping("/profile")
public ResponseEntity<?> updateProfile(
        Authentication authentication,
        @RequestBody UpdateProfileRequest request
) {

    return ResponseEntity.ok(
            authService.updateProfile(
                    authentication.getName(),
                    request
            )
    );
}
@PutMapping("/change-password")
public ResponseEntity<?> changePassword(
        Authentication authentication,
        @RequestBody ChangePasswordRequest request
){

    authService.changePassword(
            authentication.getName(),
            request
    );

    return ResponseEntity.ok("Đổi mật khẩu thành công");

}
}