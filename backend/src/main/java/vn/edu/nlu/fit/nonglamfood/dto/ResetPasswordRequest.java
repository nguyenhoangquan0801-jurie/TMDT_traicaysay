package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {

    private String email;

    private String newPassword;

}