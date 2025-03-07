# Recipe Book Application


## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [Challenges and Solutions](#challenges-and-solutions)
9. [Contributing](#contributing)
10. [License](#license)

---

## Introduction

The **Recipe Book Application** is a full-stack web application that allows users to manage their favorite recipes. Users can add, view, edit, and reorder recipes using an intuitive drag-and-drop interface. The app is built with a **React frontend**, **Express.js backend**, and **MongoDB database**.

---

## Features

- **Add Recipes**: Add new recipes with details like name, cuisine, ingredients, instructions, and more.
- **View Recipes**: Browse recipes in a grid layout with images and quick info.
- **Edit Recipes**: Update recipe details easily.
- **Drag-and-Drop Reordering**: Reorder recipes using a smooth drag-and-drop interface.
- **Pagination**: Navigate through recipes with pagination support.
- **Surprise Me**: Get a random recipe suggestion with the click of a button.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **@dnd-kit**: A library for implementing drag-and-drop functionality.
- **Lucide Icons**: A collection of customizable icons for the UI.

### Backend
- **Express.js**: A Node.js framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing recipe data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

### Tools
- **Axios**: For making HTTP requests to the backend.
- **Express-validator**: For validating API requests.
- **Dotenv**: For managing environment variables.

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DnyaneshwarKalwale/frontend-recipeapp.git
   cd recipe-book-app