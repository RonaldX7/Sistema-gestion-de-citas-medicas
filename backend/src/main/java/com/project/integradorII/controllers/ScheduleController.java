package com.project.integradorII.controllers;

import com.project.integradorII.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/horario")
public class ScheduleController {

    @Autowired
    private ScheduleService doctorScheduleService;
}
