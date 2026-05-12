package com.moedaestudantil.service;

import com.moedaestudantil.dto.InstituicaoEnsinoDTO;
import com.moedaestudantil.exception.ResourceNotFoundException;
import com.moedaestudantil.model.InstituicaoEnsino;
import com.moedaestudantil.repository.InstituicaoEnsinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InstituicaoEnsinoService {

    @Autowired
    private InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    public List<InstituicaoEnsinoDTO> listarTodas() {
        return instituicaoEnsinoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public InstituicaoEnsinoDTO buscarPorId(Long id) {
        InstituicaoEnsino inst = instituicaoEnsinoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + id));
        return toDTO(inst);
    }

    public InstituicaoEnsinoDTO criar(InstituicaoEnsinoDTO dto) {
        InstituicaoEnsino inst = new InstituicaoEnsino();
        inst.setNome(dto.getNome());
        return toDTO(instituicaoEnsinoRepository.save(inst));
    }

    public InstituicaoEnsinoDTO atualizar(Long id, InstituicaoEnsinoDTO dto) {
        InstituicaoEnsino inst = instituicaoEnsinoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + id));
        inst.setNome(dto.getNome());
        return toDTO(instituicaoEnsinoRepository.save(inst));
    }

    public void deletar(Long id) {
        if (!instituicaoEnsinoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Instituição não encontrada com ID: " + id);
        }
        instituicaoEnsinoRepository.deleteById(id);
    }

    private InstituicaoEnsinoDTO toDTO(InstituicaoEnsino inst) {
        InstituicaoEnsinoDTO dto = new InstituicaoEnsinoDTO();
        dto.setId(inst.getId());
        dto.setNome(inst.getNome());
        return dto;
    }
}
