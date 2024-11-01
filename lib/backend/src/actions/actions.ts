// noinspection JSUnusedGlobalSymbols

import { addWallet } from '@echo/backend/actions/add-wallet'
import { getOfferByIdContract } from '@echo/backend/actions/get-offer-by-id-contract'
import { getWalletStatus } from '@echo/backend/actions/get-wallet-status'
import { rejectOffer } from '@echo/backend/actions/reject-offer'
import { searchCollections } from '@echo/backend/actions/search-collections'
import { searchUsers } from '@echo/backend/actions/search-users'

export const actions = {
  addWallet,
  getOfferByIdContract,
  getWalletStatus,
  rejectOffer,
  searchCollections,
  searchUsers
}
