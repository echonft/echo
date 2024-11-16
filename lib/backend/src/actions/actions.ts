// noinspection JSUnusedGlobalSymbols

import { addWallet } from '@echo/backend/actions/add-wallet'
import { cancelListing } from '@echo/backend/actions/cancel-listing'
import { createListing } from '@echo/backend/actions/create-listing'
import { getOfferByIdContract } from '@echo/backend/actions/get-offer-by-id-contract'
import { rejectOffer } from '@echo/backend/actions/reject-offer'
import { searchCollections } from '@echo/backend/actions/search-collections'
import { searchUsers } from '@echo/backend/actions/search-users'
import { verifyWhitelistStatus } from '@echo/backend/actions/verify-whitelist-status'
import { walletLinkedTo } from '@echo/backend/actions/wallet-linked-to'

export const actions = {
  addWallet,
  cancelListing,
  createListing,
  getOfferByIdContract,
  rejectOffer,
  searchCollections,
  searchUsers,
  verifyWhitelistStatus,
  walletLinkedTo
}
