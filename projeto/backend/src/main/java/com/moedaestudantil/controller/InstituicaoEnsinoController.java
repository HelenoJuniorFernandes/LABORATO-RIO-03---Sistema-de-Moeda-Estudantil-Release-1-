package com.moedaestudantil.controller;

import com.moedaestudantil.dto.InstituicaoEnsinoDTO;
import com.moedaestudantil.service.InstituicaoEnsinoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instituicoes")
@CrossOrigin(origins = "*")
public class InstituicaoEnsinoController {

    @Autowired
    private InstituicaoEnsinoService instituicaoEnsinoService;

    @GetMapping
    public ResponseEntity<List<InstituicaoEnsinoDTO>> listarTodas() {
        return ResponseEntity.ok(instituicaoEnsinoService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstituicaoEnsinoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoEnsinoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<InstituicaoEnsinoDTO> criar(@Valid @RequestBody InstituicaoEnsinoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(instituicaoEnsinoService.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstituicaoEnsinoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody InstituicaoEnsinoDTO dto) {
        return ResponseEntity.ok(instituicaoEnsinoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        instituicaoEnsinoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
