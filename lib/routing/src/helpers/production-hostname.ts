export function productionHostname() {
  return process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
}
