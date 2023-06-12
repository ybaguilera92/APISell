# APISell
La solución del ejercicio fue desarrollada en NodeJs, para poder correr el servidor debe primeramente tener instalado todos los módulos utilizados en la solución del ejercicio. Dentro del proyecto en la carpeta db/stock está la base de datos echa en MongoDB, es necesario importarla.
La solución posee tres rutas:
/API/USER Para todo lo relacionado con la gestión de usuarios (Es necesario ser Administrador para acceder a las funcionalidades)
/API/PRODUCT Para todo lo relacionado con la gestión de productos (Es necesario ser Administrador o Editor para acceder a algunas funcionalidades, las otras de consulta no poseen autenticación)
/API/SELL Para todo lo relacionado con la venta de productos (Es necesario estar autenticado)
Existe un controlador para los tres modelos: Product, User y Sell. Dentro de cada controlador están las funcionalidades necesarias para completar el ejercicio.
Se realizaron pruebas a cada funcionalidad del sistema utilizando Jest y Supertest
