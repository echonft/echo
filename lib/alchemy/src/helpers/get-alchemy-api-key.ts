import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getAlchemyApiKey() {
  const apiKey = process.env.ALCHEMY_API_KEY
  if (isNilOrEmpty(apiKey)) {
    throw Error('ALCHEMY_API_KEY env var is not defined')
  }
  return apiKey
}
