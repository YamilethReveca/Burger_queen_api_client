
# Burger Queen Api Client 

## Índice

1. [Descripción del proyecto](#1-descripcion-del-proyecto)
2. [Historias de usuario](#2-historias-de-usuario)
3. [Prototipo de baja y alta fidelidad en Figma](#3-prototipo-de-baja-y-alta-fidelidad-en-figma)
4. [Funcionalidades](#4-funcionalidades)
5. [Pruebas unitarias y Test](#5-pruebas-unitarias-y-test)
6. [Tecnologías utilizadas](#6-tecnologias-utilizadas)
7. [Despliegue en Vercel](#7-despliegue-en-vercel)

## 1. Descripción del proyecto

**Burger Queen Api Client** es una aplicación desarrollada en **Angular 16** que permite gestionar los pedidos de un restaurante de hamburguesas. Está diseñada para ser utilizada por dos roles principales:

- **Mesero:** Puede iniciar sesión y registrar los pedidos de los clientes.
- **Chef:** Puede iniciar sesión y visualizar los pedidos pendientes, en preparación y completados.

### Funcionalidades

- **Login de Mesero:** Los meseros pueden iniciar sesión con sus credenciales para acceder a la vista de pedidos.
- **Generación de Pedidos (Mesero):** Los meseros pueden ingresar los pedidos realizados por los clientes, seleccionando los elementos del menú.
- **Visualización de Órdenes (Chef):** Los cocineros pueden iniciar sesión para acceder a la lista de pedidos pendientes, en proceso y completados, permitiendo gestionar el flujo de trabajo en la cocina.

## 2. Historias de usuario

- **Como mesero**, quiero poder iniciar sesión para registrar los pedidos de los clientes de manera eficiente.
- **Como mesero**, quiero ingresar los pedidos con detalles sobre los productos solicitados para asegurarme de que se preparen correctamente.
- **Como chef**, quiero ver los pedidos pendientes para gestionar la cocina de manera organizada.
- **Como chef**, quiero marcar los pedidos como completados una vez que se hayan preparado.

## 3. Prototipo de baja y alta fidelidad en Figma

Se puede acceder al prototipo de la aplicación en Figma, que muestra tanto las pantallas de baja como alta fidelidad. Aquí podrás ver el diseño de las interfaces de usuario y el flujo de interacción entre las diferentes vistas de la aplicación.


## 4. Funcionalidades

- **Login de usuario:** Implementado con Angular, utiliza autenticación para permitir el acceso a las diferentes vistas según el rol.
- **Generación de pedidos (Mesero):** Permite registrar los pedidos especificando el menú seleccionado.
- **Gestión de pedidos (Chef):** Muestra una lista de pedidos con estado de cada uno: pendiente, en proceso o completado.
- **Interfaz responsiva:** Diseñada para ser utilizada tanto en dispositivos móviles como en escritorio, mejorando la experiencia del usuario.

## 5. Pruebas unitarias y Test

Se han implementado pruebas unitarias utilizando **Jasmine** y **Karma** para garantizar la estabilidad de la aplicación. Las pruebas cubren funcionalidades clave, como la validación de formularios y la correcta gestión de estados en el flujo de pedidos.

- **Pruebas de login:** Aseguran que los usuarios puedan acceder solo con las credenciales correctas.
- **Pruebas de funcionalidad de pedidos:** Verifican que los meseros puedan ingresar pedidos correctamente y que los chefs puedan visualizarlos.

## 6. Tecnologías utilizadas

- **Angular 16:** Framework frontend utilizado para la construcción de la aplicación.
- **HTML/CSS:** Lenguajes de marcado y estilos para crear la estructura y el diseño visual de la aplicación.
- **JavaScript/TypeScript:** Lenguajes de programación utilizados para la lógica y funcionalidades del sistema.
- **Backend:** Este proyecto cuenta con el backend realizado por Laboratoria y se llama [Burger Queen Api Mock](https://github.com/YamilethReveca/Burger_Queen_Api_Mock), donde al seguir los pasos podrás ingresar a esta app.

## 7. Despliegue en Vercel

La aplicación está desplegada en **Vercel** para pruebas y accesibilidad continua. Puedes acceder a la versión en vivo del proyecto [Burger Queen Api Client](https://burger-queen-api-client-sigma.vercel.app/).

---

