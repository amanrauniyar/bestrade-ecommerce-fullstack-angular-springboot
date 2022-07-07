package org.perscholas.amanrauniyar.bestrade.dao;

import org.perscholas.amanrauniyar.bestrade.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import org.springframework.data.repository.query.Param;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    // Special Finder/Query method for finding states by the country code
    List<State> findByCountryCode(@Param("code") String code); /* To retrieve states for a specific country code very
    useful for the user as they would select the country first and then states as it narrows down. */

}
