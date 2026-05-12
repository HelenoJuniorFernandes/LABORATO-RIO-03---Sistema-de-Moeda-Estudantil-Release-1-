package com.moedaestudantil.service;

import com.moedaestudantil.dto.AlunoDTO;
import com.moedaestudantil.exception.ResourceNotFoundException;
import com.moedaestudantil.model.Aluno;
import com.moedaestudantil.model.InstituicaoEnsino;
import com.moedaestudantil.repository.AlunoRepository;
import com.moedaestudantil.repository.InstituicaoEnsinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    public List<AlunoDTO> listarTodos() {
        return alunoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AlunoDTO buscarPorId(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com ID: " + id));
        return toDTO(aluno);
    }

    public AlunoDTO criar(AlunoDTO dto) {
        if (alunoRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado: " + dto.getCpf());
        }
        if (alunoRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + dto.getEmail());
        }

        InstituicaoEnsino instituicao = instituicaoEnsinoRepository.findById(dto.getInstituicaoEnsinoId())
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + dto.getInstituicaoEnsinoId()));

        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());
        aluno.setSenha(dto.getSenha());
        aluno.setCpf(dto.getCpf());
        aluno.setRg(dto.getRg());
        aluno.setEndereco(dto.getEndereco());
        aluno.setCurso(dto.getCurso());
        aluno.setSaldoMoedas(BigDecimal.ZERO);
        aluno.setInstituicaoEnsino(instituicao);

        Aluno salvo = alunoRepository.save(aluno);
        return toDTO(salvo);
    }

    public AlunoDTO atualizar(Long id, AlunoDTO dto) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com ID: " + id));

        if (alunoRepository.existsByCpfAndIdNot(dto.getCpf(), id)) {
            throw new IllegalArgumentException("CPF já cadastrado por outro aluno");
        }
        if (alunoRepository.existsByEmailAndIdNot(dto.getEmail(), id)) {
            throw new IllegalArgumentException("Email já cadastrado por outro usuário");
        }

        InstituicaoEnsino instituicao = instituicaoEnsinoRepository.findById(dto.getInstituicaoEnsinoId())
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + dto.getInstituicaoEnsinoId()));

        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            aluno.setSenha(dto.getSenha());
        }
        aluno.setCpf(dto.getCpf());
        aluno.setRg(dto.getRg());
        aluno.setEndereco(dto.getEndereco());
        aluno.setCurso(dto.getCurso());
        aluno.setInstituicaoEnsino(instituicao);

        Aluno atualizado = alunoRepository.save(aluno);
        return toDTO(atualizado);
    }

    public void deletar(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Aluno não encontrado com ID: " + id);
        }
        alunoRepository.deleteById(id);
    }

    private AlunoDTO toDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setEmail(aluno.getEmail());
        dto.setSenha(null); // nunca retornar senha
        dto.setCpf(aluno.getCpf());
        dto.setRg(aluno.getRg());
        dto.setEndereco(aluno.getEndereco());
        dto.setCurso(aluno.getCurso());
        dto.setSaldoMoedas(aluno.getSaldoMoedas() != null ? aluno.getSaldoMoedas().doubleValue() : null);
        dto.setInstituicaoEnsinoId(aluno.getInstituicaoEnsino().getId());
        dto.setInstituicaoEnsinoNome(aluno.getInstituicaoEnsino().getNome());
        return dto;
    }
}
