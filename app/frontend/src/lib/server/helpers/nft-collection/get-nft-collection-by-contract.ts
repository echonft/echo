import type { NftCollection } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'
import { both, find, pathEq } from 'ramda'

export function getNftCollectionByContract(address: string, chainId: number, collections: NftCollection[]) {
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
