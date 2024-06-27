import { getSecret } from '@echo/utils/services/secret-manager'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function fetchInit(logger?: Nullable<Logger>) {
  const apiKey = await getSecret({ name: 'NFT_SCAN_API_KEY', logger })
  if (isNil(apiKey)) {
    throw Error('NFT_SCAN_API_KEY secret not found')
  }
  return {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  }
}
