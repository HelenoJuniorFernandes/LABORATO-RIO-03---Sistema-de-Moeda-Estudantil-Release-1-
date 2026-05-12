package com.moedaestudantil.dto;

import jakarta.validation.constraints.NotBlank;

public class InstituicaoEnsinoDTO {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
