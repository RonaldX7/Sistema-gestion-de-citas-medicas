package com.project.integradorII.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/holomedic")
public class PrincipalController {



    @GetMapping("/get")
    public String hello() {
        return "Hello, World!";
    }

    @PostMapping("/post")
    public String post() {
        return "Post request has been made!";
    }
}
