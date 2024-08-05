import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { getCollectionFromContract } from '@echo/frontend/lib/helpers/webhook/get-collection-from-contract'
import type { HandleNftTransferArgs } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to a foreign user.
 */
export async function processOutTransfer(args: HandleNftTransferArgs): Promise<void> {
  const {
    transfer: { contract, tokenId }
  } = args
  const collection = await getCollectionFromContract(contract)
  if (isNil(collection)) {
    return
  }
  await removeNftOwner({ collection, tokenId })
}
