package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;

@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner testPassword() {
        return args -> {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            System.out.println("==============================");
            System.out.println("admin123 = " + encoder.encode("admin123"));
            System.out.println("123456   = " + encoder.encode("123456"));
            System.out.println("==============================");

        };
    }

}