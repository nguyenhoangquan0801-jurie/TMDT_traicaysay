package vn.edu.nlu.fit.nonglamfood.service;

public interface OtpService {

    String generateOtp(String email);

    boolean verifyOtp(String email,String otp);

}