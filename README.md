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

<details>
<summary><b>1️⃣ Personal Portfolio (<code>portfolio-website</code>)</b></summary>
<br/>
A responsive, visually striking personal portfolio website developed using React and JSX.

*   **Highlights:** Responsive Design, Reusable Components, Custom CSS.
*   **Tech Stack:** React, JSX, HTML5, CSS3, JavaScript.
*   **Key Features:** Navigation Bar, About Me, Education, Skills, Contact Information, Footer.
</details>

<details>
<summary><b>2️⃣ Student Information Management (<code>student-management-system</code>)</b></summary>
<br/>
A comprehensive student information portal that displays student details using highly reusable components and Props.

*   **Highlights:** Data passing with Props, Sorting Algorithms (by CGPA).
*   **Tech Stack:** React, Node.js, Express.js.
*   **Key Features:** Student List & Cards, Dynamic Data Rendering, Avatar integration.
</details>

<details>
<summary><b>3️⃣ Employee Directory (<code>Employee Directory</code>)</b></summary>
<br/>
An interactive Employee Directory application demonstrating robust React State and Event Handling.

*   **Highlights:** Conditional Rendering, Dynamic Filtering, CRUD Operations.
*   **Tech Stack:** React, useState, Context.
*   **Key Features:** Add/Edit/Delete Employee, Search Functionality, Department Filtering.
</details>

<details>
<summary><b>4️⃣ Weather Dashboard (<code>weather-dashboard</code>)</b></summary>
<br/>
A dynamic weather dashboard integrating real-time meteorological data via the OpenWeatherMap API.

*   **Highlights:** Async/Await, Third-Party API Integration, Error Handling.
*   **Tech Stack:** React, Node.js, Fetch API, useEffect.
*   **Key Features:** City Search, Real-time Temp/Humidity/Wind, Sunrise/Sunset Data, Loading States.
</details>

<details>
<summary><b>5️⃣ Premium Online Shopping Cart (<code>premium-shopping-cart</code>)</b></summary>
<br/>
A sophisticated e-commerce cart application demonstrating complex global state management.

*   **Highlights:** Advanced State Management, E-commerce Logic.
*   **Tech Stack:** React, Context API, useReducer, Node.js.
*   **Key Features:** Dynamic Cart Updates, Coupon Logic, GST Calculation, Slide-out Drawer UI.
</details>

<details>
<summary><b>6️⃣ Task Manager with Routing (<code>nexus-task-hub</code>)</b></summary>
<br/>
A single-page task management application with dynamic routing, nested navigation, and full CRUD.

*   **Highlights:** Client-side Routing, URL Parameters, Protected Routes.
*   **Tech Stack:** React, React Router DOM, Node.js, MongoDB.
*   **Key Features:** Dashboard, Task Filtering (Priority, Due Date), Dynamic Task Details.
</details>

<details>
<summary><b>7️⃣ Authentication System (<code>nexus-task-hub</code>)</b></summary>
<br/>
A secure JWT-based authentication system seamlessly integrated into the Task Manager application.

*   **Highlights:** JWT Security, Password Hashing, Session Management.
*   **Tech Stack:** React, Node.js, Express.js, bcryptjs, jsonwebtoken.
*   **Key Features:** Login/Logout, Protected Dashboard, Password Strength Meter, LocalStorage Persistence.
</details>

<details>
<summary><b>8️⃣ Expense Tracker Pro (<code>expense-tracker-pro</code>)</b></summary>
<br/>
A professional-grade Single Page Application (SPA) for recording, categorizing, and analyzing financial transactions with visual analytics.

*   **Highlights:** Data Visualization, Data Persistence, CSV Export.
*   **Tech Stack:** React, Recharts, MongoDB, Express.js.
*   **Key Features:** Interactive Charts (Pie, Bar, Line), Category Filtering, Monthly Summaries.
</details>

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

<div align="center">
  <p>Built with ❤️ and React.</p>
</div>
