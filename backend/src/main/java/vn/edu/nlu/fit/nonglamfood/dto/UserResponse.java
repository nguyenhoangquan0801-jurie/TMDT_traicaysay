package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Integer userId;

    private String fullName;

    private String email;

    private String phone;

    private String avatar;

    private String role;

}