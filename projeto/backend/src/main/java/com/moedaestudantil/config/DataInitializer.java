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
    }
}
