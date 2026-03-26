// App Configuration
export const APP_NAME = 'CypherSight'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Fraud & Scam Intelligence - Detect scams, phishing, and suspicious content'

// API Configuration
export const API_BASE_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:3000/api'

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized. Please log in again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  LOADED: 'Successfully loaded.',
  ANALYZED: 'Successfully analyzed.',
}

// Fraud Risk Thresholds
export const RISK_THRESHOLDS = {
  LOW: 50,
  MEDIUM: 70,
  HIGH: 100,
}

// Tone colors for risk levels
export const TONE_COLORS = {
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444',
}
