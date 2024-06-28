import { MAX_RETRIES, WAIT_TIME } from '@echo/frontend/lib/constants/retry-params'
import { getEscrowedNftFromIndex } from '@echo/frontend/lib/helpers/nft/get-escrowed-nft-from-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { always, assoc, converge, identity, inc, isEmpty, map, pipe, prop } from 'ramda'

interface GetEscrowedNftsFromIndexesWithRetryArgs extends WithLogger {
  indexes: NftIndex[]
}

async function tryFetch(args: GetEscrowedNftsFromIndexesWithRetryArgs & { retries: number }): Promise<Nft[]> {
  const { indexes, retries, logger } = args
  if (retries === MAX_RETRIES) {
    logger?.error('getEscrowedNftsFromIndexesWithRetry max retries reached. Returning error :(')
    return Promise.resolve([])
  }
  if (retries > 0) {
    logger?.warn('retrying getEscrowedNftsFromIndexesWithRetry')
  }
  const nfts = await pipe(map(getEscrowedNftFromIndex), promiseAll)(indexes)

  if (isEmpty(nfts)) {
    logger?.warn(`Escrowed NFT not found. Retrying in ${WAIT_TIME / 1000} seconds....`)
    return await delayPromise(
      pipe(converge(assoc, [always('retries'), pipe(prop('retries'), inc), identity]), tryFetch),
      WAIT_TIME
    )(args)
  }

  if (retries > 0) {
    logger?.info('retry success')
  }
  return nfts
}

export async function getEscrowedNftsFromIndexesWithRetry(args: GetEscrowedNftsFromIndexesWithRetryArgs) {
  return await tryFetch(pipe(assoc('retries', 0))(args))
}
