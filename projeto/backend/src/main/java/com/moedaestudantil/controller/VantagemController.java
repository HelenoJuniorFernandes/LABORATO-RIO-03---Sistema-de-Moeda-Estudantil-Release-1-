package com.moedaestudantil.controller;

import com.moedaestudantil.dto.VantagemDTO;
import com.moedaestudantil.model.Usuario;
import com.moedaestudantil.service.VantagemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
public class VantagemController {

    @Autowired
    private VantagemService vantagemService;

    @PostMapping
    public ResponseEntity<VantagemDTO> criarVantagem(@Valid @RequestBody VantagemDTO dto, Authentication authentication) {
        Usuario empresa = (Usuario) authentication.getPrincipal();
        VantagemDTO vantagem = vantagemService.criarVantagem(empresa.getId(), dto);
        return new ResponseEntity<>(vantagem, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<VantagemDTO>> listarTodas() {
        return ResponseEntity.ok(vantagemService.listarTodas());
    }

    @GetMapping("/empresa")
    public ResponseEntity<List<VantagemDTO>> listarMinhasVantagens(Authentication authentication) {
        Usuario empresa = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(vantagemService.listarPorEmpresa(empresa.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VantagemDTO> atualizarVantagem(@PathVariable Long id, @Valid @RequestBody VantagemDTO dto, Authentication authentication) {
        Usuario empresa = (Usuario) authentication.getPrincipal();
        VantagemDTO vantagem = vantagemService.atualizarVantagem(id, empresa.getId(), dto);
        return ResponseEntity.ok(vantagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVantagem(@PathVariable Long id, Authentication authentication) {
        Usuario empresa = (Usuario) authentication.getPrincipal();
        vantagemService.deletarVantagem(id, empresa.getId());
        return ResponseEntity.noContent().build();
    }
}
