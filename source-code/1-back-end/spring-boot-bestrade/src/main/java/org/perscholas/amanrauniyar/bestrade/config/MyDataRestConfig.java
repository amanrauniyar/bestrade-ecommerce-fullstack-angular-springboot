package org.perscholas.amanrauniyar.bestrade.config;

import org.perscholas.amanrauniyar.bestrade.entity.Product;
import org.perscholas.amanrauniyar.bestrade.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration /* Adding support for the configuration class with annotation, basically allowing it to scan so, Spring
would pick this up. */
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager; // Autowire JPA entity manager

    @Autowired // Optional as in this case, there is only one constructor, but done to be explicit.
    public MyDataRestConfig(EntityManager theEntMgr) {
        entityManager = theEntMgr;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors); /* Generated method
        automatically by using the feature implement methods to configure repository REST configuration.*/

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Disable HTTP methods for ProductRepository: PUT, POST & DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        /* The above block of code will disable the HTTP methods for the Product Repository methods PUT, POST & DELETE.
        So, only GET will work, effectively making this read-only. */

        // Disable HTTP methods for ProductRepositoryCategory: PUT, POST & DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        /* The above block of code will disable the HTTP methods for the Product Repository Category methods PUT, POST &
        DELETE. So, only GET will work, effectively making this read-only. */

        // Call an internal helper method
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // Expose entity ids

        // - Get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - Create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - Get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - Expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}











