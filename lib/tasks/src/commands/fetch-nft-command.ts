import type { Address } from '@echo/model/types/address'
import { getNft } from '@echo/nft-scan/services/get-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchNftCommand(contract: Address, tokenId: number) {
  await pipe(
    getNft,
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
