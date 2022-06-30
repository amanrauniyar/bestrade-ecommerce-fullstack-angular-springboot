package org.perscholas.amanrauniyar.bestrade.dao;

import org.perscholas.amanrauniyar.bestrade.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category") /* Provide  the name for
the collection resource relationship and also specify the path because I don't want to take the defaults as it won't
work for my project. The name of JSON entry is (productCategory), and the path will be (/product-category). Normally it
would to make things plural by simply adding (s) onto it, and I don't want that and want to use simple reference. */
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> { /* To make use of Spring Data
JPA so, I extend the JpaRepository, and then we specify entity type (ProductCategory)
and also primary key type (Long). */
}
