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

-- INSERT INTO
INSERT INTO productos (codigo, nombre, descripcion, precio, activo)
VALUES
    ('P001', 'Cuaderno universitario', 'Cuaderno de 100 hojas rayadas', 3.50, 1),
    ('P002', 'Bolígrafo azul', 'Bolígrafo de tinta azul de punta mediana', 0.75, 1),
    ('P003', 'Mochila escolar', 'Mochila con compartimento para portátil', 28.90, 1),
    ('P004', 'Regla de plástico', 'Regla transparente de 30 cm', 1.20, 1),
    ('P005', 'Marcador negro', 'Marcador permanente de punta fina', 1.85, 0)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    descripcion = VALUES(descripcion),
    precio = VALUES(precio),
    activo = VALUES(activo);

-- SELECT * FROM productos;

-- SELECT id, codigo, nombre, descripcion, precio, activo, creado_en FROM productos;