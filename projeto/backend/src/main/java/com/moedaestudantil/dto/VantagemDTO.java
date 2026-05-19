package com.moedaestudantil.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class VantagemDTO {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    private String foto;

    @NotNull(message = "Custo é obrigatório")
    @DecimalMin(value = "1.0", message = "O custo deve ser maior ou igual a 1")
    private BigDecimal custo;

    private Long empresaParceiraId;
    private String empresaParceiraNome;
}
