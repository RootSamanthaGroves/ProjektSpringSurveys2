package com.dominika.controller;

import com.dominika.model.Question;
import com.dominika.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-01-08.
 */
@RestController
@RequestMapping("question")
public class QuestionController {


    @Autowired
    private QuestionRepository questionRepository;


    @GetMapping("all")
    public ResponseEntity<?> getAll() {
        List<Question> questionsList = questionRepository.findAll();
        if (questionsList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(questionsList);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Question> postQuestion(@RequestBody Question question) {
        questionRepository.save(question);
        return ResponseEntity.ok(question);
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Question> deleteQuestion(@PathVariable Optional<Long> id) {

            Question q = questionRepository.findOne(id.get()); //dobre
            if(q!=null){
                questionRepository.removeOne(id.get());
            }
            Optional<Question> opt = Optional.ofNullable(questionRepository.findOne(id.get()));
            if(!opt.isPresent())
                return ResponseEntity.ok(null);
            return ResponseEntity.ok(opt.get());


    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<Question> getDetailsOfQuestion(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Question question = questionRepository.findOne(id.get());
            if (question != null) {
                return new ResponseEntity<Question>(question, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Question>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Question>(HttpStatus.BAD_REQUEST);
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/put/{id}")
    public ResponseEntity<Question> update(@PathVariable long id, @RequestBody Question question) {
        questionRepository.update(Long.valueOf(id), question);
        return new ResponseEntity<Question>(question, new HttpHeaders(), HttpStatus.OK);
    }

}


