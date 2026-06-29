package vn.edu.nlu.fit.nonglamfood.service;

import vn.edu.nlu.fit.nonglamfood.dto.*;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void forgotPassword(String email);

    boolean verifyOtp(String email, String otp);

    void resetPassword(String email, String newPassword);

}