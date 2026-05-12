package com.moedaestudantil.controller;

import com.moedaestudantil.dto.EmpresaParceiraDTO;
import com.moedaestudantil.service.EmpresaParceiraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaParceiraController {

    @Autowired
    private EmpresaParceiraService empresaParceiraService;

    @GetMapping
    public ResponseEntity<List<EmpresaParceiraDTO>> listarTodas() {
        return ResponseEntity.ok(empresaParceiraService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(empresaParceiraService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<EmpresaParceiraDTO> criar(@Valid @RequestBody EmpresaParceiraDTO dto) {
        EmpresaParceiraDTO criada = empresaParceiraService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EmpresaParceiraDTO dto) {
        return ResponseEntity.ok(empresaParceiraService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empresaParceiraService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
