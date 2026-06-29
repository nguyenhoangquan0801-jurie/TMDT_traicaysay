package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OtpData {

    private String otp;

    private LocalDateTime expiredAt;

}