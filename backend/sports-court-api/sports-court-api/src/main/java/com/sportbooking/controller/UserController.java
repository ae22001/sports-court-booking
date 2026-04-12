package com.sportbooking.controller;

import com.sportbooking.model.User;
import com.sportbooking.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Usuarios", description = "Operaciones para gestionar los usuarios del sistema")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Listar todos los usuarios", description = "Retorna una lista de clientes y administradores")
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Operation(summary = "Crear un nuevo usuario", description = "Registra un usuario en la base de datos")
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
