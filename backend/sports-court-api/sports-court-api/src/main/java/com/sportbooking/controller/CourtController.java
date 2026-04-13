package com.sportbooking.controller;

import com.sportbooking.dto.CourtDTO;
import com.sportbooking.model.Court;
import com.sportbooking.service.CourtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courts")
@Tag(name = "Canchas", description = "Operaciones CRUD para la gestión de infraestructura deportiva")
public class CourtController {

    @Autowired
    private CourtService courtService;

    @Operation(summary = "Listar canchas")
    @GetMapping
    public ResponseEntity<List<Court>> getAll() {
        return ResponseEntity.ok(courtService.findAll());
    }

    @Operation(summary = "Crear cancha")
    @PostMapping
    public ResponseEntity<Court> create(@RequestBody CourtDTO courtDTO) {
        Court savedCourt = courtService.saveCourt(courtDTO);
        return new ResponseEntity<>(savedCourt, HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar cancha")
    @PutMapping("/{id}")
    public ResponseEntity<Court> update(@PathVariable Long id, @RequestBody CourtDTO courtDTO) {
        return ResponseEntity.ok(courtService.updateCourt(id, courtDTO));
    }

    @Operation(summary = "Eliminar cancha")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        courtService.deleteCourt(id);
        return ResponseEntity.noContent().build();
    }
}