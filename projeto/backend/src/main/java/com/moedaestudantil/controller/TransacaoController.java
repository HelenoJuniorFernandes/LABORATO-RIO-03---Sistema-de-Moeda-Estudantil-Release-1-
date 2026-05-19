package com.moedaestudantil.controller;

import com.moedaestudantil.dto.ResgateDTO;
import com.moedaestudantil.dto.TransacaoDTO;
import com.moedaestudantil.dto.TransferenciaDTO;
import com.moedaestudantil.model.Usuario;
import com.moedaestudantil.service.TransacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping("/transferir")
    public ResponseEntity<TransacaoDTO> transferirMoedas(@Valid @RequestBody TransferenciaDTO dto, Authentication authentication) {
        Usuario professor = (Usuario) authentication.getPrincipal();
        TransacaoDTO transacao = transacaoService.transferirMoedas(professor.getId(), dto);
        return ResponseEntity.ok(transacao);
    }

    @PostMapping("/resgatar")
    public ResponseEntity<TransacaoDTO> resgatarVantagem(@Valid @RequestBody ResgateDTO dto, Authentication authentication) {
        Usuario aluno = (Usuario) authentication.getPrincipal();
        TransacaoDTO transacao = transacaoService.resgatarVantagem(aluno.getId(), dto);
        return ResponseEntity.ok(transacao);
    }

    @GetMapping("/extrato")
    public ResponseEntity<List<TransacaoDTO>> listarExtrato(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        List<TransacaoDTO> extrato = transacaoService.listarExtrato(usuario.getId());
        return ResponseEntity.ok(extrato);
    }
}
