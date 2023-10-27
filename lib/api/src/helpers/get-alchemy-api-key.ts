import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

// TODO Should be a separate key IMO
export function getAlchemyApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID
  if (isNilOrEmpty(apiKey)) {
    throw Error('.env should contain NEXT_PUBLIC_ALCHEMY_ID')
  }
  return apiKey
}
