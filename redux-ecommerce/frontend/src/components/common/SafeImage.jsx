import React, { useState } from 'react';

// Category-based high quality backup images (Unsplash CDN with compression & format)
const CATEGORY_FALLBACKS = {
  electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  jewelery: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  "men's clothing": 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
  "women's clothing": 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&auto=format&fit=crop&q=80',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

// Mapping for known legacy FakeStoreAPI jpg URLs to updated working png URLs
const FAKESTORE_URL_FIXES = {
  '81fPKd-2AYL._AC_SL1500_.jpg': '81fPKd-2AYL._AC_SL1500_t.png',
  '71-3HjGNDUL._AC_SY879._SX._UX._SY._UT_.jpg': '71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
  '71li-ujtlUL._AC_UX679_.jpg': '71li-ujtlUL._AC_UX679_t.png',
  '71YXzeOuslL._AC_UY879_.jpg': '71YXzeOuslL._AC_UY879_t.png',
  '71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg': '71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
  '61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg': '61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',
  '71YAIFU48IL._AC_UL640_QL65_ML3_.jpg': '71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
  '51UDEzFqFUC._AC_UL640_QL65_ML3_.jpg': '51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',
  '61IBBVJvSDL._AC_SY879_.jpg': '61IBBVJvSDL._AC_SY879_t.png',
  '61U7T1koQqL._AC_SX679_.jpg': '61U7T1koQqL._AC_SX679_t.png',
  '71kWymZ+c+L._AC_SX679_.jpg': '71kWymZ+c+L._AC_SX679_t.png',
  '61mtL65D4cL._AC_SX679_.jpg': '61mtL65D4cL._AC_SX679_t.png',
  '81QpkIctqPL._AC_SX679_.jpg': '81QpkIctqPL._AC_SX679_t.png',
  '81Zt42ioCgL._AC_SX679_.jpg': '81Zt42ioCgL._AC_SX679_t.png',
  '51Y5NI-I5jL._AC_UX679_.jpg': '51Y5NI-I5jL._AC_UX679_t.png',
  '81XH0e8fefL._AC_UY879_.jpg': '81XH0e8fefL._AC_UY879_t.png',
  '71HblAHs5xL._AC_UY879_-2.jpg': '71HblAHs5xL._AC_UY879_-2t.png',
  '71z3kpMAYUL._AC_UY879_.jpg': '71z3kpMAYsL._AC_UY879_t.png',
  '51eg55uWmdL._AC_UX679_.jpg': '51eg55uWmdL._AC_UX679_t.png',
  '61pHAEJ4NML._AC_UX679_.jpg': '61pHAEJ4NML._AC_UX679_t.png',
};

export const sanitizeImageUrl = (url, category = '') => {
  if (!url || typeof url !== 'string') {
    return CATEGORY_FALLBACKS[category?.toLowerCase()] || DEFAULT_FALLBACK;
  }

  let sanitized = url.trim();

  // Fix any outdated FakeStoreAPI URLs
  if (sanitized.includes('fakestoreapi.com/img/')) {
    for (const [oldFilename, newFilename] of Object.entries(FAKESTORE_URL_FIXES)) {
      if (sanitized.includes(oldFilename)) {
        sanitized = sanitized.replace(oldFilename, newFilename);
        break;
      }
    }
    // Also fix any remaining .jpg at the end of fakestore URLs if not already transformed
    if (sanitized.endsWith('.jpg')) {
      sanitized = sanitized.replace(/\.jpg$/, '_t.png');
    }
  }

  return sanitized;
};

/**
 * Robust SafeImage component with automatic URL normalization,
 * error recovery fallback, and no-referrer policy.
 */
export const SafeImage = ({
  src,
  alt = 'Product image',
  category = '',
  style = {},
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const primarySrc = sanitizeImageUrl(src, category);
  const [currentSrc, setCurrentSrc] = useState(primarySrc);
  const [hasError, setHasError] = useState(false);

  // Sync if src prop changes
  React.useEffect(() => {
    setCurrentSrc(sanitizeImageUrl(src, category));
    setHasError(false);
  }, [src, category]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = CATEGORY_FALLBACKS[category?.toLowerCase()] || DEFAULT_FALLBACK;
      setCurrentSrc(fallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;

