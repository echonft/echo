import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getAlchemyProviderApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
  if (isNilOrEmpty(apiKey)) {
    throw Error('.env should contain NEXT_PUBLIC_ALCHEMY_KEY')
  }
  return apiKey
}
