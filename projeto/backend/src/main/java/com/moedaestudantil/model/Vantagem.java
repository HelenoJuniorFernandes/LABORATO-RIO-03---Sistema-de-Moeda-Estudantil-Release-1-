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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(of = "id")
@Table(name = "vantagens")
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "Descrição é obrigatória")
    @Column(nullable = false, length = 1000)
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String foto; // URL ou Base64 da imagem

    @NotNull(message = "Custo é obrigatório")
    @DecimalMin(value = "1.0", message = "O custo deve ser maior ou igual a 1")
    @Column(nullable = false)
    private BigDecimal custo;

    @NotNull(message = "Empresa parceira é obrigatória")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_parceira_id", nullable = false)
    private EmpresaParceira empresaParceira;
}
