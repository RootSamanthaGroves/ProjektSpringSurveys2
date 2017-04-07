package com.dominika.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Dominika on 2017-01-07.
 */
@Entity
public class SurveyResults {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String idankieta;
    private Date data;
    private String GroupOfRespondents;
    private String question;
    private String userAnswer;



}
