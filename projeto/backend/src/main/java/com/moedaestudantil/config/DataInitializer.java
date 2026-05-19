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
            a.setSaldoMoedas(new java.math.BigDecimal("0.0"));
            alunoRepository.save(a);
            System.out.println("✅ Aluno de teste criado!");

            com.moedaestudantil.model.EmpresaParceira e = new com.moedaestudantil.model.EmpresaParceira();
            e.setNome("Empresa Teste");
            e.setEmail("empresa@teste.com");
            e.setSenha(passwordEncoder.encode("123456"));
            e.setCnpj("33333333333");
            empresaParceiraRepository.save(e);
            System.out.println("✅ Empresa Parceira de teste criada!");
        }
    }
}
