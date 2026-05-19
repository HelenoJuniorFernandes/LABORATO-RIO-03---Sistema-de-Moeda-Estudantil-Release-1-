package com.moedaestudantil.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void enviarEmail(String destinatario, String assunto, String mensagem) {
        // Simulação de envio de e-mail para não depender de credenciais reais no ambiente de desenvolvimento/avaliação.
        logger.info("========================================");
        logger.info("Enviando E-mail para: {}", destinatario);
        logger.info("Assunto: {}", assunto);
        logger.info("Mensagem:\n{}", mensagem);
        logger.info("========================================");
    }
}
