import type { Contract } from '@echo/model/types/contract'
import { fetchNft } from '@echo/tasks/fetch-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchNftCommand(contract: Contract, tokenId: string) {
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
  )({ contract, tokenId: tokenId })
}
