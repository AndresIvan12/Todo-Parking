CREATE DATABASE todoParking IF NOT EXISTS;

\c todoParking;

CREATE TABLE Usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL,
  nro_anuncios INTEGER,
  fecha_nacimiento DATE NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL
);

CREATE TABLE Estacionamiento (
  id_estacionamiento SERIAL PRIMARY KEY,
  superficie_total VARCHAR (255),
  tipo VARCHAR (50),
  acceso VARCHAR (255),
  tipo_cobertura VARCHAR (255),
  gastos_comunes INTEGER,
  direccion VARCHAR (255)
);

CREATE TABLE Anuncio (
  id_anuncio SERIAL PRIMARY KEY NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  precio INTEGER NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  estado VARCHAR(20) NOT NULL,
  fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INTEGER NOT NULL references Usuario(id_usuario),
  id_estacionamiento INTEGER NOT NULL references Estacionamiento(id_estacionamiento)
);

CREATE TABLE ImagenAnuncio (
  id_imagenAnuncio SERIAL PRIMARY KEY NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_anuncio INTEGER NOT NULL references Anuncio(id_anuncio)
);

INSERT INTO Usuario (nombre, apellido, tipo_usuario, nro_anuncios, fecha_nacimiento, direccion, correo, telefono)
VALUES ('Juan', 'Perez', 'admin', 0, '2000-01-01', 'Calle falsa 123', 'juan@gmail.com','123456789');

INSERT INTO Estacionamiento (superficie_total, tipo, acceso, tipo_cobertura, gastos_comunes, direccion)
VALUES ('100', 'Casa', 'Público', 'Cobertura', '100', 'Calle falsa 123');

INSERT INTO Anuncio  (titulo, precio, descripcion, estado, id_usuario, id_estacionamiento)
VALUES ('Estacionamiento en arriendo', '200', 'Arriendo estacionamiento en la calle falsa 123', 'Disponible', 1, 1);

INSERT INTO ImagenAnuncio (nombre, fecha, id_anuncio)
VALUES ('imagen1.jpg', '2022-01-01', 1);