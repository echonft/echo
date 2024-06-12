import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'

export async function fetchInit(apiKey?: string) {
  const key = apiKey ?? (await getSecret('NFT_SCAN_API_KEY'))
  if (isNil(key)) {
    throw Error('NFT_SCAN_API_KEY is not set')
  }
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': key
    }
  }
}
