CREATE DATABASE IF NOT EXISTS sports_cars_db;
USE sports_cars_db;

CREATE TABLE IF NOT EXISTS sport_cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,    
  model VARCHAR(100) NOT NULL,      
  year INT NOT NULL,                
  horsepower INT NOT NULL,          
  price DECIMAL(15,2) NOT NULL      
);

INSERT INTO sport_cars (brand, model, year, horsepower, price) VALUES
('Ferrari', 'F8 Tributo', 2021, 720, 270000.00),
('Lamborghini', 'Huracán EVO', 2020, 640, 250000.00),
('Porsche', '911 Turbo S', 2022, 650, 230000.00);

SHOW DATABASES;