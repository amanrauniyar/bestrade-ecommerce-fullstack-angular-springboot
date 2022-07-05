package org.perscholas.amanrauniyar.bestrade.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "state")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    // Set up many-to-one because many states belongs to one country
    @ManyToOne
    /* Join on country_id in the state table so country id maps back to actual country table as a foreign key
    relationship. */
    @JoinColumn(name = "country_id")
    private Country country;

}
