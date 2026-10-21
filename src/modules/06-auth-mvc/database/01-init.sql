-- CREATE
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS campus;
USE campus;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo CHAR(4) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(250),
    precio DECIMAL(8, 2) NOT NULL,
    activo TINYINT CHECK (activo = 0 || activo = 1) DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dpi DECIMAL(13, 0) NOT NULL UNIQUE,
    nombre varchar(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono Varchar(20),
    contrasenia VARCHAR(30) NOT NULL,
    activo TINYINT CHECK (activo = 0 || activo = 1) DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO
INSERT INTO productos (codigo, nombre, descripcion, precio, activo)
VALUES
    ('P001', 'Laptop Lenovo IdeaPad', 'Laptop de 15 pulgadas con 16 GB de RAM y SSD de 512 GB', 649.99, 1),
    ('P002', 'Smartphone Samsung Galaxy', 'Smartphone con pantalla AMOLED y 128 GB de almacenamiento', 499.99, 1),
    ('P003', 'Audífonos inalámbricos Sony', 'Audífonos Bluetooth con cancelación de ruido', 129.50, 1),
    ('P004', 'Teclado mecánico Logitech', 'Teclado mecánico USB con iluminación RGB', 89.99, 1)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    descripcion = VALUES(descripcion),
    precio = VALUES(precio),
    activo = VALUES(activo);

-- Elimina el quinto producto que estaba en las semillas anteriores.
DELETE FROM productos WHERE codigo = 'P005';

INSERT INTO usuarios (dpi, nombre, email, telefono, contrasenia, activo)
VALUES
    (1000000000001, 'Ana Ejemplo', 'ana.ejemplo@example.com', '5550-0001', 'demo-ana-001', 1),
    (1000000000002, 'Luis Prueba', 'luis.prueba@example.com', '5550-0002', 'demo-luis-002', 1),
    (1000000000003, 'Marta Demo', 'marta.demo@example.com', '5550-0003', 'demo-marta-003', 1)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    email = VALUES(email),
    telefono = VALUES(telefono),
    contrasenia = VALUES(contrasenia),
    activo = VALUES(activo);