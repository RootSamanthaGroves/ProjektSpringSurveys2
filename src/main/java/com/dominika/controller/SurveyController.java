package com.dominika.controller;

import com.dominika.model.Survey;
import com.dominika.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Dominika on 2017-01-07.
 */


    @RestController
    @RequestMapping("survey")

    public class SurveyController {

        @Autowired
        private SurveyRepository surveyRepository;


        @GetMapping("all")
        //ta metoda nie moze byc prywatna bo wtedy @Preatuhroize nie dziala
        public ResponseEntity<?> getAll() {
            List<Survey> surveysList = surveyRepository.findAll();
            if (surveysList.isEmpty())
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            return ResponseEntity.ok(surveysList);
        }


//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
//    @PostMapping("/add")
//    public ResponseEntity<Survey> postSurvey(@RequestBody Survey survey) {
//        surveyRepository.save(survey);
//        if (survey.getId() != 0)
//            return ResponseEntity.ok(survey);
//        return new ResponseEntity(HttpStatus.BAD_REQUEST);
//    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Survey> postSurvey(@RequestBody Survey survey) {
        surveyRepository.save(survey);
        return ResponseEntity.ok(survey);
    }


}
