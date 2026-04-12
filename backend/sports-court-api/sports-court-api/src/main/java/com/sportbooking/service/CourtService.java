package com.sportbooking.service;

import com.sportbooking.dto.CourtDTO;
import com.sportbooking.model.Court;
import com.sportbooking.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    // MAPEO: De DTO a Entidad (Para recibir y guardar)
    public Court saveCourt(CourtDTO courtDTO) {
        Court court = new Court();
        court.setName(courtDTO.getName());
        court.setType(courtDTO.getType());
        court.setPricePerHour(courtDTO.getPricePerHour());
        court.setIsAvailable(true); // Valor por defecto por lógica de negocio

        return courtRepository.save(court);
    }

    // MAPEO: De Entidad a DTO (Para enviar al cliente)
    public CourtDTO getCourtById(Long id) {
        Court court = courtRepository.findById(id).orElseThrow();

        CourtDTO dto = new CourtDTO();
        dto.setName(court.getName());
        dto.setType(court.getType());
        dto.setPricePerHour(court.getPricePerHour());

        return dto;
    }
}