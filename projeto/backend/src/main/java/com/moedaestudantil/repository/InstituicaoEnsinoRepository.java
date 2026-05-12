package com.moedaestudantil.repository;

import com.moedaestudantil.model.InstituicaoEnsino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituicaoEnsinoRepository extends JpaRepository<InstituicaoEnsino, Long> {
    boolean existsByNome(String nome);
}
