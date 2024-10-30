import { type GetWalletStatusArgs, type GetWalletStatusReturn } from '@echo/backend/actions/get-wallet-status'
import { create } from 'zustand'

export interface Actions {
  getWalletStatus: (args: GetWalletStatusArgs) => Promise<GetWalletStatusReturn>
}

export function actionsStore(actions: Actions) {
  return create<Actions>()(() => actions)
}
