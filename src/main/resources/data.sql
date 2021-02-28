/*Add apartment/room informations*/
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(0,'1','4', 4 , 'Super cozy apartment which is located on the ground floor of the classic house. This room is perfect for a family of four', true, 'family-comfort', 60, 'family-comfort','family' );
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(1,'2','2', 6 , 'This is the room with the best view. It has a nice balcony which is perfect for summer hangouts! ', true, 'friends-comfort', 65, 'friends-comfort','friends');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(2,'3','2', 2 , 'Suitable for two people who are searching for something more cozy and luxurious', true, 'couple-comfort', 42, 'couple-comfort','couple');

INSERT INTO "application_user" (user_id, address, email, first_name, last_name, password, pho_no, user_name) VALUES (1,'Meranerstrasse9','test@gmail.com','Peter', 'Schmitt', '12345', 123, 'Hagen2013');

/*Roles*/
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

/*Example reservation*/
INSERT INTO "reservation" (id, apartment_id, billing_address, check_in_date, check_out_date, has_room, no_guests, payment, price, reservation_number, email)
VALUES (1, 1, 'meranerstrasse', '2021-03-01','2021-03-03', true, 12, true, 12.9, 1234,'admin@vacationhome.com');
