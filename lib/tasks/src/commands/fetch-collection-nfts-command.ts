import type { Address } from '@echo/model/types/address'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { andThen, assoc, otherwise, pipe } from 'ramda'

export async function fetchCollectionNftsCommand(contract: Address) {
  await pipe(
    getNftsByCollectionContract,
    andThen((nfts) => {
      if (isNilOrEmpty(nfts)) {
        warn({ collection: { contract } }, 'collection does not have any NFTs')
      } else {
        for (const nft of nfts) {
          info({ nft: assoc('collection', { contract }, nft) }, 'fetched NFT')
        }
        info({ collection: { contract } }, `fetched ${nfts.length} NFTs`)
      }
    }),
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch NFTs for collection')
    })
  )(contract)
}
