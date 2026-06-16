package com.moedaestudantil.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Async
    public void enviarEmail(String destinatario, String assunto, String mensagem) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            
            helper.setFrom(mailUsername, "Moeda Estudantil");
            helper.setTo(destinatario);
            helper.setSubject(assunto);
            helper.setText(mensagem, true); // true indica que o texto é HTML
            
            mailSender.send(mimeMessage);
            logger.info("✅ E-mail REAL enviado com sucesso para: {}", destinatario);
        } catch (Exception e) {
            logger.error("❌ Erro ao enviar e-mail real para: {}. Motivo: {}", destinatario, e.getMessage());
            // Fallback: log na tela caso as credenciais não estejam corretas no properties
            logger.info("========================================");
            logger.info("Fallback (Log Simulado) - Enviando E-mail para: {}", destinatario);
            logger.info("Assunto: {}", assunto);
            logger.info("Mensagem:\n{}", mensagem);
            logger.info("========================================");
        }
    }
}
