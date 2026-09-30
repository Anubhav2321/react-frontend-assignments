const STORAGE_KEY = 'cineglass_favorites';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from local storage:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to local storage:', error);
  }
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();
  // Don't add if already exists
  if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    // Only store necessary info
    const movieToSave = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type
    };
    favorites.push(movieToSave);
    saveFavorites(favorites);
  }
  return getFavorites();
};

export const removeFavorite = (imdbID) => {
  let favorites = getFavorites();
  favorites = favorites.filter(movie => movie.imdbID !== imdbID);
  saveFavorites(favorites);
  return favorites;
};

export const isFavorite = (imdbID) => {
  const favorites = getFavorites();
  return favorites.some(movie => movie.imdbID === imdbID);
};

const HISTORY_KEY = 'cineglass_history';

export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting history from local storage:', error);
    return [];
  }
};

export const saveHistory = (history) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history to local storage:', error);
  }
};

export const addToHistory = (movie) => {
  let history = getHistory();
  // Remove if already exists so we can move it to the front
  history = history.filter(h => h.imdbID !== movie.imdbID);
  
  const movieToSave = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    Type: movie.Type
  };
  
  // Add to beginning of array
  history.unshift(movieToSave);
  
  // Keep only the latest 15 movies
  if (history.length > 15) {
    history = history.slice(0, 15);
  }
  
  saveHistory(history);
  return history;
};

export const clearHistory = () => {
  saveHistory([]);
};

const NOTES_KEY = 'cineglass_notes';

export const getMovieNote = (imdbID) => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    const parsed = notes ? JSON.parse(notes) : {};
    return parsed[imdbID] || { rating: 0, text: '' };
  } catch (error) {
    return { rating: 0, text: '' };
  }
};

export const saveMovieNote = (imdbID, noteData) => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    const parsed = notes ? JSON.parse(notes) : {};
    parsed[imdbID] = noteData;
    localStorage.setItem(NOTES_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.error('Error saving note:', error);
  }
};
