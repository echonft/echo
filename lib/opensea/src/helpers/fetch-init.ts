import { getSecret } from '@echo/utils/services/secret-manager'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function fetchInit(logger?: Nullable<Logger>) {
  const apiKey = await getSecret({ name: 'OPEN_SEA_API_KEY', logger })
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
