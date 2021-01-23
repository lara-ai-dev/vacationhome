INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night) VALUES(0,'1','4','59.95');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night) VALUES(1,'2','2','40.95');
INSERT INTO "apartment" (apartment_id, apartment_number,available_beds, price_per_night) VALUES(2,'3','2','40.95');

INSERT INTO "application_user" (user_id, address, email, first_name, last_name, password, pho_no, user_name) VALUES (1,'Meranerstrasse9','test@gmail.com','Peter', 'Schmitt', '12345', 123, 'Hagen2013');

INSERT INTO role(name) VALUES('ROLE_USER');
INSERT INTO role(name) VALUES('ROLE_ADMIN');