package org.perscholas.amanrauniyar.bestrade.service;

import org.perscholas.amanrauniyar.bestrade.dao.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.perscholas.amanrauniyar.bestrade.entity.User;

@Service
public class RegistrationService {

    @Autowired
    // Injected the repository by creating an object of RegistrationRepository using the instance repo.
    private RegistrationRepository repo;

    public User saveUser(User user){
        return repo.save(user);
    }

    // Created method to call repository method findByEmailId by changing in-built method findById with help of JPA
    public User fetchUserByEmailId(String email) {
        return repo.findByEmailId(email);
    }

    public User fetchUserByEmailIdAndPassword(String email, String password) {
        return repo.findByEmailIdAndPassword(email, password); // No built-in query to find email and password so, return our own method.
    }

}




