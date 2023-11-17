import { isDev } from '@echo/utils/constants/is-dev'

export const BASE_URL = isDev ? 'http://localhost:3000/en' : `https://${process.env.VERCEL_URL}/en`
