package com.sportbooking.dto;
import lombok.Data;

@Data
public class CourtDTO {
    private String name;
    private String type;
    private Double pricePerHour;
    // No incluimos el ID ni el estado interno si no es necesario para la vista
}