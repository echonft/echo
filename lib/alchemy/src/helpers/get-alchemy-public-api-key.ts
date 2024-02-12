import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getAlchemyPublicApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
  if (isNilOrEmpty(apiKey)) {
    throw Error('NEXT_PUBLIC_ALCHEMY_KEY env var is not defined')
  }
  return apiKey
}
