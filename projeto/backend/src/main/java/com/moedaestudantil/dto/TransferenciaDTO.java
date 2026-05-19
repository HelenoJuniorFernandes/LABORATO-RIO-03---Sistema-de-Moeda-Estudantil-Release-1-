package com.moedaestudantil.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferenciaDTO {
    @NotNull(message = "ID do aluno é obrigatório")
    private Long alunoId;

    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "1.0", message = "O valor deve ser de pelo menos 1 moeda")
    private BigDecimal valor;

    @NotBlank(message = "Motivo da transferência é obrigatório")
    private String motivo;
}
