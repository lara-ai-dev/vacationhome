INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night,capacity, description, featured, name,price, slug, type) VALUES(0,'1','4','59.95', 1 , 'hello', true, 'single-economy', 123, 'single-economy','single' );
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night,capacity, description, featured, name,price, slug, type) VALUES(1,'2','2','40.95', 1 , 'hello', false, 'double-economy', 123, 'double-economy','double');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night,capacity, description, featured, name,price, slug, type) VALUES(2,'3','2','40.95', 1 , 'hello', true, 'three-economy', 123, 'three-economy','three');

INSERT INTO "application_user" (user_id, address, email, first_name, last_name, password, pho_no, user_name) VALUES (1,'Meranerstrasse9','test@gmail.com','Peter', 'Schmitt', '12345', 123, 'Hagen2013');

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');




INSERT INTO "reservation" (id, apartment_id, billing_address, check_in_date, check_out_date, has_room, no_guests, payment, price, reservation_number, email)
VALUES (1, 1, 'meranerstrasse', '2021-01-01','2021-01-03', true, 12, true, 12.9, 1234,'admin@vacationhome.com');
/*INSERT INTO "reservation" (id, apartment_id, billing_address, check_in_date, check_out_date, has_room, no_guests, payment, price, reservation_number, email)
VALUES (2, 1, 'meranerstrasse', '2021-06-22 19:10:25-07','2016-06-22 19:10:25-07', true, 12, true, 12.9, 1234,'admin@vacationhome.com');
*/