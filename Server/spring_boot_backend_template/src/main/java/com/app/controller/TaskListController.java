package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Task;
import com.app.service.TaskListService;

import custom_exception.CustomException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/task")
public class TaskListController {
	@Autowired
	private TaskListService service;
	private Task add;

	@GetMapping("/GettAll")
	public ResponseEntity<?> GetAll() {
		List<Task> tasks = service.get();

		return new ResponseEntity<>(tasks, HttpStatus.OK);

	}

	@PostMapping("/AddNewtask")
	public ResponseEntity<?> AddNewtask(@RequestBody Task task) {

		Task  add = service.add(task);
		return new ResponseEntity<>(add, HttpStatus.CREATED);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> DeleteBYId(@PathVariable int id) {

		service.delete(id);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);

	}

	@PutMapping
	public ResponseEntity<?> Updatetaskway(@RequestBody Task task) {
		service.update(task);
		return new ResponseEntity<>(task, HttpStatus.OK);

	}

}
