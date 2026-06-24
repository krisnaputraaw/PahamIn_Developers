package com.intercorp.pahamin.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class EisenhowerTask extends Task {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EisenhowerQuadrant quadrant;

    private LocalDate deadline;

    private boolean done;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private com.intercorp.pahamin.user.User user;

    @Override
    public String determineQuadrant() {
        if (isUrgent() && isImportant()) return EisenhowerQuadrant.DO.name();
        if (!isUrgent() && isImportant()) return EisenhowerQuadrant.DECIDE.name();
        if (isUrgent() && !isImportant()) return EisenhowerQuadrant.DELEGATE.name();
        return EisenhowerQuadrant.DELETE.name();
    }

    public EisenhowerQuadrant getQuadrantEnum() {
        if (isUrgent() && isImportant()) return EisenhowerQuadrant.DO;
        if (!isUrgent() && isImportant()) return EisenhowerQuadrant.DECIDE;
        if (isUrgent() && !isImportant()) return EisenhowerQuadrant.DELEGATE;
        return EisenhowerQuadrant.DELETE;
    }

    @PrePersist
    @Override
    public void prePersist() {
        super.prePersist();
        this.quadrant = getQuadrantEnum();
    }
}