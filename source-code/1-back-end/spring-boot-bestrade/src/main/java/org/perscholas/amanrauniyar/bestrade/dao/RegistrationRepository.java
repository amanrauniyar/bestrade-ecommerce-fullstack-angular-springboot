package org.perscholas.amanrauniyar.bestrade.dao;

import org.perscholas.amanrauniyar.bestrade.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource//Giving actual origin or server where the angular application is running on.
// Extended to JPA Repository to use all the basic built-in methods for DB communication to do CRUD operations.
public interface RegistrationRepository extends JpaRepository<User, Integer> {
    public User findByEmailId (String emailId);
    public User findByEmailIdAndPassword (String emailId, String password);
}
