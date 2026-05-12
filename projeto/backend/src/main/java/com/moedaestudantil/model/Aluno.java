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
@Table(name = "alunos")
@PrimaryKeyJoinColumn(name = "id")
public class Aluno extends Usuario {

    @NotBlank(message = "CPF é obrigatório")
    @Column(nullable = false, unique = true)
    private String cpf;

    @NotBlank(message = "RG é obrigatório")
    @Column(nullable = false)
    private String rg;

    @NotBlank(message = "Endereço é obrigatório")
    @Column(nullable = false)
    private String endereco;

    @NotBlank(message = "Curso é obrigatório")
    @Column(nullable = false)
    private String curso;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "saldo_moedas", nullable = false)
    private BigDecimal saldoMoedas = BigDecimal.ZERO;

    @NotNull(message = "Instituição de ensino é obrigatória")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituicao_ensino_id", nullable = false)
    private InstituicaoEnsino instituicaoEnsino;
}
