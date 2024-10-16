import type { Collection } from '@echo/model/types/collection/collection'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { addOrUpdateNft } from '@echo/tasks/add-or-update-nft'
import { fetchNftsByContract, type FetchNftsByContractArgs } from '@echo/tasks/fetch-nfts-by-contract'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, dissoc, pipe } from 'ramda'

interface UpdateNftsForCollectionArgs extends WithFetch {
  collection: Collection
}

export async function updateNftsForCollection(args: WithLoggerType<UpdateNftsForCollectionArgs>): Promise<void> {
  const { collection, logger } = args
  logger?.info({ collection }, `started updating NFTs (${collection.totalSupply}) for collection`)
  const nfts = await pipe<
    [UpdateNftsForCollectionArgs],
    Omit<UpdateNftsForCollectionArgs, 'collection'>,
    FetchNftsByContractArgs,
    Promise<PartialNft[]>
  >(
    dissoc('collection'),
    assoc('contract', collection.contract),
    fetchNftsByContract
  )(args)
  for (const nft of nfts) {
    await pipe(assoc('collection', collection), addOrUpdateNft)(nft)
  }
  logger?.info({ collection }, `done updating ${collection.totalSupply} NFTs for collection`)
}
