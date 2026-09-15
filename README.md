<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  
  <h1>🚀 Advanced React Frontend Development</h1>
  <p><i>A curated collection of professional-grade React applications demonstrating modern frontend architecture, state management, and full-stack integration.</i></p>
</div>

<hr />

## 🌟 Overview

Welcome to the **React Frontend Development Assignments** repository. This collection showcases a series of practical, beautifully crafted React applications developed as part of an advanced coursework. Each project is engineered to highlight specific modern web development concepts, ranging from foundational component architecture to complex global state management and secure authentication.

---

## 📚 Project Portfolio

### 1️⃣ Personal Portfolio (`portfolio-website`)

**Description:**
A responsive, visually striking personal portfolio website developed using React and JSX. This project serves as a digital resume and a comprehensive showcase of modern UI/UX principles and component-based design.

**Learning Objectives:**
- Mastering React component structure (Headers, Footers, Layouts).
- Implementing responsive design principles using modern CSS without external UI libraries.
- Understanding how to modularize UI elements for reusability.

*   **Highlights:** Mobile-first approach, semantic HTML, modular CSS.
*   **Tech Stack:** React, JSX, HTML5, CSS3, JavaScript.
*   **Key Features:** 
    - Dynamic Navigation Bar with smooth section scrolling.
    - Dedicated layout sections for 'About Me', 'Education', and 'Skills'.
    - Highly responsive grid and flexbox layouts.
    - Professional Footer and Contact Information UI.

---

### 2️⃣ Student Information Management (`student-management-system`)

**Description:**
A comprehensive student information portal that displays detailed student profiles. This project focuses heavily on how data flows through a React application using Props.

**Learning Objectives:**
- Deep dive into React `props` and parent-to-child data communication.
- Building highly reusable UI components (like Student Cards).
- Implementing client-side data manipulation and sorting algorithms.

*   **Highlights:** Dynamic Data Rendering, Sorting Logic, Component Reusability.
*   **Tech Stack:** React, Node.js, Express.js.
*   **Key Features:** 
    - Dynamic rendering of a Student List from raw data arrays.
    - Custom Student Cards displaying Name, Roll Number, Department, Semester, and Avatar.
    - Interactive sorting algorithm to rank students by their CGPA.

---

### 3️⃣ Employee Directory (`Employee Directory`)

**Description:**
An interactive Employee Directory application that acts as a fully functional dashboard. This project is a masterclass in React State and Event Handling.

**Learning Objectives:**
- Managing complex local state using the `useState` hook.
- Handling form submissions, inputs, and complex user interactions.
- Implementing dynamic data filtering and conditional rendering.

*   **Highlights:** Full CRUD capabilities in memory, Live Search, Conditional Rendering.
*   **Tech Stack:** React, useState, Event Handling, CSS.
*   **Key Features:** 
    - Forms to Add, Edit, and Delete employee records.
    - Real-time search functionality by employee name.
    - Dynamic filtering to view employees by specific Departments.
    - Real-time statistics, such as total employee count.

---

### 4️⃣ Weather Dashboard (`weather-dashboard`)

**Description:**
A dynamic weather dashboard integrating real-time meteorological data via the OpenWeatherMap API. This project bridges the gap between the frontend UI and third-party backend services.

**Learning Objectives:**
- Mastering asynchronous JavaScript with `async/await` and the Fetch API.
- Managing side effects in React using the `useEffect` hook.
- Gracefully handling API loading states and error boundaries.

*   **Highlights:** Real-time data fetching, Environment Variables, Error Handling.
*   **Tech Stack:** React, Node.js, OpenWeatherMap API, Fetch API, useEffect.
*   **Key Features:** 
    - Dynamic City Search with live API querying.
    - Displaying live data: Temperature, Humidity, Wind Speed, Weather Icons.
    - Displaying calculated Sunrise & Sunset information.
    - Custom loading spinners while data is fetching.

---

### 5️⃣ Premium Online Shopping Cart (`premium-shopping-cart`)

**Description:**
A sophisticated e-commerce cart application. This is one of the more advanced projects, demonstrating how to handle complex global state that needs to be accessed by deeply nested components.

**Learning Objectives:**
- Escaping "prop drilling" using the React Context API.
- Managing complex state transitions and business logic using `useReducer`.
- Structuring a modern e-commerce application.

*   **Highlights:** Global State Management, E-commerce Logic, Interactive UI.
*   **Tech Stack:** React, Context API, useReducer, Node.js, Express.js.
*   **Key Features:** 
    - Add to Cart and Remove Item functionalities.
    - Dynamic quantity update controls with inventory limits.
    - Real-time Grand Total calculations including automated GST additions.
    - Coupon Code logic applying percentage-based discounts.
    - Smooth slide-out cart drawer UI.

