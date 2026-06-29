package vn.edu.nlu.fit.nonglamfood.service.impl;

import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.dto.OtpData;
import vn.edu.nlu.fit.nonglamfood.service.OtpService;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();

    @Override
    public String generateOtp(String email) {

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        otpStorage.put(
                email,
                new OtpData(
                        otp,
                        LocalDateTime.now().plusMinutes(5)
                )
        );

        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {

        OtpData data = otpStorage.get(email);

        if (data == null)
            return false;

        if (LocalDateTime.now().isAfter(data.getExpiredAt())) {

            otpStorage.remove(email);

            return false;
        }

        if (!data.getOtp().equals(otp))
            return false;

        otpStorage.remove(email);

        return true;
    }

}