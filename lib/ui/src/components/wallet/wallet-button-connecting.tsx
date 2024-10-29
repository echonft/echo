'use client'
import type { Chain } from '@echo/model/constants/chain'
import type { EvmAddress } from '@echo/model/types/address'
import type { User } from '@echo/model/types/user'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { useWallet } from '@echo/ui/hooks/use-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  address: EvmAddress
  chain: Chain
  user: Nullable<User>
  onVerified: (verifiedAddress: EvmAddress) => void
}

const WalletButtonConnectingDiscord: FunctionComponent = () => {
  const { login } = useDependencies()

  useEffect(() => {
    void login()
  }, [login])

  return <ConnectWalletButtonLayout isConnecting={true} />
}

const WalletButtonConnectinVerifyWallet: FunctionComponent<Omit<Props, 'user'>> = ({ address, chain, onVerified }) => {
  const verified = useWallet({ address, chain })

  useEffect(() => {
    if (verified) {
      onVerified(address)
    }
  }, [verified, onVerified])

  return <ConnectWalletButtonLayout isConnecting={true} />
}

export const WalletButtonConnecting: FunctionComponent<Props> = ({ address, chain, user, onVerified }) => {
  if (isNil(user)) {
    return <WalletButtonConnectingDiscord />
  }
  return <WalletButtonConnectinVerifyWallet address={address} chain={chain} onVerified={onVerified} />
}
