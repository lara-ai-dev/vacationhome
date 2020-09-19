package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.controller.ApplicationUserController;
import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.service.ApplicationUserService;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationUserServiceTest {
    @Autowired
    private ApplicationUserService applicationUserService;
    @Autowired
    private ApplicationUserController applicationUserController;
/*
    @Test
    void registerTest(){
        ApplicationUser newUser = new ApplicationUser();
        newUser.setFirstName("Lara").setLastName("Nettesheim");
        newUser.setUserName("koyuki");
        newUser.setPassword("geileBraut69");
        newUser.setPhoNo(0);
        newUser.setEmail("thaibraut@nettesheim.com");
        newUser.setAddress("hier");
        ApplicationUser savedUser = applicationUserController.register("koyuki","geileBraut69","Lara",
                "Nettesheim",0,"hier","thaibraut@nettesheim.com");
        ApplicationUser savedUser2 = applicationUserController.register(newUser);
        assertEquals(newUser.getUserName(),savedUser.getUserName());
        assertEquals(newUser,savedUser2);


    }
    @Test
    void signInTest() {
        applicationUserService.signIn("Peter","abcd");
    }*/
}
