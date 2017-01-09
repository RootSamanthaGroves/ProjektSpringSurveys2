package com.dominika.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Dominika on 2017-01-07.
 */
@Entity
public class SurveyResults {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String ankieta;
    private String question;
    private String userResponse;


}
