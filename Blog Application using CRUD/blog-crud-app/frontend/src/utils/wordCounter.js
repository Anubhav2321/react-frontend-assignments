export const getWordCount = (text) => {
  if (!text) return 0;
  // Match one or more word characters (including unicode and apostrophes, hyphens, etc. for words)
  // But a simple regex for general words is matching non-whitespace sequences
  const words = text.trim().match(/\S+/g);
  return words ? words.length : 0;
};
