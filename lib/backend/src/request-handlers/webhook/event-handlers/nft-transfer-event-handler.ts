import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { getOrAddCollection } from '@echo/tasks/tasks/get-or-add-collection'
import { updateNftOwner } from '@echo/tasks/tasks/update-nft-owner'
import { isEchoContract } from '@echo/web3/helpers/is-echo-contract'
import type { NftTransferEvent } from '@echo/web3/types/nft-transfer-event'
import { isNil } from 'ramda'

export async function nftTransferEventHandler({ contract, from, to, tokenId }: NftTransferEvent): Promise<void> {
  const collection = await getOrAddCollection(contract)
  if (isNil(collection)) {
    return
  }
  if (isEchoContract(from)) {
    const nftSnapshot = await getNftSnapshot({ collection, tokenId })
    if (isNil(nftSnapshot)) {
      return
    }
    await unescrowNft(nftSnapshot.id)
    return
  }
  const nft = await getNftByIndex({ collection, tokenId })
  if (isEchoContract(to)) {
    if (isNil(nft) || !isOwnedNft(nft)) {
      return
    }
    await escrowNft(nft)
    return
  }
  if (!isNil(nft)) {
    await updateNftOwner({ nft, ownerAddress: to.address })
  }
  return
}
