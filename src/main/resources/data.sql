/*Add apartment/room information*/
/*
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(0,'1','4', 4 , 'Super cozy apartment which is located on the ground floor of the classic house. This room is perfect for a family of four', true, 'family-comfort', 60, 'family-comfort','family' );
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(1,'2','2', 6 , 'This is the room with the best view. It has a nice balcony which is perfect for summer hangouts! ', true, 'friends-comfort', 65, 'friends-comfort','friends');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds,capacity, description, featured, name,price, slug, type) VALUES(2,'3','2', 2 , 'Suitable for two people who are searching for something more cozy and luxurious', true, 'couple-comfort', 42, 'couple-comfort','couple');
*/
/*Roles*/
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

/*
INSERT INTO users (id, email, password, username) VALUES (1, 'test@gmail.com', 123123, 'admin');
INSERT INTO user_roles(user_id, role_id) VALUES(1,1);
INSERT INTO users (id, email, password, username) VALUES (2, 'test1@gmail.com', 23123, 'user');
INSERT INTO user_roles(user_id, role_id) VALUES(2,2);
INSERT INTO users (id, email, password, username) VALUES (3, 'test12@gmail.com', 123123, 'test12312');
INSERT INTO user_roles(user_id, role_id) VALUES(3,2);*/

/*Example reservation*/
INSERT INTO "reservation" (id, apartment_id, billing_address, check_in_date, check_out_date, has_room, no_guests, payment, price, reservation_number, email)
VALUES (2, 1, 'testreservation', '2021-03-01','2021-03-03', true, 12, true, 12.9, 1234,'admin@vacationhome.com');


