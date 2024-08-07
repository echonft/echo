import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import type { NftTransferEvent } from '@echo/frontend/lib/types/webhook/nft-transfer-event'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { getOrAddCollection } from '@echo/tasks/get-or-add-collection'
import { updateNftOwner } from '@echo/tasks/update-nft-owner'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isEcho } from '@echo/web3/utils/is-echo'
import { isNil } from 'ramda'

export async function nftTransferEventHandler(
  args: WithLoggerType<Record<'transfer', NftTransferEvent>>
): Promise<void> {
  const {
    transfer: { contract, from, to, tokenId },
    logger
  } = args
  const collection = await getOrAddCollection({ contract, fetch, logger })
  if (isNil(collection)) {
    return
  }
  if (isEcho(from)) {
    const nftSnapshot = await getNftSnapshot({ collection, tokenId })
    if (isNil(nftSnapshot)) {
      return
    }
    await unescrowNft(nftSnapshot.id)
    return
  }
  if (isEcho(to)) {
    const nft = await getNftByIndex({ collection, tokenId })
    if (isNil(nft) || !isOwnedNft(nft)) {
      return
    }
    await escrowNft(nft)
    return
  }
  await updateNftOwner({ nft: { collection, tokenId }, wallet: to })
  return
}
