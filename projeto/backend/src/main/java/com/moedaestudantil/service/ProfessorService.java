package com.moedaestudantil.service;

import com.moedaestudantil.dto.ProfessorDTO;
import com.moedaestudantil.model.InstituicaoEnsino;
import com.moedaestudantil.model.Professor;
import com.moedaestudantil.repository.InstituicaoEnsinoRepository;
import com.moedaestudantil.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private InstituicaoEnsinoRepository instituicaoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public ProfessorDTO atualizar(Long id, ProfessorDTO dto) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        professor.setNome(dto.getNome());
        professor.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            professor.setSenha(passwordEncoder.encode(dto.getSenha()));
        }
        professor.setCpf(dto.getCpf());
        professor.setDepartamento(dto.getDepartamento());

        if (dto.getInstituicaoEnsinoId() != null) {
            InstituicaoEnsino inst = instituicaoRepository.findById(dto.getInstituicaoEnsinoId())
                    .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));
            professor.setInstituicaoEnsino(inst);
        }

        professorRepository.save(professor);
        return convertToDTO(professor);
    }

    private ProfessorDTO convertToDTO(Professor professor) {
        ProfessorDTO dto = new ProfessorDTO();
        dto.setId(professor.getId());
        dto.setNome(professor.getNome());
        dto.setEmail(professor.getEmail());
        dto.setCpf(professor.getCpf());
        dto.setDepartamento(professor.getDepartamento());
        dto.setSaldoMoedas(professor.getSaldoMoedas());
        if (professor.getInstituicaoEnsino() != null) {
            dto.setInstituicaoEnsinoId(professor.getInstituicaoEnsino().getId());
            dto.setInstituicaoEnsinoNome(professor.getInstituicaoEnsino().getNome());
        }
        return dto;
    }
}
