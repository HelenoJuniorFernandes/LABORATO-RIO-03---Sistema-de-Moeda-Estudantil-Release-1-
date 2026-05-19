package com.moedaestudantil.controller;

import com.moedaestudantil.config.JwtUtil;
import com.moedaestudantil.dto.LoginDTO;
import com.moedaestudantil.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO loginDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getSenha());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        
        Usuario usuario = (Usuario) auth.getPrincipal();
        String token = jwtUtil.generateToken(usuario);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}
