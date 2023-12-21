'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  wallet: Wallet
}

export const UserWallet: FunctionComponent<Props> = ({ wallet }) => {
  return (
    <CopyToClipboard text={formatAddress(wallet)}>
      <WalletConnectButton label={shortenAddress(wallet)} loading={false} />
    </CopyToClipboard>
  )
}
