import type { Collection } from '@echo/model/types/collection'
import { addOrUpdateNft } from '@echo/tasks/add-or-update-nft'
import { fetchNftsByContract } from '@echo/tasks/fetch-nfts-by-contract'
import { info } from '@echo/tasks/helpers/logger'
import { assoc, pipe } from 'ramda'

export async function updateNftsForCollection(collection: Collection): Promise<void> {
  info({ collection }, `started updating NFTs (${collection.totalSupply}) for collection`)
  const nfts = await fetchNftsByContract(collection.contract)
  for (const nft of nfts) {
    await pipe(assoc('collection', collection), addOrUpdateNft)(nft)
  }
  info({ collection }, `done updating ${collection.totalSupply} NFTs for collection`)
}
