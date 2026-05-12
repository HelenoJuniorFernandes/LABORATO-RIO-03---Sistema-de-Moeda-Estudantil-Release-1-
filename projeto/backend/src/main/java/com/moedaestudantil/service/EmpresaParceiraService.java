package com.moedaestudantil.service;

import com.moedaestudantil.dto.EmpresaParceiraDTO;
import com.moedaestudantil.exception.ResourceNotFoundException;
import com.moedaestudantil.model.EmpresaParceira;
import com.moedaestudantil.repository.EmpresaParceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmpresaParceiraService {

    @Autowired
    private EmpresaParceiraRepository empresaParceiraRepository;

    public List<EmpresaParceiraDTO> listarTodas() {
        return empresaParceiraRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EmpresaParceiraDTO buscarPorId(Long id) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa parceira não encontrada com ID: " + id));
        return toDTO(empresa);
    }

    public EmpresaParceiraDTO criar(EmpresaParceiraDTO dto) {
        if (empresaParceiraRepository.existsByCnpj(dto.getCnpj())) {
            throw new IllegalArgumentException("CNPJ já cadastrado: " + dto.getCnpj());
        }
        if (empresaParceiraRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + dto.getEmail());
        }

        EmpresaParceira empresa = new EmpresaParceira();
        empresa.setNome(dto.getNome());
        empresa.setEmail(dto.getEmail());
        empresa.setSenha(dto.getSenha());
        empresa.setCnpj(dto.getCnpj());

        EmpresaParceira salva = empresaParceiraRepository.save(empresa);
        return toDTO(salva);
    }

    public EmpresaParceiraDTO atualizar(Long id, EmpresaParceiraDTO dto) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa parceira não encontrada com ID: " + id));

        if (empresaParceiraRepository.existsByCnpjAndIdNot(dto.getCnpj(), id)) {
            throw new IllegalArgumentException("CNPJ já cadastrado por outra empresa");
        }
        if (empresaParceiraRepository.existsByEmailAndIdNot(dto.getEmail(), id)) {
            throw new IllegalArgumentException("Email já cadastrado por outro usuário");
        }

        empresa.setNome(dto.getNome());
        empresa.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            empresa.setSenha(dto.getSenha());
        }
        empresa.setCnpj(dto.getCnpj());

        EmpresaParceira atualizada = empresaParceiraRepository.save(empresa);
        return toDTO(atualizada);
    }

    public void deletar(Long id) {
        if (!empresaParceiraRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empresa parceira não encontrada com ID: " + id);
        }
        empresaParceiraRepository.deleteById(id);
    }

    private EmpresaParceiraDTO toDTO(EmpresaParceira empresa) {
        EmpresaParceiraDTO dto = new EmpresaParceiraDTO();
        dto.setId(empresa.getId());
        dto.setNome(empresa.getNome());
        dto.setEmail(empresa.getEmail());
        dto.setSenha(null); // nunca retornar senha
        dto.setCnpj(empresa.getCnpj());
        return dto;
    }
}
