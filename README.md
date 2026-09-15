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

The primary goal of this repository is to demonstrate a progressive learning curve, moving from static UI development to dynamic, data-driven Single Page Applications (SPAs).

---

## 📚 Project Portfolio

### 1️⃣ Personal Portfolio (`portfolio-website`)

**Project Overview:**
A responsive, visually striking personal portfolio website developed using React and JSX. This project serves as a digital resume and a comprehensive showcase of modern UI/UX principles and component-based design. It is built entirely from scratch without relying on heavy external CSS frameworks (like Bootstrap or Tailwind), emphasizing a deep understanding of core web technologies.

**Core Learning Objectives:**
- **Component Architecture:** Mastering React component structure by breaking down a single page into modular pieces (Headers, Footers, Hero sections).
- **Responsive Styling:** Implementing mobile-first responsive design principles using modern CSS Grid and Flexbox.
- **UI/UX Principles:** Understanding how to structure information hierarchically for maximum user engagement.

**Technical Highlights:**
- **Mobile-first approach:** Ensures perfect rendering on devices of all screen sizes.
- **Semantic HTML5:** Improves overall accessibility (a11y) and SEO.
- **Tech Stack:** React, JSX, HTML5, CSS3, JavaScript.

**Key Features & Functionality:**
- **Dynamic Navigation:** Sticky navigation bar with smooth section scrolling.
- **Dedicated Layouts:** Sections for 'About Me', 'Education', 'Skills', and 'Experience'.
- **Interactive UI:** Smooth hover effects, CSS transitions, and an interactive Contact form UI.

**Real-World Application:**
Provides a foundational understanding of how to build and deploy static landing pages and promotional sites—a crucial skill for freelance web developers.

---

### 2️⃣ Student Information Management (`student-management-system`)

**Project Overview:**
A comprehensive student information portal that displays detailed student profiles. This project focuses heavily on how data flows through a React application, moving away from hardcoded HTML into dynamic array mapping.

**Core Learning Objectives:**
- **Props & Data Flow:** Deep dive into React `props` and unidirectional (parent-to-child) data communication.
- **Component Reusability:** Building highly reusable UI components, such as generic "Profile Cards".
- **Data Manipulation:** Implementing client-side data manipulation and sorting algorithms based on user input.

**Technical Highlights:**
- **Dynamic Data Rendering:** Mapping over complex JSON data structures to render UI dynamically.
- **Sorting Logic:** Custom JavaScript sorting functions integrated directly into React's render cycle.
- **Tech Stack:** React, Node.js, Express.js.

**Key Features & Functionality:**
- **Dynamic Student List:** Renders dozens of students efficiently from an array of objects.
- **Custom Student Cards:** Displays intricate details including Name, Roll Number, Department, Semester, and Avatar images.
- **Interactive Sorting:** Users can click to rank the student list dynamically by their CGPA (Highest to Lowest, etc.).

**Real-World Application:**
Teaches the core mechanics needed to build directory sites, e-commerce product listings, or any application that displays large lists of repeated data.

---

### 3️⃣ Employee Directory (`Employee Directory`)

**Project Overview:**
An interactive Employee Directory application that acts as a fully functional dashboard. This project is a masterclass in React State and Event Handling, introducing the concept of mutating data in real-time based on user actions.

**Core Learning Objectives:**
- **Local State Management:** Managing complex, changing data using the `useState` hook.
- **Event Handling:** Handling form submissions, keyboard inputs, and button clicks.
- **Conditional Rendering:** Showing or hiding UI elements (like modals or warning messages) based on current state variables.

**Technical Highlights:**
- **In-Memory CRUD:** Full Create, Read, Update, and Delete capabilities handled entirely on the client side.
- **Live Filtering:** Instant UI updates based on search query strings.
- **Tech Stack:** React, useState, Event Handling, CSS.

**Key Features & Functionality:**
- **Form Integration:** Robust forms to Add new employees or Edit existing records.
- **Real-time Search:** A search bar that filters the employee list instantly by name as the user types.
- **Department Filtering:** Dropdown filters to view employees belonging only to specific Departments (e.g., HR, Engineering).
- **Dashboard Statistics:** Real-time metrics showing total employee count and department distributions.

**Real-World Application:**
The foundation for building internal company tools, admin panels, and CRM (Customer Relationship Management) dashboards.

---

### 4️⃣ Weather Dashboard (`weather-dashboard`)