---

### 6️⃣ Task Manager with Routing (`nexus-task-hub`)

**Description:**
A powerful Single Page Application (SPA) for task management. This project moves beyond single-view apps and introduces client-side routing to manage multiple pages and URLs without refreshing the browser.

**Learning Objectives:**
- Implementing client-side routing with React Router DOM.
- Using URL Parameters to render dynamic views.
- Building full MERN stack CRUD features with a MongoDB database.

*   **Highlights:** Client-side Routing, Dynamic URLs, Nested Navigation.
*   **Tech Stack:** React, React Router DOM, Node.js, Express.js, MongoDB.
*   **Key Features:** 
    - Interactive Dashboard showing task metrics.
    - Dynamic Task List displaying Priority, Category, Due Date, and Status.
    - Dedicated views for adding tasks and viewing specific task details based on the URL ID.
    - Completed Tasks filter and categorization.

---

### 7️⃣ Authentication System (`nexus-task-hub`)

**Description:**
A secure JWT-based authentication system seamlessly integrated into the Task Manager application. This project focuses entirely on application security, session management, and protecting user data.

**Learning Objectives:**
- Implementing secure JSON Web Token (JWT) authentication flows.
- Hashing passwords securely on the backend using bcryptjs.
- Creating protected routes that redirect unauthorized users.

*   **Highlights:** JWT Security, Password Hashing, Route Protection, Session Persistence.
*   **Tech Stack:** React, Context API, Node.js, Express.js, bcryptjs, jsonwebtoken.
*   **Key Features:** 
    - Full Login & Logout functionality.
    - Protected Dashboard routing that requires a valid token.
    - Persistent sessions using `localStorage` / `sessionStorage`.
    - Real-time password strength meter and robust form validation.

---

### 8️⃣ Expense Tracker Pro (`expense-tracker-pro`)

**Description:**
A professional-grade financial tracking SPA focused on data visualization and persistence. This app allows users to record, categorize, and visually analyze their financial transactions over time.

**Learning Objectives:**
- Integrating third-party data visualization libraries (Recharts) into React.
- Persisting complex user data locally and syncing with a database.
- Building complex analytical dashboards.

*   **Highlights:** Interactive Data Visualization, Data Exporting, Controlled Components.
*   **Tech Stack:** React, Recharts, Node.js, Express.js, MongoDB.
*   **Key Features:** 
    - Interactive Line, Bar, and Pie charts mapping expenses vs income.
    - Forms to add and delete categorized expenses.
    - Monthly financial summaries and category-based filtering.
    - Ability to export transaction data directly to a CSV file.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, JSX, React Router DOM, Context API, useReducer |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Styling & UI** | CSS3, Recharts, Responsive Design |
| **Security & Utilities**| JWT (jsonwebtoken), bcryptjs, OpenWeatherMap API |

---

## 🗂️ Repository Structure

```text
📦 react-frontend-assignments
 ┣ 📂 Employee Directory          # React State & Event Handling
 ┣ 📂 expense-tracker-pro         # Data Visualization & SPA
 ┣ 📂 nexus-task-hub              # Routing, CRUD & JWT Authentication
 ┣ 📂 portfolio-website           # Component-based Architecture
 ┣ 📂 premium-shopping-cart       # Context API & useReducer
 ┣ 📂 student-management-system   # Props & Reusable Components
 ┣ 📂 weather-dashboard           # API Integration & Async/Await
 ┗ 📜 README.md                   # Project Documentation
```

---

## 🚀 Getting Started

To explore any of these projects locally, follow these general steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Anubhav2321/react-frontend-assignments.git
    cd react-frontend-assignments
    ```

2.  **Navigate to a specific project directory:**
    ```bash
    cd <project-folder-name>
    ```

3.  **Install dependencies:**
    *   For projects with separate backend/frontend folders, you may need to install dependencies in both.
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Configure Environment Variables:**
    *   Some projects (like `weather-dashboard` or `nexus-task-hub`) require `.env` files for API keys or Database URIs. Create a `.env` file based on the provided `.env.example` (if any).

5.  **Run the development server:**
    ```bash
    npm start
    # or
    npm run dev
    ```

---

## 👨‍💻 About the Author

**Anubhav**  
Passionate Frontend Developer focusing on React and modern web architectures.

*   **GitHub:** [@Anubhav2321](https://github.com/Anubhav2321)
*   **LinkedIn:** [Your LinkedIn Profile URL] *(Update this link)*
*   **Email:** [Your Email Address] *(Update this link)*

*Feel free to reach out if you have any questions, feedback, or just want to collaborate on exciting projects!*

---

<div align="center">
  <p>Built with ❤️ and React.</p>
</div>
