import { Secret } from '@echo/utils/constants/secret'
import { getSecret } from '@echo/utils/services/secret-manager'

export async function fetchInit() {
  const apiKey = await getSecret(Secret.OpenSeaApiKey)
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  }
}
