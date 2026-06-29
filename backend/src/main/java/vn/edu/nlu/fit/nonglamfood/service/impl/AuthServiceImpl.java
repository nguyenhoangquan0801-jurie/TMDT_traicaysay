package vn.edu.nlu.fit.nonglamfood.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.dto.*;
import vn.edu.nlu.fit.nonglamfood.entity.Role;
import vn.edu.nlu.fit.nonglamfood.entity.User;
import vn.edu.nlu.fit.nonglamfood.repository.RoleRepository;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;
import vn.edu.nlu.fit.nonglamfood.security.JwtUtil;
import vn.edu.nlu.fit.nonglamfood.service.AuthService;
import vn.edu.nlu.fit.nonglamfood.service.EmailService;
import vn.edu.nlu.fit.nonglamfood.service.OtpService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final OtpService otpService;

    @Override
    public UserResponse register(RegisterRequest request) {

        System.out.println("===== REGISTER =====");
        System.out.println(request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại.");
        }

        Role role = roleRepository.findByRoleName("CUSTOMER")
            .orElseThrow(() -> new RuntimeException("Không tìm thấy role CUSTOMER"));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .provider("LOCAL")
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .role(role)
                .build();

        user = userRepository.save(user);

        System.out.println("Saved ID = " + user.getUserId());

        return UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .build();
    }
    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không đúng."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Email hoặc mật khẩu không đúng.");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().getRoleName())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
    }
    @Override
    public void forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại."));

        String otp = otpService.generateOtp(email);

        emailService.sendOtp(email, otp);

    }
    @Override
    public boolean verifyOtp(String email, String otp) {

        return otpService.verifyOtp(email, otp);

    }
    @Override
    public void resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản."));

        user.setPasswordHash(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

    }
}