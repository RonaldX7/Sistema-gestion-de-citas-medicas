package com.proyecto.soa.controllers;

import com.proyecto.soa.entities.User;
import com.proyecto.soa.services.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("soa/")
public class UserController {
    private UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("users/{page}")
    public Page<User> listPageable(@PathVariable Integer page){
        Pageable pageable= PageRequest.of(page,10);
        return userService.findAll(pageable);
    }

    @GetMapping("user/{id}")
    public ResponseEntity<?> show(@PathVariable Long id){
        Optional<User> user=userService.findById(id);
        if(user.isPresent()){
            //Se retorna un 200 porque se encontro el usuario
            return ResponseEntity.status(HttpStatus.OK).body(user.orElseThrow());
        }
        //
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error","El usuario no se encontro por el id: "+id));
    }

    @PostMapping("user")
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        //Se retorna un 201 porque se creo el usuario
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id){
        Optional<User> optionalUser=userService.findById(id);
        if(optionalUser.isPresent()){
            userService.deleteById(id);
            //Se retorna un 204 porque no hay contenido
            return ResponseEntity.status((HttpStatus.NO_CONTENT)).build();
        }
        //Se retorna un 404 porque no se encontro el usuario
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    private ResponseEntity<?> validation (BindingResult result){
        Map<String,String> errors=new HashMap<>();
        //Se recorre los errores y se guarda en un mapa
        result.getFieldErrors().forEach(error->{
            //Se guarda el error en el mapa
            errors.put(error.getField(),
                    //Se guarda el mensaje de error
                    "El campo "+error.getField()+" "+error.getDefaultMessage());
        });
        //Se retorna un 400 porque hubo un error en la validacion
        return ResponseEntity.badRequest().body(errors);
    }
}
