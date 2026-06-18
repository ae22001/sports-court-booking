package com.sportbooking.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingDTO {
    private Long userId;
    private Long courtId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}