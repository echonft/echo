import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getCollectionFromContract } from '@echo/frontend/lib/helpers/webhook/get-collection-from-contract'
import type { HandleNftTransferArgs } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { isNil } from 'ramda'

export async function processInEscrowTransfer(args: HandleNftTransferArgs): Promise<void> {
  const {
    transfer: { contract, tokenId }
  } = args
  const collection = await getCollectionFromContract(contract)
  if (isNil(collection)) {
    return
  }
  const nft = await getNftByIndex({ collection, tokenId })
  if (isNil(nft) || !isOwnedNft(nft)) {
    return
  }
  await escrowNft(nft)
}
