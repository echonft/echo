import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getBaseUrl() {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV
  if (!isNilOrEmpty(vercelEnv)) {
    if (vercelEnv === 'production') {
      const url = process.env.NEXT_PUBLIC_PRODUCTION_URL
      if (isNilOrEmpty(url)) {
        throw Error(`NEXT_PUBLIC_PRODUCTION_URL env var is not defined`)
      }
      return url
    }
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
    if (isNilOrEmpty(url)) {
      throw Error(`NEXT_PUBLIC_VERCEL_URL env var is not defined`)
    }
    return `https://${url}`
  }
  const url = process.env.NEXT_PUBLIC_VERCEL_URL
  if (isNilOrEmpty(url)) {
    throw Error(`NEXT_PUBLIC_VERCEL_URL env var is not defined`)
  }
  return `http://${url}`
}
