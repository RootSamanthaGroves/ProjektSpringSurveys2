package com.dominika.controller;

import com.dominika.model.Answer;
import com.dominika.model.Question;
import com.dominika.repository.AnswerRepository;
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
 * Created by Dominika on 2017-03-07.
 */

@RestController
@RequestMapping("answer")
public class AnswerController {



        @Autowired
        private AnswerRepository answerRepository;


        @GetMapping("all")
        public ResponseEntity<?> getAll() {
            List<Answer> answersList = answerRepository.findAll();
            if (answersList.isEmpty())
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            return ResponseEntity.ok(answersList);
        }

        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
        @PostMapping("/add")
        public ResponseEntity<Answer> postQuestion(@RequestBody Answer answer) {
            answerRepository.save(answer);
            return ResponseEntity.ok(answer);
        }


        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
        @DeleteMapping("delete/id/{id}")
        public ResponseEntity<Question> deleteQuestion(@PathVariable Optional<Long> id) {
            if (!id.equals(null)) {
                Answer a = answerRepository.findOne(id.get());
                answerRepository.removeOne(id.get());
                if (a!= null) {
                    return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
                } else {
                    return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

            }
        }


        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
        @RequestMapping(value = "/id/{id}")
        public ResponseEntity<Answer> getDetailsOfQuestion(@PathVariable Optional<Long> id) {
            if (id.isPresent()) {
               Answer answer = answerRepository.findOne(id.get());
                if (answer != null) {
                    return new ResponseEntity<Answer>(answer, new HttpHeaders(), HttpStatus.OK);
                } else {
                    return new ResponseEntity<Answer>(HttpStatus.NOT_FOUND);
                }
            }
            return new ResponseEntity<Answer>(HttpStatus.BAD_REQUEST);
        }


        @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
        @PostMapping("/put/{id}")
        public ResponseEntity<Answer> update(@PathVariable long id, @RequestBody Answer answer) {
           answerRepository.update(id, answer);
            return new ResponseEntity<Answer>(answer, new HttpHeaders(), HttpStatus.OK);
        }

    }

