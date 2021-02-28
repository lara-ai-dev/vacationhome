##Final Project - Back end Vacationhome

In this folder the backend of the final project can be found.
The frontend of the project is located in the next folder : `vacationhome-frontend`.
Furthermore, in the folder `vacationhome-documentation` the documentation of the project can be found. 

## Add Dependency

Open `pom.xml`

Add the following lines
```
<dependency>
        <groupId>org.postgresql</groupId>
	<artifactId>postgresql</artifactId>
	<scope>runtime</scope>
</dependency>
```

## Configure Spring Datasource, JPA and App properties

Open `src/main/resources/application.properties`

Add the following lines: 

```
spring.datasource.url=jdbc:postgresql://localhost:5432/vacationhome
spring.datasource.username=postgres
spring.datasource.password=test
spring.datasource.initialization-mode=always

spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation= true
spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.PostgreSQLDialect

spring.jpa.hibernate.ddl-auto=create

# App Properties
vacationhome.app.jwtSecret= vacationhomeSecretKey
vacationhome.app.jwtExpirationMs= 86400000

#Enable multipart uploads
spring.servlet.multipart.enabled = true 
#Threshold after which files are written to disk
spring.servlet.multipart.file-size-threshold=2KB
#Max file size
spring.servlet.multipart.max-file-size= 2MB
#Max Request size
spring.servlet.multipart.max-request-size=2MB
```
## Run Spring Boot 

```
mvn spring-boot:run
```

## Run SQL statements 
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

/*Add apartment/room informations*/
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(0,'1','4', 4 , 'Super cozy apartment which is located on the ground floor of the classic house. This room is perfect for a family of four', true, 'family-comfort', 60, 'family-comfort','family' );
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(1,'2','2', 6 , 'This is the room with the best view. It has a nice balcony which is perfect for summer hangouts! ', true, 'friends-comfort', 65, 'friends-comfort','friends');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(2,'3','2', 2 , 'Suitable for two people who are searching for something more cozy and luxurious', true, 'couple-comfort', 42, 'couple-comfort','couple');

/*Example reservation*/
INSERT INTO "reservation" (id, apartment_id, billing_address, check_in_date, check_out_date, has_room, no_guests, payment, price, reservation_number, email)
VALUES (1, 1, 'testreservation', '2021-03-01','2021-03-03', true, 12, true, 12.9, 1234,'admin@vacationhome.com');


```


##When running the application as an Admin
ONLY FOR TESTING PURPOSES, add the following JSON :

```
{
"username" : "admin",
"email" : "admin@admin.com",
"password" : "123456",
"role" : ["admin"]
}
```


