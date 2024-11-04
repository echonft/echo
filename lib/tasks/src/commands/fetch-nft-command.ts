import type { Address } from '@echo/model/types/address'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { fetchNft } from '@echo/tasks/tasks/fetch-nft'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchNftCommand(contract: Address, tokenId: number) {
  await pipe(
    fetchNft,
    andThen((nft) => {
      if (isNil(nft)) {
        warn({ nft }, 'NFT not found')
      } else {
        info({ nft }, 'fetched NFT')
      }
    }),
    otherwise((err) => {
      error({ err, nft: { tokenId, collection: { contract } } }, 'could not fetch NFT')
    })
  )({ contract, tokenId })
}
