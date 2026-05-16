package vn.edu.nlu.fit.nonglamfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.model.Provider;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        // Lấy email từ Google trả về
        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        // Kiểm tra: Nếu email này chưa có trong DB thì tạo mới
        if (userRepository.findByEmail(email).isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(fullName);
            newUser.setProvider(Provider.GOOGLE); // Đánh dấu nguồn từ Google
            newUser.setRole("ROLE_USER");
            newUser.setPassword(null); // Đăng nhập Google không cần mật khẩu
            userRepository.save(newUser);
        }

        return oAuth2User;
    }
}