**Project Overview:**
A dynamic weather dashboard integrating real-time meteorological data via the OpenWeatherMap API. This project bridges the gap between the frontend UI and third-party backend services over the internet.

**Core Learning Objectives:**
- **Asynchronous JavaScript:** Mastering network requests using `async/await` and the Fetch API.
- **Side Effects:** Managing side effects in React using the `useEffect` hook (e.g., fetching data when the component loads).
- **Error Boundaries:** Gracefully handling API loading states, timeout errors, and invalid user inputs.

**Technical Highlights:**
- **REST API Integration:** Parsing and utilizing complex JSON payloads from external servers.
- **Environment Variables:** Securely storing API keys locally using `.env` files.
- **Tech Stack:** React, Node.js, OpenWeatherMap API, Fetch API, useEffect.

**Key Features & Functionality:**
- **Live City Search:** Dynamic search functionality querying the API for specific global locations.
- **Real-Time Metrics:** Displays live Temperature, Humidity, Wind Speed, and dynamic Weather Icons based on current conditions.
- **Astronomical Data:** Calculates and displays local Sunrise & Sunset times.
- **UX Enhancements:** Custom loading spinners and friendly error messages for "City Not Found".

**Real-World Application:**
Essential training for building modern apps that rely on external data sources (like stock tickers, news aggregators, or social media feeds).

---

### 5️⃣ Premium Online Shopping Cart (`premium-shopping-cart`)

**Project Overview:**
A sophisticated e-commerce cart application. This is one of the more advanced projects, designed to solve the problem of "prop drilling" by handling complex global state that needs to be accessed by deeply nested components across the application.

**Core Learning Objectives:**
- **Context API:** Using React Context to create a global state accessible from anywhere in the component tree.
- **Complex State Logic:** Managing complex state transitions and business logic using the `useReducer` hook (similar to Redux).
- **E-commerce Architecture:** Structuring a modern e-commerce application UI.

**Technical Highlights:**
- **Global State Management:** Seamlessly sharing cart data between the Product List, the Header (cart icon), and the Checkout Drawer.
- **Mathematical Logic:** Real-time calculation of taxes, subtotals, and coupon deductions.
- **Tech Stack:** React, Context API, useReducer, Node.js, Express.js.

**Key Features & Functionality:**
- **Cart Interactions:** Add to Cart, Remove Item, and dynamic quantity update controls.
- **Inventory Limits:** Prevents users from adding more items than are supposedly in stock.
- **Financial Calculations:** Real-time Grand Total calculations including automated GST (tax) additions.
- **Coupon System:** Logic for applying valid text-based promo codes for percentage discounts.
- **Sleek UI:** Smooth, animated slide-out cart drawer interface.

**Real-World Application:**
Provides the exact architecture needed to build frontend interfaces for platforms like Shopify, Amazon, or any digital storefront.

---

### 6️⃣ Task Manager with Routing (`nexus-task-hub`)

**Project Overview:**
A powerful Single Page Application (SPA) for task management. This project moves beyond single-view applications and introduces client-side routing to manage multiple distinct "pages" and URLs without ever refreshing the browser.

**Core Learning Objectives:**
- **Client-Side Routing:** Implementing the `react-router-dom` library to intercept URL changes and swap components.
- **Dynamic Routing:** Using URL Parameters (e.g., `/tasks/:id`) to fetch and render dynamic views.
- **MERN Integration:** Building full-stack CRUD features connected to a real MongoDB database via an Express backend.

**Technical Highlights:**
- **Nested Navigation:** Complex UI structures where only parts of the screen re-render upon navigation.
- **Database Connectivity:** Storing tasks permanently in a NoSQL database.
- **Tech Stack:** React, React Router DOM, Node.js, Express.js, MongoDB.

**Key Features & Functionality:**
- **Interactive Dashboard:** A high-level overview showing upcoming deadlines and task metrics.
- **Detailed Task List:** Displays Priority (High/Medium/Low), Category, Due Date, and Completion Status.
- **Dynamic Views:** Dedicated URLs for adding new tasks, editing existing ones, and viewing specific task details.
- **Smart Filtering:** Options to filter out completed tasks or view tasks by specific categories.

**Real-World Application:**
The standard architecture for building complex web applications like Jira, Trello, or customized productivity software.

---

### 7️⃣ Authentication System (`nexus-task-hub`)

**Project Overview:**
A secure JWT-based authentication system seamlessly integrated into the Task Manager application. This project focuses entirely on application security, session management, and protecting user data from unauthorized access.

