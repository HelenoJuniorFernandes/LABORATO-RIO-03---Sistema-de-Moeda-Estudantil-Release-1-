package com.moedaestudantil.service;

import com.moedaestudantil.dto.VantagemDTO;
import com.moedaestudantil.model.EmpresaParceira;
import com.moedaestudantil.model.Vantagem;
import com.moedaestudantil.repository.EmpresaParceiraRepository;
import com.moedaestudantil.repository.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VantagemService {

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private EmpresaParceiraRepository empresaParceiraRepository;

    public VantagemDTO criarVantagem(Long empresaId, VantagemDTO dto) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(empresaId)
                .orElseThrow(() -> new RuntimeException("Empresa Parceira não encontrada"));

        Vantagem vantagem = new Vantagem();
        vantagem.setNome(dto.getNome());
        vantagem.setDescricao(dto.getDescricao());
        vantagem.setFoto(dto.getFoto());
        vantagem.setCusto(dto.getCusto());
        vantagem.setEmpresaParceira(empresa);

        vantagem = vantagemRepository.save(vantagem);
        return convertToDTO(vantagem);
    }

    public List<VantagemDTO> listarTodas() {
        return vantagemRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VantagemDTO> listarPorEmpresa(Long empresaId) {
        return vantagemRepository.findByEmpresaParceiraId(empresaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VantagemDTO atualizarVantagem(Long id, Long empresaId, VantagemDTO dto) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));

        if (!vantagem.getEmpresaParceira().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: a vantagem não pertence a esta empresa.");
        }

        vantagem.setNome(dto.getNome());
        vantagem.setDescricao(dto.getDescricao());
        vantagem.setFoto(dto.getFoto());
        vantagem.setCusto(dto.getCusto());

        vantagem = vantagemRepository.save(vantagem);
        return convertToDTO(vantagem);
    }

    public void deletarVantagem(Long id, Long empresaId) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));

        if (!vantagem.getEmpresaParceira().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: a vantagem não pertence a esta empresa.");
        }

        vantagemRepository.delete(vantagem);
    }

    private VantagemDTO convertToDTO(Vantagem vantagem) {
        VantagemDTO dto = new VantagemDTO();
        dto.setId(vantagem.getId());
        dto.setNome(vantagem.getNome());
        dto.setDescricao(vantagem.getDescricao());
        dto.setFoto(vantagem.getFoto());
        dto.setCusto(vantagem.getCusto());
        dto.setEmpresaParceiraId(vantagem.getEmpresaParceira().getId());
        dto.setEmpresaParceiraNome(vantagem.getEmpresaParceira().getNome());
        return dto;
    }
}
