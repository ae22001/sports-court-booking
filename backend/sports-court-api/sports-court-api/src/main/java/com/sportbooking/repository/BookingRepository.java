package com.sportbooking.repository;
import com.sportbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Devuelve todas las reservas de un usuario específico
    List<Booking> findByUserId(Long userId);

    // Devuelve todas las reservas de una cancha específica
    List<Booking> findByCourtId(Long courtId);

    // CONSULTA CRÍTICA: Busca si hay solapamiento de horarios en la misma cancha
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.court.id = :courtId AND " +
           "(:start < b.endTime AND :end > b.startTime)")
    boolean isCourtOverlapping(
        @Param("courtId") Long courtId, 
        @Param("start") LocalDateTime start, 
        @Param("end") LocalDateTime end
    );
}