**Core Learning Objectives:**
- **Authentication Flows:** Implementing secure JSON Web Token (JWT) login and registration flows.
- **Data Security:** Hashing passwords securely on the backend using `bcryptjs` before storing them in the database.
- **Route Protection:** Creating Higher-Order Components (HOCs) to protect specific React Router routes and redirect unauthorized users.

**Technical Highlights:**
- **Token Management:** Securely storing and attaching JWTs to HTTP Authorization headers for API requests.
- **Session Persistence:** Utilizing browser APIs to keep users logged in across page refreshes.
- **Tech Stack:** React, Context API, Node.js, Express.js, bcryptjs, jsonwebtoken.

**Key Features & Functionality:**
- **Full Auth Cycle:** Complete Login, Registration, and secure Logout functionality.
- **Protected Dashboard:** The entire task management suite is locked behind an authentication wall.
- **Session Persistence:** Remembers users using `localStorage` / `sessionStorage`.
- **UI Feedback:** Real-time password strength meters during signup and robust form validation errors.

**Real-World Application:**
An absolute necessity for any application that handles private user data, encompassing 90% of modern SaaS (Software as a Service) platforms.

---

### 8️⃣ Expense Tracker Pro (`expense-tracker-pro`)

**Project Overview:**
A professional-grade financial tracking SPA focused heavily on data visualization and persistence. This application allows users to record, categorize, and visually analyze their financial transactions over time, providing immediate graphical feedback.

**Core Learning Objectives:**
- **Data Visualization:** Integrating complex third-party charting libraries (`Recharts`) into a React ecosystem.
- **Data Transformation:** Converting raw transaction data into formatted datasets required by charting libraries.
- **Complex UI Forms:** Handling multiple input types (dates, numbers, text, selects) via Controlled Components.

**Technical Highlights:**
- **Interactive Charts:** High-performance SVG-based charts that re-render instantly when data changes.
- **Data Exporting:** Generating downloadable files directly from the browser's memory.
- **Tech Stack:** React, Recharts, Node.js, Express.js, MongoDB.

**Key Features & Functionality:**
- **Visual Analytics:** Interactive Line charts (expense trends), Bar charts (income vs expense), and Pie charts (category breakdowns).
- **Transaction Management:** Detailed forms to log daily expenses with timestamps and categories.
- **Advanced Filtering:** View monthly financial summaries or filter transactions by specific categories (Food, Transport, Utilities).
- **Export Capabilities:** Ability to export the entire transaction history directly to a CSV file for Excel/Sheets.

**Real-World Application:**
Teaches the skills required to build FinTech applications, banking dashboards, analytics platforms, and reporting tools.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React.js (v18+), JSX |
| **Routing & State** | React Router DOM, Context API, useReducer, Custom Hooks |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Styling & UI** | CSS3, CSS Grid/Flexbox, Recharts (Data Viz) |
| **Security & Auth**| JSON Web Tokens (JWT), bcryptjs |
| **Third-Party Services**| OpenWeatherMap REST API |

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

## 🚀 Getting Started & Installation

To explore any of these projects locally on your machine, follow these steps:

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
    *   *Note: For projects with separate backend and frontend folders (like `nexus-task-hub`), you will need to open two terminal windows and install dependencies in both folders.*
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Configure Environment Variables (If Applicable):**
    *   Projects connecting to APIs or databases (like `weather-dashboard` or `nexus-task-hub`) require a `.env` file. 
    *   Duplicate the provided `.env.example` file, rename it to `.env`, and insert your own API keys or local MongoDB URI string.

5.  **Run the development server:**
    ```bash
    npm start
    # or
    npm run dev
    ```
    *The application should now be running on `http://localhost:3000` or `http://localhost:5173` (depending on the build tool).*

---

## 👨‍💻 About the Author

**Anubhav**  
Passionate Frontend Developer focusing on React and modern web architectures. Dedicated to building clean, scalable, and user-centric web applications.

*   **GitHub:** [@Anubhav2321](https://github.com/Anubhav2321)
*   **LinkedIn:** [Your LinkedIn Profile URL] *(Update this link)*
*   **Email:** [Your Email Address] *(Update this link)*

*Feel free to reach out if you have any questions, feedback, or just want to collaborate on exciting projects!*

---

<div align="center">
  <p>Built with ❤️ and React.</p>
</div>
