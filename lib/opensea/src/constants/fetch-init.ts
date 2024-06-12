import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'

export async function fetchInit() {
  const apiKey = await getSecret('OPEN_SEA_API_KEY')
  if (isNil(apiKey)) {
    throw Error('OPEN_SEA_API_KEY is not set')
  }
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  }
}
