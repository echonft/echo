import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { getCollectionFromContract } from '@echo/frontend/lib/helpers/webhook/get-collection-from-contract'
import type { HandleNftTransferArgs } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import { isNil } from 'ramda'

export async function processOutEscrowTransfer(args: HandleNftTransferArgs): Promise<void> {
  const {
    transfer: { contract, tokenId }
  } = args
  const collection = await getCollectionFromContract(contract)
  if (isNil(collection)) {
    return
  }
  const nftSnapshot = await getNftSnapshot({ collection, tokenId })
  if (isNil(nftSnapshot)) {
    return
  }
  await unescrowNft(nftSnapshot.id)
}
