package com.moedaestudantil.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransacaoDTO {
    private Long id;
    private Long remetenteId;
    private String remetenteNome;
    private Long destinatarioId;
    private String destinatarioNome;
    private BigDecimal valor;
    private String motivo;
    private LocalDateTime dataTransacao;
    private Long vantagemId;
    private String vantagemNome;
    private String cupom;
}
