import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Collection } from '@echo/model/types/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoAddress } from '@echo/web3/constants/echo-address'
import type { Erc721TransferEvent } from '@echo/web3/types/erc721-transfer-event'
import { always, isNil, otherwise, pipe } from 'ramda'

export async function erc721TransferEventHandler({ contract, from, to, tokenId }: Erc721TransferEvent): Promise<void> {
  const collection = await pipe(getCollection, otherwise(always<Nullable<Collection>>(undefined)))(contract)
  if (isNil(collection)) {
    return
  }
  if (from === echoAddress) {
    const nftSnapshot = await getNftSnapshot({ collection, tokenId })
    if (isNil(nftSnapshot)) {
      return
    }
    await unescrowNft(nftSnapshot.id)
    return
  }
  const nft = await getNftByIndex({ collection, tokenId })
  if (to === echoAddress) {
    if (isNil(nft) || !isOwnedNft(nft)) {
      return
    }
    await escrowNft(nft)
    return
  }
  if (!isNil(nft)) {
    // TODO
    // await updateNftOwner({ nft, wallet: to })
  }
  return
}
