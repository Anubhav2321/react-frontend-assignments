// Basic dummy auth middleware
export const protect = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token && token.startsWith('Bearer ')) {
    const actualToken = token.split(' ')[1];
    if (actualToken === 'dummy-auth-token-123') {
      return next();
    }
  }

  res.status(401).json({ message: 'Not authorized, token failed' });
};
