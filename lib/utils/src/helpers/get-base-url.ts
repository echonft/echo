import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getBaseUrl() {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV
  const url = process.env.NEXT_PUBLIC_VERCEL_URL
  if (isNilOrEmpty(url)) {
    throw Error(`NEXT_PUBLIC_VERCEL_URL env var is not defined`)
  }
  return `${isNilOrEmpty(vercelEnv) ? 'http://' : 'https://'}${url}`
}
