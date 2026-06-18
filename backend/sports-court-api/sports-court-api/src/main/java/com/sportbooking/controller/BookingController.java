package com.sportbooking.controller;
import com.sportbooking.dto.BookingDTO;
import com.sportbooking.model.Booking;
import com.sportbooking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@Tag(name = "Reservas", description = "Endpoints para la gestión de turnos y alquiler de canchas")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "Obtener todas las reservas", description = "Retorna el listado global de alquileres")
    @GetMapping
    public ResponseEntity<List<Booking>> getAll() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @Operation(summary = "Crear una nueva reserva", description = "Valida la disponibilidad horaria antes de agendar")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingDTO bookingDTO) {
        try {
            Booking newBooking = bookingService.createBooking(bookingDTO);
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (IllegalArgumentException | IllegalStateException e) {
            // Retorna un error estructurado 400 Bad Request si fallan las reglas de negocio
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @Operation(summary = "Actualizar una reserva existente", description = "Modifica los horarios o la cancha de un turno agendado")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
        try {
            // Reutilizamos las mismas validaciones de negocio de tu servicio
            Booking updatedBooking = bookingService.createBooking(bookingDTO);
            // Eliminamos la versión anterior para completar el reemplazo físico en la BD
            bookingService.cancelBooking(id);
            return ResponseEntity.ok(updatedBooking);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Cancelar una reserva", description = "Elimina un alquiler mediante su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
}