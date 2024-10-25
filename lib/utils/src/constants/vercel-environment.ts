import { isNil } from 'ramda'

export enum VercelEnvironment {
  Development = 'development',
  Production = 'production',
  Preview = 'preview'
}

export const vercelEnvironment = isNil(process.env.VERCEL_ENV)
  ? (process.env.NEXT_PUBLIC_VERCEL_ENV as VercelEnvironment)
  : (process.env.VERCEL_ENV as VercelEnvironment)
