package org.perscholas.amanrauniyar.bestrade.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity // Set up my JPA annotation
@Table(name="product") // Set up my JPA annotation for table to map this argument table product
@Data /* Data annotation from Lombok project to have support of automatically generating the getter/setter methods
behind the scenes to reduce boiler place code */
public class Product {

    public Product(){ // Empty Product constructor to make it the default one for this class.
    /* All persistent classes must have a default constructor so that Hibernate can instantiate them using
    Constructor.newInstance(). It is recommended that you have a default constructor with at least package visibility
    for runtime proxy generation in Hibernate. so you must add a default constructor.*/
    }

    @Id //Add the JPA mappings here between the actual fields and columns.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // This maps over to the database column id.
    private Long id;

    @ManyToOne /* For product category, it is a collection mapped as many-to-one relation using advanced JPA
    relationships. */
    @JoinColumn(name = "category_id", nullable = false) /* Specifying the join column which is category id and that's
    the field defined in this table. */
    private ProductCategory category;
    @Column(name = "sku") // This maps over to the database column sku.
    private String sku;

    @Column(name = "name") // This maps over to the database column name.
    private String name;

    @Column(name = "description") // This maps over to the database column description.
    private String description;

    @Column(name = "unit_price") // This maps over to the database column unit price.
    private BigDecimal unitPrice;

    @Column(name = "image_url") // This maps over to the database column image URL.
    private String imageUrl;

    @Column(name = "active") // This maps over to the database column active.
    private boolean active;

    @Column(name = "units_in_stock") // This maps over to the database column units in stock.
    private int unitsInStock;

    @Column(name = "date_created") // This maps over to the database column date created.
    @CreationTimestamp // Hibernate will automatically create the timestamps.
    private Date dateCreated;

    @Column(name = "last_updated") // This maps over to the database column last updated.
    @UpdateTimestamp // Hibernate will automatically update the timestamps.
    private Date lastUpdated;

}

