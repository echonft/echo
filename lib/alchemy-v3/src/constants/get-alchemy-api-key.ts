import { isNilOrEmpty } from '@echo/utils'

export const getAlchemyApiKey = (): string => {
  const apiKey = process.env.ALCHEMY_API_KEY
  if (isNilOrEmpty(apiKey)) {
    throw Error(`ALCHEMY_API_KEY env var is not set`)
  }
  return apiKey
}
