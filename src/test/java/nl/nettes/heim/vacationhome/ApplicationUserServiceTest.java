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

    @Test
    void registerTest(){
        ApplicationUser newUser = new ApplicationUser();
        newUser.setFirstName("TestFirstname").setLastName("TestLastname");
        newUser.setUserName("TestUsername");
        newUser.setPassword("Test123");
        newUser.setPhoNo(0);
        newUser.setEmail("test123@gmail.com");
        newUser.setAddress("hereadress");
        /*ApplicationUser savedUser = applicationUserController.register("TestUsername","Test123","TestFirstname",
                "TestLastname",0,"test123@gmail.com");*/
        //ApplicationUser savedUser2 = applicationUserController.register(newUser);
        //assertEquals(newUser.getUserName(),savedUser.getUserName());
        //assertEquals(newUser,savedUser2);


    }


    @Test
    void signInTest() {
        applicationUserService.signIn("test2","123456");
    }
}
