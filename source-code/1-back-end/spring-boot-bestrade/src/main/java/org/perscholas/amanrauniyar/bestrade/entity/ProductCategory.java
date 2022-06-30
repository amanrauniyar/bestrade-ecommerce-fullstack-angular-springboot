package org.perscholas.amanrauniyar.bestrade.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="product_category")
/* @Data has know bug with Lombok so, I am using getter and setter annotation below which is a workaround for it to
automatically generate getter and setter by Lombok. */
@Getter
@Setter
public class ProductCategory {

    public ProductCategory(){ // Empty ProductCategory constructor to make it the default one for this class.
    /* All persistent classes must have a default constructor so that Hibernate can instantiate them using
    Constructor.newInstance(). It is recommended that you have a default constructor with at least package visibility
    for runtime proxy generation in Hibernate. so you must add a default constructor.*/
    }

    @Id //Add the JPA mappings here between the actual fields and columns.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // This maps over to the database column id.
    private Long id;

    @Column(name = "category_name") // This maps over to the database category name.
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") /* For products, it is a collection mapped as
    one-to-many relation, using advanced JPA relationships, and it is cascaded by category. */
    private Set<Product> products;


}
