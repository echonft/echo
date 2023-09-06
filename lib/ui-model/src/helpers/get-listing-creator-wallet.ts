import { Listing } from '../types/listing'
import { head } from 'ramda'

/**
 * Returns the wallet of the creator of a listing
 * Since we only use one wallet per user for now this is equal to the wallet associated with any item (they should all be the same)
 * This will change when we support multiple wallets
 * @param listing
 */
export function getListingCreatorWallet(listing: Listing) {
  return head(listing.items).nft.owner.wallet
}
