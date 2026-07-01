package vn.edu.nlu.fit.nonglamfood.service;

import vn.edu.nlu.fit.nonglamfood.dto.*;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    UserResponse getCurrentUser(String email);

    LoginResponse login(LoginRequest request);

    void forgotPassword(String email);

    boolean verifyOtp(String email, String otp);

    void resetPassword(String email, String newPassword);

    UserResponse getProfile(String email);

    UserResponse updateProfile(String email, UpdateProfileRequest request);

    void changePassword(String email, ChangePasswordRequest request);

}