const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');
const { supabase } = require('../config/database');
const { AppError } = require('./errorHandler');

/**
 * Middleware to verify JWT token and attach user to request
 * Protects routes that require authentication
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new AppError('No authentication token provided', 401);
    }

    // Verify token
    const decoded = verifyToken(token);

    // Fetch user from database to ensure they still exist
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      throw new AppError('User not found or token invalid', 401);
    }

    // Attach user to request object
    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    // Handle JWT-specific errors
    if (error.message === 'Token has expired') {
      return next(new AppError('Token has expired. Please login again.', 401));
    }
    if (error.message === 'Invalid token') {
      return next(new AppError('Invalid authentication token', 401));
    }

    // Pass other errors to error handler
    next(error);
  }
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't fail if no token
 * Useful for routes that work differently for authenticated/unauthenticated users
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req);

    if (!token) {
      // No token, but that's okay for optional auth
      req.user = null;
      req.userId = null;
      return next();
    }

    // Verify token if present
    const decoded = verifyToken(token);

    // Fetch user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at')
      .eq('id', decoded.id)
      .single();

    if (!error && user) {
      req.user = user;
      req.userId = user.id;
    } else {
      req.user = null;
      req.userId = null;
    }

    next();
  } catch (error) {
    // If there's an error with optional auth, just set user to null
    req.user = null;
    req.userId = null;
    next();
  }
};

module.exports = { authenticate, optionalAuth };
