import { isNilOrEmpty } from '@echo/utils'

export const getAlchemyApiKey = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return 'test'
  }
  const apiKey = process.env.ALCHEMY_API_KEY
  if (isNilOrEmpty(apiKey)) {
    throw Error(`.env should contain ALCHEMY_API_KEY`)
  }
  return apiKey
}
