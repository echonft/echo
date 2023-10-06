export function baseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/en'
  }
  return `https://${process.env.VERCEL_URL}/en`
}
