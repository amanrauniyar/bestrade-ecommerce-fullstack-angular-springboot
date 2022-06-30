package org.perscholas.amanrauniyar.bestrade.dao;

import org.perscholas.amanrauniyar.bestrade.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> { /* To make use of Spring Data JPA so, I extend the
JpaRepository, and then we specify entity type (Product) and also primary key type (Long).*/

}