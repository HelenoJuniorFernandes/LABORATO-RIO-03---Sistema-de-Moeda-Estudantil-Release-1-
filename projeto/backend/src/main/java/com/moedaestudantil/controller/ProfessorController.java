package com.moedaestudantil.controller;

import com.moedaestudantil.dto.ProfessorDTO;
import com.moedaestudantil.service.ProfessorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ProfessorDTO dto) {
        return ResponseEntity.ok(professorService.atualizar(id, dto));
    }
}
