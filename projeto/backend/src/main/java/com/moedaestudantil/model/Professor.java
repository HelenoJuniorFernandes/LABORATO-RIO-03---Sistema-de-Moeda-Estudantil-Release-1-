package com.moedaestudantil.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "professores")
@PrimaryKeyJoinColumn(name = "id")
public class Professor extends Usuario {

    @NotBlank(message = "CPF é obrigatório")
    @Column(nullable = false, unique = true)
    private String cpf;

    @NotBlank(message = "Departamento é obrigatório")
    @Column(nullable = false)
    private String departamento;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "saldo_moedas", nullable = false)
    private BigDecimal saldoMoedas = new BigDecimal("1000.0");

    @NotNull(message = "Instituição de ensino é obrigatória")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituicao_ensino_id", nullable = false)
    private InstituicaoEnsino instituicaoEnsino;
}
