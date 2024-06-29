import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { fetchNfts } from '@echo/tasks/fetch-nfts'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { assoc, head, isEmpty, isNil, path, pipe } from 'ramda'

type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
  collection: Pick<Collection, 'contract'>
}

export async function fetchNftsForWalletCommand(wallet: Wallet) {
  const logger = getLogger(fetchNftsForWalletCommand.name)
  const groups = await fetchNfts({ wallet, fetch, logger })
  if (isEmpty(groups)) {
    logger.info({ wallet }, 'this wallet does not own any NFTs')
    return
  }
  for (const group of groups) {
    const contract = pipe<[PartialNft[]], PartialNft, Wallet>(
      head,
      nonNullableReturn(path(['collection', 'contract']))
    )(group)
    const collection = await fetchCollection({ contract, fetch, logger })
    if (isNil(collection)) {
      logger.error({ collection: { contract } }, 'could not fetch collection')
    }
    for (const nft of group) {
      logger.info({ wallet, nft: assoc('collection', collection, nft) }, 'fetched NFT')
    }
  }
}
