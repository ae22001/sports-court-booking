package com.sportbooking.service;
import com.sportbooking.dto.BookingDTO;
import com.sportbooking.model.Booking;
import com.sportbooking.model.Court;
import com.sportbooking.model.User;
import com.sportbooking.repository.BookingRepository;
import com.sportbooking.repository.CourtRepository;
import com.sportbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.sportbooking.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking createBooking(BookingDTO dto) {
        // Rule 1: Validar orden cronológico
        if (dto.getEndTime().isBefore(dto.getStartTime()) || dto.getEndTime().isEqual(dto.getStartTime())) {
            throw new IllegalArgumentException("La fecha de fin debe ser posterior a la fecha de inicio.");
        }

        // Rule 2: Verificar existencia de entidades
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getUserId()));
        
        Court court = courtRepository.findById(dto.getCourtId())
                .orElseThrow(() -> new ResourceNotFoundException("Cancha no encontrada con ID: " + dto.getCourtId()));

        // Rule 3: Validar choque de horarios en la base de datos
        boolean isOverlapping = bookingRepository.isCourtOverlapping(dto.getCourtId(), dto.getStartTime(), dto.getEndTime());
        if (isOverlapping) {
            throw new IllegalStateException("La cancha ya se encuentra reservada en el rango de horario seleccionado.");
        }

        // Si pasa todas las reglas, se construye y persiste la reserva
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCourt(court);
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());

        return bookingRepository.save(booking);
    }

    @Transactional
    public void cancelBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se encontró la reserva con ID: " + id);
        }
        bookingRepository.deleteById(id);
    }
}