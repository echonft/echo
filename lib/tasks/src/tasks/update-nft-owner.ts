import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { chainVirtualMachine } from '@echo/model/helpers/chain/chain-virtual-machine'
import type { Address } from '@echo/model/types/address'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { error, info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, assoc, equals, isNil, otherwise, pipe, tap } from 'ramda'

export interface UpdateNftOwnerArgs {
  readonly nft: Nft
  readonly ownerAddress: Nullable<Address>
}

async function cancelTiedListings(nft: NftIndex) {
  const listings = await getListingsForNft(nft)
  for (const listing of listings) {
    await cancelListing(listing.slug)
  }
}

async function cancelTiedOffers(nft: NftIndex) {
  const offers = await getOffersForNft(nft)
  for (const offer of offers) {
    await cancelOffer(offer.slug)
  }
}

/**
 * Updates the NFT owner in Firestore
 * If the wallet is in our database, it sets it as the owner of the NFT
 * Else, it removes the owner
 * @param args
 */
export async function updateNftOwner({ nft, ownerAddress }: UpdateNftOwnerArgs): Promise<Nft> {
  if (equals(ownerAddress, nft.owner?.wallet.address)) {
    // NFT owner is already set to the right value in Firestore, return it
    return nft
  }
  await cancelTiedOffers(nft)
  await cancelTiedListings(nft)
  if (isNil(ownerAddress)) {
    return pipe(
      removeNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'removed NFT owner')
        })
      )
    )(nft)
  }
  const user = await pipe(
    getUserByWallet,
    otherwise((err) => {
      error({ err, owner: ownerAddress }, 'could not get wallet owner')
      return undefined
    })
  )({ address: ownerAddress, vm: chainVirtualMachine(nft.collection.contract.chain) })
  if (isNil(user)) {
    return pipe(
      removeNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'removed NFT owner')
        })
      )
    )(nft)
  } else {
    const nftOwner = pipe(userDocumentToModel, assoc('wallet', { address: ownerAddress }))(user)
    return pipe(
      setNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'updated NFT owner')
        })
      )
    )({ nft, owner: nftOwner })
  }
}
