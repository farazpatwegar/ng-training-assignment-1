package com.app.entities;



import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String assignedTo;

    @DateTimeFormat(pattern = "yyyy-MM-dd") 
    @NotNull
    private LocalDate date;

    @NotBlank
    private String status;

    @NotBlank
    private String priority;

    @NotBlank
    private String comment;
}
