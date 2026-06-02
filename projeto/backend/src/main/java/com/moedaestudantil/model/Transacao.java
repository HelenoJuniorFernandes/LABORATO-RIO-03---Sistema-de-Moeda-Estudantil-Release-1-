package com.moedaestudantil.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(of = "id")
@Table(name = "transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Remetente é obrigatório")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "remetente_id", nullable = false)
    private Usuario remetente;

    @NotNull(message = "Destinatário é obrigatório")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinatario_id", nullable = false)
    private Usuario destinatario;

    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "1.0", message = "O valor da transação deve ser maior ou igual a 1")
    @Column(nullable = false)
    private BigDecimal valor;

    @NotBlank(message = "Motivo é obrigatório")
    @Column(nullable = false)
    private String motivo;

    @Column(nullable = false)
    private LocalDateTime dataTransacao = LocalDateTime.now();
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem; // Opcional, preenchido se a transação for resgate de vantagem

    @Column(nullable = true)
    private String cupom;
}
