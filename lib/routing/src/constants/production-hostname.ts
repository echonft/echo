import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'

export const productionHostname = isNilOrEmpty(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
