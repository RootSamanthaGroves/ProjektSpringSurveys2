package com.dominika.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Dominika on 2016-12-07.
 */
@Entity
public class Survey {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;

    @ManyToMany
    private List<Question> guestion;

//    @ManyToMany(mappedBy = "user")
//    private List<User> user;

    public Survey() {
    }

    public Survey(String title, List<Question> guestion) {
        this.title = title;
        this.guestion = guestion;

    }

    public Survey(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public List<Question> getGuestion() {
        return guestion;
    }

    public void setGuestion(List<Question> guestion) {
        this.guestion = guestion;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
