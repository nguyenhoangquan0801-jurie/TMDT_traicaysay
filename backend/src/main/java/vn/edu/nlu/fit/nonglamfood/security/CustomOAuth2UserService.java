package vn.edu.nlu.fit.nonglamfood.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.entity.Role;
import vn.edu.nlu.fit.nonglamfood.entity.User;
import vn.edu.nlu.fit.nonglamfood.repository.RoleRepository;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService
        implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request)
            throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate =
                new DefaultOAuth2UserService();

        OAuth2User oauthUser = delegate.loadUser(request);

        String email = oauthUser.getAttribute("email");

        String name = oauthUser.getAttribute("name");

        String avatar = oauthUser.getAttribute("picture");

        if (!userRepository.existsByEmail(email)) {

            Role role = roleRepository
                    .findByRoleName("CUSTOMER")
                    .orElseThrow();

            User user = User.builder()
                    .email(email)
                    .fullName(name)
                    .avatar(avatar)
                    .provider("GOOGLE")
                    .isActive(true)
                    .role(role)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            userRepository.save(user);
        }

        return oauthUser;
    }
}