// noinspection JSUnusedGlobalSymbols

import { addWallet } from '@echo/backend/actions/add-wallet'
import { getWalletStatus } from '@echo/backend/actions/get-wallet-status'

export const actions = {
  addUserWallet: addWallet,
  getWalletStatus
}
