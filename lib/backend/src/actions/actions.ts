// noinspection JSUnusedGlobalSymbols

import { addWallet } from '@echo/backend/actions/add-wallet'
import { getWalletStatus } from '@echo/backend/actions/get-wallet-status'
import { searchCollections } from '@echo/backend/actions/search-collections'
import { searchUsers } from '@echo/backend/actions/search-users'

export const actions = {
  addWallet,
  getWalletStatus,
  searchCollections,
  searchUsers
}
