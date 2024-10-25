import { Secret } from '@echo/utils/constants/secret'
import { getSecret } from '@echo/utils/services/secret-manager'

export async function fetchInit() {
  const apiKey = await getSecret(Secret.NftScanApiKey)
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  }
}
