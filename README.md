# ECommerce CMS (Admin Panel)

A modern **E-commerce Dashboard** built with **Angular, Reactive Forms, and JSON Server**.
This project demonstrates a scalable CMS architecture for managing products, orders, and users with reusable components and modular design.

## Features

* Admin Dashboard with statistics
* Product Management (CRUD)
* Order Management (CRUD)
* Pagination and reusable table UI
* Reusable form components with modal architecture
* Dynamic product categories
* Dark mode support
* Responsive layout
* API layer using Angular HttpClient
* JSON Server mock backend

## Tech Stack

* Angular (Standalone Components)
* TypeScript
* Reactive Forms
* Tailwind CSS
* JSON Server (mock API)

## Project Structure

```
src/app
 ├── admin
 │    ├── dashboard
 │    ├── products
 │    ├── orders
 │
 ├── shared
 │    ├── components
 │    ├── ui
 │
 ├── core
 │    ├── services
 │    ├── interceptors
```

## Running the Project

Install dependencies:

```
npm install
```

Start JSON Server:

```
npm run server
```

Run Angular app:

```
ng serve
```

Application runs at:

```
http://localhost:4200
```

## Backend

The project uses **JSON Server** as a mock backend.

Data collections:

* users
* categories
* products
* orders
* cart

## Purpose

This project was built as a **portfolio-ready Angular application** demonstrating:

* reusable architecture
* scalable UI system
* CRUD workflows
* modular Angular development
