package com.moedaestudantil.repository;

import com.moedaestudantil.model.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {
    Optional<EmpresaParceira> findByCnpj(String cnpj);
    Optional<EmpresaParceira> findByEmail(String email);
    boolean existsByCnpj(String cnpj);
    boolean existsByEmail(String email);
    boolean existsByCnpjAndIdNot(String cnpj, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);
}
