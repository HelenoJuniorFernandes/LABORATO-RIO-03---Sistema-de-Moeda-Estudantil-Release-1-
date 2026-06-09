package com.moedaestudantil.service;

import com.moedaestudantil.dto.ResgateDTO;
import com.moedaestudantil.dto.TransacaoDTO;
import com.moedaestudantil.dto.TransferenciaDTO;
import com.moedaestudantil.model.*;
import com.moedaestudantil.repository.AlunoRepository;
import com.moedaestudantil.repository.ProfessorRepository;
import com.moedaestudantil.repository.TransacaoRepository;
import com.moedaestudantil.repository.UsuarioRepository;
import com.moedaestudantil.repository.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public TransacaoDTO transferirMoedas(Long professorId, TransferenciaDTO dto) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        // Validação de saldo
        if (professor.getSaldoMoedas().compareTo(dto.getValor()) < 0) {
            throw new RuntimeException("Saldo insuficiente");
        }

        // Atualizar saldo do professor e do aluno
        professor.setSaldoMoedas(professor.getSaldoMoedas().subtract(dto.getValor()));
        aluno.setSaldoMoedas(aluno.getSaldoMoedas().add(dto.getValor()));

        professorRepository.save(professor);
        alunoRepository.save(aluno);

        // Criar transação
        Transacao transacao = new Transacao();
        transacao.setRemetente(professor);
        transacao.setDestinatario(aluno);
        transacao.setValor(dto.getValor());
        transacao.setMotivo(dto.getMotivo());
        transacao.setDataTransacao(LocalDateTime.now());

        transacaoRepository.save(transacao);

        // Enviar email para o aluno
        String htmlTemplate = "<div style=\"font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0e1a; color: #e2e8f0; border-radius: 12px; border: 1px solid #1e2d45;\">" +
                "<div style=\"text-align: center; padding-bottom: 15px; border-bottom: 1px solid #1e2d45;\">" +
                "<h2 style=\"color: #3b7cff; margin: 0; letter-spacing: 1px;\">Moeda Estudantil</h2>" +
                "</div>" +
                "<div style=\"padding: 20px; background-color: #111827; border-radius: 8px; margin-top: 20px;\">%s</div>" +
                "<p style=\"margin-top: 30px; font-size: 12px; color: #64748b; text-align: center;\">Este é um e-mail automático. Por favor, não responda.</p>" +
                "</div>";

        String corpoAluno = String.format("<p>Olá <b style=\"color: #f59e0b;\">%s</b>,</p><p>Você recebeu <b style=\"color: #f59e0b;\">%s</b> moedas do professor <b style=\"color: #3b7cff;\">%s</b>.</p><p style=\"color: #94a3b8;\"><b>Motivo:</b> %s</p>",
                aluno.getNome(), dto.getValor(), professor.getNome(), dto.getMotivo());
        String msg = String.format(htmlTemplate, corpoAluno);
        emailService.enviarEmail(aluno.getEmail(), "Você recebeu novas moedas!", msg);

        // Enviar email para o professor
        String corpoProfessor = String.format("<p>Olá <b style=\"color: #3b7cff;\">%s</b>,</p><p>Você enviou <b style=\"color: #f59e0b;\">%s</b> moedas para o aluno <b style=\"color: #f59e0b;\">%s</b>.</p><p style=\"color: #94a3b8;\"><b>Motivo:</b> %s</p>",
                professor.getNome(), dto.getValor(), aluno.getNome(), dto.getMotivo());
        String msgProfessor = String.format(htmlTemplate, corpoProfessor);
        emailService.enviarEmail(professor.getEmail(), "Confirmação de Envio de Moedas", msgProfessor);

        return convertToDTO(transacao);
    }

    @Transactional
    public TransacaoDTO resgatarVantagem(Long alunoId, ResgateDTO dto) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Vantagem vantagem = vantagemRepository.findById(dto.getVantagemId())
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));

        EmpresaParceira empresa = vantagem.getEmpresaParceira();

        if (aluno.getSaldoMoedas().compareTo(vantagem.getCusto()) < 0) {
            throw new RuntimeException("Saldo insuficiente para resgatar esta vantagem");
        }

        // Atualizar saldos
        aluno.setSaldoMoedas(aluno.getSaldoMoedas().subtract(vantagem.getCusto()));
        alunoRepository.save(aluno);

        // Criar transação
        Transacao transacao = new Transacao();
        transacao.setRemetente(aluno);
        transacao.setDestinatario(empresa);
        transacao.setValor(vantagem.getCusto());
        transacao.setMotivo("Resgate da vantagem: " + vantagem.getNome());
        transacao.setVantagem(vantagem);
        transacao.setDataTransacao(LocalDateTime.now());

        String cupom = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        transacao.setCupom(cupom);

        transacaoRepository.save(transacao);

        String htmlTemplate = "<div style=\"font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0e1a; color: #e2e8f0; border-radius: 12px; border: 1px solid #1e2d45;\">" +
                "<div style=\"text-align: center; padding-bottom: 15px; border-bottom: 1px solid #1e2d45;\">" +
                "<h2 style=\"color: #3b7cff; margin: 0; letter-spacing: 1px;\">Moeda Estudantil</h2>" +
                "</div>" +
                "<div style=\"padding: 20px; background-color: #111827; border-radius: 8px; margin-top: 20px;\">%s</div>" +
                "<p style=\"margin-top: 30px; font-size: 12px; color: #64748b; text-align: center;\">Este é um e-mail automático. Por favor, não responda.</p>" +
                "</div>";

        // Email para o aluno
        String corpoAluno = String.format(
                "<h3 style=\"color: #10b981; margin-top: 0;\">Resgate Efetuado com Sucesso!</h3>" +
                "<p>Olá <b style=\"color: #f59e0b;\">%s</b>,</p>" +
                "<p>Você resgatou a vantagem <b style=\"color: #3b7cff;\">'%s'</b> com sucesso.</p>" +
                "<p>Seu código de cupom é: <strong style=\"font-size: 18px; color: #f59e0b; letter-spacing: 2px;\">%s</strong></p>" +
                "<p style=\"color: #94a3b8; font-size: 14px;\">Apresente o QR Code abaixo no estabelecimento:</p>" +
                "<div style=\"text-align: center; margin-top: 15px; background: #fff; padding: 10px; display: inline-block; border-radius: 8px;\"><img src=\"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=%s\" alt=\"QR Code Cupom\" style=\"display: block;\" /></div>",
                aluno.getNome(), vantagem.getNome(), cupom, cupom);
        String msgAluno = String.format(htmlTemplate, corpoAluno);
        emailService.enviarEmail(aluno.getEmail(), "Resgate de Vantagem - Cupom", msgAluno);

        // Email para a empresa
        String corpoEmpresa = String.format(
                "<h3 style=\"color: #3b7cff; margin-top: 0;\">Nova Vantagem Resgatada</h3>" +
                "<p>Olá,</p>" +
                "<p>A vantagem <b style=\"color: #3b7cff;\">'%s'</b> foi resgatada pelo aluno <b style=\"color: #f59e0b;\">%s</b>.</p>" +
                "<p>Código do cupom para conferência: <strong style=\"font-size: 18px; color: #f59e0b; letter-spacing: 2px;\">%s</strong></p>",
                vantagem.getNome(), aluno.getNome(), cupom);
        String msgEmpresa = String.format(htmlTemplate, corpoEmpresa);
        emailService.enviarEmail(empresa.getEmail(), "Nova Vantagem Resgatada", msgEmpresa);

        return convertToDTO(transacao);
    }

    public List<TransacaoDTO> listarExtrato(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Transacao> transacoes = transacaoRepository.findByRemetenteIdOrDestinatarioIdOrderByDataTransacaoDesc(usuarioId, usuarioId);

        return transacoes.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private TransacaoDTO convertToDTO(Transacao transacao) {
        TransacaoDTO dto = new TransacaoDTO();
        dto.setId(transacao.getId());
        dto.setRemetenteId(transacao.getRemetente().getId());
        dto.setRemetenteNome(transacao.getRemetente().getNome());
        dto.setDestinatarioId(transacao.getDestinatario().getId());
        dto.setDestinatarioNome(transacao.getDestinatario().getNome());
        dto.setValor(transacao.getValor());
        dto.setMotivo(transacao.getMotivo());
        dto.setDataTransacao(transacao.getDataTransacao());
        if (transacao.getVantagem() != null) {
            dto.setVantagemId(transacao.getVantagem().getId());
            dto.setVantagemNome(transacao.getVantagem().getNome());
        }
        dto.setCupom(transacao.getCupom());
        return dto;
    }
}
