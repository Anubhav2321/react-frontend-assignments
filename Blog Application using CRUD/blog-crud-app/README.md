# BlogSphere - Modern CRUD Blog Application

## Project Overview
BlogSphere is a complete, polished, and production-quality Blog Application developed to fulfill the Assignment 9 requirements. It demonstrates comprehensive CRUD operations (Create, Read, Update, Delete) against a RESTful mock API powered by JSON Server. The application goes beyond basic functionalities, offering a premium and responsive UI inspired by modern SaaS and editorial websites.

## Features
- **Full CRUD Operations**: Seamlessly create, read, update, and delete blog posts.
- **Responsive Premium UI**: Glassmorphic design elements, smooth hover interactions, and layouts that adapt flawlessly to mobile, tablet, and desktop screens.
- **Dark Mode / Light Mode**: Built-in theming system relying on CSS variables, with user preference persisted in local storage.
- **Live Word Counter**: Real-time validation enforcing a strict maximum limit of 1000 words for blog content.
- **Search Functionality**: A dynamic search bar allowing users to filter blogs instantaneously by title, author, or content keywords.
- **Multimedia Support**: Integration for cover images via URL and embeddable YouTube videos.
- **Robust Error Handling & Loading States**: Clean visual feedback during data fetching, API failures, and empty data scenarios.
- **Elegant Toast Notifications**: Non-intrusive feedback messages for successful or failed operations, avoiding legacy browser alerts.

## Technology Stack
- **Frontend Framework**: React.js (Bootstrapped with Vite)
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS with modern standard custom properties (variables)
- **Icons**: Lucide React
- **Backend / API**: Node.js + JSON Server

## Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone or extract the repository**
2. **Navigate to the project root:**
   ```bash
   cd blog-crud-app
   ```

### Backend Setup (JSON Server)
1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the JSON Server:**
   ```bash
   npm run server
   ```
   *The server will run on [http://localhost:3001](http://localhost:3001) and watch the `db.json` file for changes.*

### Frontend Setup (Vite + React)
1. Open a new terminal tab/window.
2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the React application:**
   ```bash
   npm run dev
   ```
   *The application will typically start on [http://localhost:5173](http://localhost:5173).*

## API Endpoints & CRUD Operations
All interactions are managed centrally within `src/services/blogApi.js`. 
- **Read All (GET)**: `GET /blogs` - Retrieves the full list of published blogs.
- **Read Single (GET)**: `GET /blogs/:id` - Fetches detailed data for a specific blog post.
- **Create (POST)**: `POST /blogs` - Submits a new blog entry (validates payload before sending).
- **Update (PUT)**: `PUT /blogs/:id` - Modifies an existing blog entry.
- **Delete (DELETE)**: `DELETE /blogs/:id` - Removes a blog from the database following user confirmation.

## Key Technical Specifications

### 1000-Word Limitation
The application includes a strict validation requirement for blog content. Using the `utils/wordCounter.js` utility, the content length is evaluated dynamically based on real words (not character counts). As the user approaches the 1000-word limit, the UI provides visual color-coded warnings (Normal → Warning → Strong Warning → Error). Upon exceeding the limit, submission is structurally prevented.

### Dark / Light Mode
A robust theming strategy leverages CSS custom properties. The `useTheme.js` custom hook reads the system's preferred color scheme initially and allows manual toggling. The chosen theme string is saved into `localStorage` (as `blog-theme`), ensuring that the preference persists across browser reloads.

### Search Functionality
Located intuitively on the Home page, the search functionality provides instantaneous, case-insensitive, client-side filtering. It matches the query string against the blog's `title`, `author`, and `content`, gracefully presenting an empty state if no matches are found.
