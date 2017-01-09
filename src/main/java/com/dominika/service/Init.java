package com.dominika.service;


import com.dominika.model.Role;
import com.dominika.model.User;
import com.dominika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


@Component
public class  Init {

    @Autowired
    UserRepository userRepository;

    @PostConstruct
    public void init() {
        User user1 = userRepository.findOneByEmail("user@o2.pl");
        User admin = userRepository.findOneByEmail("admin@o2.pl");
        User manager = userRepository.findOneByEmail("manager@o2.pl");
        if (user1 == null) {
            User user = new User();
            user.setEmail("user@o2.pl");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("user"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }
        if (admin == null) {
            User user = new User();
            user.setEmail("admin@o2.pl");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("admin"));
            user.setRole(Role.ROLE_ADMIN);
            userRepository.save(user);
        }
        if (manager == null) {
            User user = new User();
            user.setEmail("manager@o2.pl");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("manager"));
            user.setRole(Role.ROLE_MANAGER);
            userRepository.save(user);
        }
    }
}