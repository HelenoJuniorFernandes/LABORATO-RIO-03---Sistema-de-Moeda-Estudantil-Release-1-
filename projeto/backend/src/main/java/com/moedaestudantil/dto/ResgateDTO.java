package com.moedaestudantil.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResgateDTO {
    @NotNull(message = "ID da vantagem é obrigatório")
    private Long vantagemId;
}
