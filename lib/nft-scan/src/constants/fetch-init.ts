import { getSecret } from '@echo/utils/services/secret-manager'

export async function fetchInit(apiKey?: string) {
  const key = apiKey ?? (await getSecret('NFT_SCAN_API_KEY'))
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': key
    }
  }
}
