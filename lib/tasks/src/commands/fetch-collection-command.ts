import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Address } from '@echo/model/types/address'
import { getCollectionByContract } from '@echo/nft-scan/services/get-collection-by-contract'
import { error, warn } from '@echo/tasks/helpers/logger'
import { andThen, otherwise, pipe } from 'ramda'

export async function fetchCollectionCommand(contract: Address) {
  await pipe(
    getCollectionByContract,
    andThen(({ collection, isSpam }) => {
      if (isSpam) {
        warn({ collection }, CollectionError.Spam)
      }
    }),
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch collection from API')
    })
  )(contract)
}
