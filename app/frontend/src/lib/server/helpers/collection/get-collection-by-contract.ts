import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { type Collection } from '@echo/model/types/collection'
import { both, find, pathEq } from 'ramda'

export function getCollectionByContract(address: string, chainId: number, collections: Collection[]) {
  try {
    return find(both(pathEq(address, ['contract', 'address']), pathEq(chainId, ['contract', 'chainId'])), collections)
  } catch (e) {
    throw new ServerError(
      `error getting collection by contract address ${address} on chain id ${chainId} in collections ${JSON.stringify(
        collections
      )}`,
      e
    )
  }
}
