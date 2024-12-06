import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { escrowNft } from '@echo/firestore/crud/nft/escrow-nft'
import { getNftByIndex, getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { unescrowNft } from '@echo/firestore/crud/nft/unescrow-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Collection } from '@echo/model/types/collection'
import type { User } from '@echo/model/types/user'
import { alwaysVoid } from '@echo/utils/helpers/always-void'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoAddress } from '@echo/web3/constants/echo-address'
import type { Erc721TransferEvent } from '@echo/web3/types/erc721-transfer-event'
import { always, andThen, isNil, otherwise, pipe } from 'ramda'

export async function erc721TransferEventHandler({ contract, from, to, tokenId }: Erc721TransferEvent): Promise<void> {
  const collection = await pipe(getCollection, otherwise(always<Nullable<Collection>>(undefined)))(contract)
  if (isNil(collection)) {
    return
  }
  if (from === echoAddress) {
    const nftSnapshot = await pipe(
      getNftSnapshotByIndex,
      otherwise(always<Nullable<QueryDocumentSnapshot<NftDocument>>>(undefined))
    )({ collection, tokenId })
    if (isNil(nftSnapshot)) {
      return
    }
    await pipe(unescrowNft, otherwise(alwaysVoid))(nftSnapshot.id, to)
    return
  }
  const nft = await pipe(getNftByIndex, otherwise(always<Nullable<NftDocument>>(undefined)))({ collection, tokenId })
  if (to === echoAddress) {
    if (isNil(nft) || !isOwnedNft(nft)) {
      return
    }
    await pipe(escrowNft, otherwise(alwaysVoid))(nft)
    return
  }
  if (!isNil(nft)) {
    // TODO use the firestore-functions sdk to queue an updateNftOwner task
    const owner = await pipe(
      getUserByWallet,
      andThen(unlessNil(userDocumentToModel)),
      otherwise(always<Nullable<User>>(undefined))
    )(to)
    if (!eqUser(nft.owner, owner)) {
      if (isNil(owner)) {
        await pipe(removeNftOwner, otherwise(alwaysVoid))(nft)
      } else {
        await pipe(setNftOwner, otherwise(alwaysVoid))({ nft, owner })
      }
    }
  }
}
