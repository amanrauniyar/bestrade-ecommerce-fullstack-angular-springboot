package org.perscholas.amanrauniyar.bestrade.controller;

import lombok.SneakyThrows;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import org.perscholas.amanrauniyar.bestrade.entity.User;
import org.perscholas.amanrauniyar.bestrade.service.RegistrationService;

/* Used Rest because I only wanted response in form of JSON or XML but, if had used controller then I had to use another
annotation @ResponseBody. For every method we need response, so Spring Boot gives us @RestController. */
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    /* Once user clicks the submit form in registration, this method should be called to map and save to DB
    that user entered in UI. */
    @SneakyThrows
    @PostMapping("/register-user") // From Angular, we will call this REST body to register the user
    @CrossOrigin("http://localhost:4200")
    public User registerUser(@RequestBody User user){
        String tempEmailId = user.getEmailId();
        if(tempEmailId != null && !"".equals(tempEmailId)){
            User user_obj = service.fetchUserByEmailId(tempEmailId);
            if(user_obj != null) {
                throw new Exception("User with " +tempEmailId+ " already exists." );
            }
        }
        User userObj = null;
        userObj = service.saveUser(user);
        return userObj;
    }

    @PostMapping("/login")
    @CrossOrigin("http://localhost:4200")
    public User loginUser(@RequestBody User user) throws Exception {
        /* If email and id is present in db, then we have to implement the logic to let the user log in and if not then
         throw an exception to user that the login credentials are invalid */
        String tempEmailId = user.getEmailId();
        String tempPass = user.getPassword();
        User userObj = null;
        if(tempEmailId != null && tempPass != null) {
            /* Call one method of our service which will check the combination of conditions (email id & password) to
            find the user */
            userObj = service.fetchUserByEmailIdAndPassword(tempEmailId, tempPass); // To return the user
        }
        if(userObj == null) {
            throw new Exception("User doesn't exists or Bad Credentials" );
        }
        return userObj;
    }

}
