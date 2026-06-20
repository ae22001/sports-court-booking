package com.sportbooking.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"bookings", "password"}) // Corta el bucle con usuario y protege la clave
    private User user;

    @ManyToOne
    @JoinColumn(name = "court_id", nullable = false)
    @JsonIgnoreProperties("bookings") // Corta el bucle con canchas
    private Court court;
}