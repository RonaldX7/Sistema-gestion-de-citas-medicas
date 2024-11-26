package com.project.integradorII.services.Imp;


import com.project.integradorII.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class EmailServiceImp implements EmailService {

    @Value("${spring.mail.username}")
    private String fromEmailAddress;

    private final JavaMailSender mailSender;

    @Async
    @Override
    public void sendMail(String to, String subject, String content) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(new InternetAddress(fromEmailAddress));
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content,true);
        mailSender.send(message);
    }

    @Async
    @Override
    public void sendMultipleMail(List<String> to, String subject, String content) throws MessagingException {
        to.forEach(t->{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            try{
                helper.setFrom(new InternetAddress(fromEmailAddress));
                helper.setTo(t);
                helper.setSubject(subject);
                helper.setText(content,true);
            }catch (MessagingException e){
                throw new RuntimeException(e);
            }
            mailSender.send(message);
        });
    }
}
