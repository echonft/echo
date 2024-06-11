import { getSecret } from '@echo/utils/services/secret-manager'

export async function fetchInit() {
  const apiKey = await getSecret('OPEN_SEA_API_KEY')
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  }
}
