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
