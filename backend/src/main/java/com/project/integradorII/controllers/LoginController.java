package com.project.integradorII.controllers;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @GetMapping("/login")
    public String login(){
        return "TE LOGEASTE CON EXITO";
    }

    @GetMapping("/hello")
    public String holis(){
        return "hello";
    }

/*
    @GetMapping("/dashboard")
    public String dashboard(){
        return "dashboard";
    }

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OAuth2User principal){
            if(principal!=null){
                model.addAttribute("name", principal.getAttribute("name"));
            }
            return "home";
    }
    //con esta vaina redirecciono el jwt de google
    @GetMapping("login/oauth2/code/google")
    public String handleGoogleLogin(Model model, @AuthenticationPrincipal OidcUser principal){
        if(principal!=null){
            String token=principal.getIdToken().getTokenValue();//con esto obotengo el token de google
            return "redirect:http://localhost:4200/login?token=" + token; //mando el token al front
        }
        return "redirect:/";
    }*/

}
