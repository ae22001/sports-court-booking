package com.sportbooking.controller;
import com.sportbooking.dto.CourtDTO;
import com.sportbooking.model.Court;
import com.sportbooking.service.CourtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courts")
@Tag(name = "Canchas", description = "Operaciones CRUD para la gestión de infraestructura deportiva")
public class CourtController {

    @Autowired
    private CourtService courtService;

    @Operation(summary = "Listar canchas", description = "Retorna todas las canchas registradas en el sistema.")
    @GetMapping
    public List<Court> getAll() {
        // Implementación...
        return courtService.findAll();
    }

    @Operation(summary = "Crear cancha", description = "Registra una nueva cancha recibiendo un DTO.")
    @PostMapping
    public ResponseEntity<Court> create(@RequestBody CourtDTO courtDTO) {
        return ResponseEntity.ok(courtService.saveCourt(courtDTO));
    }

    @Operation(summary = "Actualizar cancha", description = "Modifica los datos de una cancha existente mediante su ID.")
    @PutMapping("/{id}")
    public ResponseEntity<Court> update(@PathVariable Long id, @RequestBody CourtDTO courtDTO) {
        return ResponseEntity.ok(courtService.updateCourt(id, courtDTO));
    }

    @Operation(summary = "Eliminar cancha", description = "Borra físicamente el registro de una cancha de la base de datos.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        courtService.deleteCourt(id);
        return ResponseEntity.noContent().build();
    }
}