package com.moedaestudantil.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProfessorDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String departamento;
    private BigDecimal saldoMoedas;
    private Long instituicaoEnsinoId;
    private String instituicaoEnsinoNome;
}
