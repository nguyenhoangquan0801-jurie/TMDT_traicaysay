package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {

    private String oldPassword;

    private String newPassword;
}