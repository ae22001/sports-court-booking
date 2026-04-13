package com.sportbooking.service;

import com.sportbooking.dto.CourtDTO;
import com.sportbooking.model.Court;
import com.sportbooking.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    @Transactional(readOnly = true)
    public List<Court> findAll() {
        return courtRepository.findAll();
    }

    @Transactional
    public Court saveCourt(CourtDTO courtDTO) {
        Court court = new Court();
        return mapDtoToEntity(courtDTO, court);
    }

    @Transactional
    public Court updateCourt(Long id, CourtDTO courtDTO) {
        Court court = courtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cancha no encontrada con ID: " + id));
        return mapDtoToEntity(courtDTO, court);
    }

    @Transactional
    public void deleteCourt(Long id) {
        if (!courtRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: Cancha no encontrada");
        }
        courtRepository.deleteById(id);
    }

    private Court mapDtoToEntity(CourtDTO dto, Court entity) {
        entity.setName(dto.getName());
        entity.setType(dto.getType());
        entity.setPricePerHour(dto.getPricePerHour());
        entity.setIsAvailable(true); // Valor por defecto para nuevas o actualizadas
        return courtRepository.saveAndFlush(entity);
    }
}