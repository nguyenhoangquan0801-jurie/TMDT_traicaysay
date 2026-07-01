package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String token;

    private String role;

    private String fullName;

    private String email;

}