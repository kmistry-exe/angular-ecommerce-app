# ECommerce CMS (Admin Panel)

A modern **E-commerce Dashboard** built with **Angular, Reactive Forms, and JSON Server**.
This project demonstrates a scalable CMS architecture for managing products, orders, and users with reusable components and modular design.

## Live Demo

- Live App: https://ecommercek28.netlify.app/
- GitHub Repository: https://github.com/kmistry-exe/angular-ecommerce-app
_User module with authentication, cart, and customer order history is planned and will be added in upcoming updates._

## Screenshots

Add screenshots of key sections of the application.

* Login
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/120ba432-6052-4a7c-b1d1-74f69e9d7a29" />

* Dashboard
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/19715977-0e56-423a-842a-e88a16a44b3b" />

* Products Management
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/64a306e0-b76c-4e8c-ba57-b6452eb85a15" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/065fa9ea-f42f-4d80-86e4-68940068a6c7" />

* Orders Module
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/2489a8f8-6e3c-47b4-8040-b6924b9774bc" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/a787989a-e718-43fa-86f7-d9e8000c537f" />

* Dark Mode
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/a4da0c53-94d5-4849-848f-dba583c500c3" />

* Demo Mode
<img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/1680dad5-42cb-4cce-8048-bbb12815eba4" />

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

## Demo Mode

The application includes a **Demo Mode** enabled by default for all users.
*   **Explore**: Navigate all modules and view details without logging in.
*   **Restricted Actions**: Create, Update, and Delete actions are disabled in Demo Mode. Hovering over restricted buttons will display a message.
*   **Admin Access**: Click the **Login** button in the sidebar to enter Admin Mode.

> [!NOTE]
> **Admin Session Timeout**: Admin sessions will automatically expire after **30 minutes of inactivity**. Any user activity (mouse movement, typing, clicking) will reset this timer.

## Tech Stack

* Angular (Standalone Components)
* TypeScript
* Reactive Forms
* Tailwind CSS
* JSON Server (mock API)

## Admin Credentials

To test full CRUD functionality in the Live Demo or locally, use:

| Email | Password |
| :--- | :--- |
| `admin@angular.com` | `admin@Angular123` |


## Running the Project

Install dependencies:

```
npm install
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

This is a demo project deployed on Netlify for portfolio and learning purposes.

* reusable architecture
* scalable UI system
* CRUD workflows
* modular Angular development
