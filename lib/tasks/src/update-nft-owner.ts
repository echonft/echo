import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { error, info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, equals, isNil, otherwise, pipe, tap } from 'ramda'

export interface UpdateNftOwnerArgs {
  nft: NftIndex & Partial<Pick<Nft, 'owner'>>
  wallet: Nullable<Wallet>
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
export async function updateNftOwner(args: UpdateNftOwnerArgs): Promise<Nft> {
  const { nft, wallet } = args
  if (equals(args.wallet, nft.owner?.wallet)) {
    // NFT owner is already set to the right value in Firestore, return it
    return nft as Nft
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
  const user = await pipe(
    getUserByWallet,
    otherwise((err) => {
      error({ err, wallet }, 'could not get wallet owner')
      return undefined
    })
  )(wallet)
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
    const owner = getUserFromFirestoreData({ user, wallet })
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
