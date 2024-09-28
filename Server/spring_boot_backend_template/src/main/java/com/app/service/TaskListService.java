package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Task;
import com.app.repository.TaskListRepository;

import custom_exception.CustomException;

@Service
@Transactional
public class TaskListService {
	@Autowired
	private TaskListRepository repo;

	public List<Task> get() {
		return repo.findAll();
	}

	public Task add(Task task) {
//		if (task.getDate().isBefore(task.getEnd_Time())) {
		return repo.save(task);
//		}

//		throw new CustomException("time cannot be after current time");

	}

	public Task delete(int id) {
		Optional<Task> task = repo.findById(id);
		if (task.isPresent()) {
			repo.deleteById(id);
			return task.get();
		}
		throw new CustomException("Invalied id");
	}

	public void update(Task task) {
		Optional<Task> r = repo.findById(task.getId());
		if (r.isPresent()) {
			repo.save(task);
			return;
		} else {
			throw new CustomException("invalied id");
		}

	}

}
