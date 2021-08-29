package nl.nettes.heim.vacationhome;

import nl.nettes.heim.vacationhome.controller.ApplicationUserController;
import nl.nettes.heim.vacationhome.domain.ApplicationUser;
import nl.nettes.heim.vacationhome.service.ApplicationUserService;
import org.junit.Assert;
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
    void register(){
        ApplicationUser newUser = new ApplicationUser();
        newUser.setFirstName("TestFirstname").setLastName("TestLastname");
        newUser.setUserName("TestUsername");
        newUser.setPassword("Test123");
        newUser.setPhoNo(0);
        newUser.setEmail("test123@gmail.com");
        newUser.setAddress("testAdress");

        ApplicationUser savedUser2 = applicationUserController.register(newUser);
        Assert.assertEquals(newUser.getUserName(),savedUser2.getUserName());
        Assert.assertEquals(newUser,savedUser2);
    }


    @Test
    void signIn() {
        applicationUserService.signIn("test2","123456");
    }

    @Test
    void deleteUserById() {
        ApplicationUser newUser = new ApplicationUser();
        newUser.setFirstName("TestFirstname").setLastName("TestLastname");
        newUser.setUserName("TestUsername");
        newUser.setPassword("Test123");
        newUser.setPhoNo(0);
        newUser.setEmail("test123@gmail.com");
        newUser.setAddress("TestAddress");
        newUser.setUserId(1L);

        ApplicationUser savedUser = applicationUserController.register(newUser);
        applicationUserService.deleteUserById(1L);

        Assert.assertThrows(NullPointerException.class,()->{
            applicationUserController.getUserById(1L).getUserId();
        });
    }
}
