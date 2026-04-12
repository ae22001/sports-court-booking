package com.sportbooking.service;
import com.sportbooking.dto.CourtDTO;
import com.sportbooking.model.Court;
import com.sportbooking.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    public List<Court> findAll() {
        return courtRepository.findAll();
    }

    public Court saveCourt(CourtDTO courtDTO) {
        Court court = new Court();
        return mapDtoToEntity(courtDTO, court);
    }

    // Lógica para actualizar (PUT)
    public Court updateCourt(Long id, CourtDTO courtDTO) {
        Court court = courtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cancha no encontrada"));

        return mapDtoToEntity(courtDTO, court);
    }

    public void deleteCourt(Long id) {
        courtRepository.deleteById(id);
    }

    // Método privado para reutilizar el mapeo (Fase B)
    private Court mapDtoToEntity(CourtDTO dto, Court entity) {
        entity.setName(dto.getName());
        entity.setType(dto.getType());
        entity.setPricePerHour(dto.getPricePerHour());
        entity.setIsAvailable(true);
        return courtRepository.save(entity);
    }
}