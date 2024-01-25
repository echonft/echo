import type { Wallet } from '@echo/model/types/wallet'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  wallets: Wallet[]
}

export const UserDetailsWallets: FunctionComponent<Props> = ({ wallets }) => {
  if (isNonEmptyArray(wallets)) {
    return <WalletConnectedButton wallet={head(wallets)} />
  }
  return null
}
