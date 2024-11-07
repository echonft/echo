import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { eqAddress } from '@echo/model/helpers/eq-address'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Address } from '@echo/model/types/address'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { error, info } from '@echo/tasks/helpers/logger'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, isNil, isNotNil, otherwise, pipe, tap } from 'ramda'

export interface UpdateNftOwnerArgs {
  readonly nft: Nft
  readonly wallet: Nullable<Address>
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
export async function updateNftOwner({ nft, wallet }: UpdateNftOwnerArgs): Promise<Nft> {
  if (
    (isOwnedNft(nft) && isNotNil(wallet) && eqAddress(nft.owner.wallet, wallet)) ||
    (!isOwnedNft(nft) && isNil(wallet))
  ) {
    // NFT owner is already set to the right value in Firestore, return it
    return nft
  }
  await cancelTiedOffers(nft)
  await cancelTiedListings(nft)
  if (isNil(wallet)) {
    return pipe(
      removeNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'removed NFT owner')
        })
      )
    )(nft)
  }
  const owner = await pipe(
    getUserByWallet,
    andThen(unlessNil(userDocumentToModel)),
    otherwise((err) => {
      error({ err, owner: wallet }, 'could not get wallet owner')
      return undefined as Nullable<UserDocument & Required<Pick<UserDocument, 'wallet'>>>
    })
  )(wallet)
  if (isNil(owner)) {
    return pipe(
      removeNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'removed NFT owner')
        })
      )
    )(nft)
  } else {
    return pipe(
      setNftOwner,
      andThen(
        tap((nft) => {
          info({ nft }, 'updated NFT owner')
        })
      )
    )({ nft, owner })
  }
}
