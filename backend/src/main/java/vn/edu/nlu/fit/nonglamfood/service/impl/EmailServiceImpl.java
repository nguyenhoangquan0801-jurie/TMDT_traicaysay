package vn.edu.nlu.fit.nonglamfood.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("NongLamFood - Mã xác thực");

        message.setText(
            """
            Xin chào!

            Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản NongLamFood.

            ===================================

            Mã OTP của bạn là:

            %s

            ===================================

            OTP chỉ có hiệu lực trong 5 phút.

            Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.

            Trân trọng,
            NongLamFood Team
            """.formatted(otp)
    );

        mailSender.send(message);

    }
}