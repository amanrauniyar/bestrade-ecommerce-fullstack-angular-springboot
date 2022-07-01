package org.perscholas.amanrauniyar.bestrade.dao;

import org.perscholas.amanrauniyar.bestrade.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") //Giving actual origin or server where the angular application is running on.
public interface ProductRepository extends JpaRepository<Product, Long> { /* To make use of Spring Data JPA so, I
extend the JpaRepository, and then we specify entity type (Product) and also primary key type (Long).*/

}