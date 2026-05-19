package com.moedaestudantil.config;

import com.moedaestudantil.model.InstituicaoEnsino;
import com.moedaestudantil.repository.InstituicaoEnsinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    @Autowired
    private com.moedaestudantil.repository.ProfessorRepository professorRepository;
    @Autowired
    private com.moedaestudantil.repository.AlunoRepository alunoRepository;
    @Autowired
    private com.moedaestudantil.repository.EmpresaParceiraRepository empresaParceiraRepository;
    @Autowired
    private com.moedaestudantil.repository.TransacaoRepository transacaoRepository;
    @Autowired
    private com.moedaestudantil.repository.VantagemRepository vantagemRepository;
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (instituicaoEnsinoRepository.count() == 0) {
            List<String> instituicoes = List.of("UFMG", "PUC-MG", "ITA", "USP", "UNICAMP", "UFRJ", "UNIFEI");
            instituicoes.forEach(nome -> {
                InstituicaoEnsino inst = new InstituicaoEnsino();
                inst.setNome(nome);
                instituicaoEnsinoRepository.save(inst);
            });
            System.out.println("✅ Instituições de ensino carregadas com sucesso!");
        }

        if (professorRepository.count() == 0 && instituicaoEnsinoRepository.count() > 0) {
            InstituicaoEnsino inst = instituicaoEnsinoRepository.findAll().get(0);
            
            com.moedaestudantil.model.Professor p = new com.moedaestudantil.model.Professor();
            p.setNome("Professor Teste");
            p.setEmail("professor@teste.com");
            p.setSenha(passwordEncoder.encode("123456"));
            p.setCpf("11111111111");
            p.setDepartamento("Computação");
            p.setInstituicaoEnsino(inst);
            p.setSaldoMoedas(new java.math.BigDecimal("1000.0"));
            professorRepository.save(p);
            System.out.println("✅ Professor de teste criado!");

            com.moedaestudantil.model.Aluno a = new com.moedaestudantil.model.Aluno();
            a.setNome("Aluno Teste");
            a.setEmail("aluno@teste.com");
            a.setSenha(passwordEncoder.encode("123456"));
            a.setCpf("22222222222");
            a.setRg("MG-123");
            a.setEndereco("Rua A");
            a.setCurso("Engenharia");
            a.setInstituicaoEnsino(inst);
            a.setSaldoMoedas(new java.math.BigDecimal("300.0")); // Aluno recebe moedas
            a = alunoRepository.save(a);
            System.out.println("✅ Aluno de teste criado com 300 moedas!");

            // Atualizar o saldo do professor para refletir a transferência
            p.setSaldoMoedas(new java.math.BigDecimal("700.0"));
            professorRepository.save(p);

            com.moedaestudantil.model.EmpresaParceira e = new com.moedaestudantil.model.EmpresaParceira();
            e.setNome("Empresa Teste");
            e.setEmail("empresa@teste.com");
            e.setSenha(passwordEncoder.encode("123456"));
            e.setCnpj("33333333333");
            e = empresaParceiraRepository.save(e);
            System.out.println("✅ Empresa Parceira de teste criada!");

            // Criar Transação de Teste para Extrato
            com.moedaestudantil.model.Transacao t1 = new com.moedaestudantil.model.Transacao();
            t1.setRemetenteId(p.getId());
            t1.setRemetenteNome(p.getNome());
            t1.setDestinatarioId(a.getId());
            t1.setDestinatarioNome(a.getNome());
            t1.setValor(new java.math.BigDecimal("300.0"));
            t1.setMotivo("Bom desempenho no projeto final da disciplina.");
            t1.setDataTransacao(java.time.LocalDateTime.now().minusDays(1));
            transacaoRepository.save(t1);

            com.moedaestudantil.model.Vantagem v1 = new com.moedaestudantil.model.Vantagem();
            v1.setNome("Desconto de 50% em Livros");
            v1.setDescricao("Compre livros técnicos com desconto na nossa loja.");
            v1.setCusto(new java.math.BigDecimal("100.0"));
            v1.setFoto("https://images.unsplash.com/photo-1544947950-fa07a98d237f");
            v1.setEmpresaParceira(e);
            v1.setEmpresaParceiraNome(e.getNome());
            vantagemRepository.save(v1);

            com.moedaestudantil.model.Vantagem v2 = new com.moedaestudantil.model.Vantagem();
            v2.setNome("Vale-Refeição R$ 30");
            v2.setDescricao("Troque por um almoço na lanchonete conveniada.");
            v2.setCusto(new java.math.BigDecimal("50.0"));
            v2.setFoto("https://images.unsplash.com/photo-1555939594-58d7cb561ad1");
            v2.setEmpresaParceira(e);
            v2.setEmpresaParceiraNome(e.getNome());
            vantagemRepository.save(v2);

            com.moedaestudantil.model.Vantagem v3 = new com.moedaestudantil.model.Vantagem();
            v3.setNome("Curso de Inglês - 1 Mês");
            v3.setDescricao("Um mês grátis de conversação avançada.");
            v3.setCusto(new java.math.BigDecimal("200.0"));
            v3.setFoto("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8");
            v3.setEmpresaParceira(e);
            v3.setEmpresaParceiraNome(e.getNome());
            vantagemRepository.save(v3);

            System.out.println("✅ Transações e Vantagens geradas com sucesso!");
        }
    }
}
