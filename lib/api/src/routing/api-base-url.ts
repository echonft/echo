export function apiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api'
  }
  return `https://${process.env.VERCEL_URL}/api`
}
