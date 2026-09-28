# CineGlass – Movie Search Application

## Project Description
CineGlass is a premium, modern cinematic movie discovery platform. It allows users to search for movies, view comprehensive details, explore ratings, and build their personal favorites collection. This project is a frontend-only React application designed with clean architecture and professional UI/UX, ideal for a college assignment submission.

## Features
- **Movie Search**: Find movies, series, and episodes using the OMDb API.
- **Debouncing**: Optimizes API requests by delaying the search until the user stops typing, avoiding unnecessary network calls.
- **Search Optimization**: Handles loading states, empty inputs, and API errors gracefully.
- **Movie Details**: View rich metadata, plots, and posters for any selected movie.
- **Ratings Display**: Shows ratings from IMDb, Rotten Tomatoes, and Metacritic in elegant glass cards.
- **Pagination**: Browse through multiple pages of search results cleanly.
- **Favorites Collection**: Save favorite movies and view them later.
- **LocalStorage Integration**: Persists the favorites list even after browser refresh.
- **Responsive UI**: Adapts perfectly to desktop, tablet, and mobile devices using CSS Grid.
- **Premium Glassmorphism Design**: Cinematic dark UI with smooth interactions and professional typography.

## Technologies
- React (Functional Components, Hooks)
- Vite (Build Tool)
- JavaScript (ES6+)
- CSS3 (Variables, Grid, Flexbox, Glassmorphism)
- OMDb API
- Lucide React (Icons)
- React Router DOM (Navigation)

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **API Setup**
   Create a `.env` file in the root directory and add your OMDb API key:
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```
   *Note: Because this is a frontend-only application, the API key will be visible in the network tab. In a production environment, requests should be proxied through a secure backend.*

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Project Structure
- `src/components/`: Reusable UI elements (Navbar, MovieCard, SearchBar, Pagination).
- `src/pages/`: Main views of the application (Home, MovieDetails, Favorites).
- `src/utils/storage.js`: LocalStorage logic for managing favorites.
- `src/hooks/useDebounce.js`: Custom hook for optimizing search inputs.
- `src/api.js`: All OMDb API integration functions.
- `src/index.css`: Global styles, layout, and glassmorphism styling.

## Assignment Concepts Explained
- **Third-party API Integration**: Fetches dynamic data from the external OMDb API using the native `fetch` API.
- **Debouncing**: Delays the execution of a search request until a specified time (500ms) has passed since the last keystroke, greatly improving performance and reducing API load.
- **Pagination**: Uses the `page` parameter of the OMDb API and calculates total pages to allow browsing large result sets.
- **LocalStorage**: Utilizes the browser's native storage to persist user preferences (favorites) across sessions.
- **React Hooks**: Heavily uses `useState` for state management, `useEffect` for data fetching and side effects, and custom hooks (`useDebounce`) to encapsulate logic.
