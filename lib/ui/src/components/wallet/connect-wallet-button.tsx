'use client'
import type { EvmAddress } from '@echo/model/types/address'
import type { User } from '@echo/model/types/user'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { WalletButtonConnecting } from '@echo/ui/components/wallet/wallet-button-connecting'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { useAccount } from '@echo/ui/hooks/use-account'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  user: Nullable<User>
}

export const ConnectWalletButton: FunctionComponent<Props> = ({ user }) => {
  const { address, chain, status } = useAccount()
  const { switchChain } = useDependencies()
  const [verifiedAddress, setVerifiedAddress] = useState<EvmAddress>()

  // request chain switch if on an unsupported chain and connected
  useEffect(() => {
    if (status === AccountStatus.Connected && isNil(chain)) {
      void switchChain()
    }
  }, [chain, status, switchChain])

  if (status === AccountStatus.Connecting) {
    return <ConnectWalletButtonLayout isConnecting={true} />
  }
  if (status === AccountStatus.Connected) {
    if (!isNil(verifiedAddress)) {
      return <WalletConnectedTag address={verifiedAddress} />
    }
    if (!isNil(address) && !isNil(chain)) {
      return <WalletButtonConnecting user={user} address={address} chain={chain} onVerified={setVerifiedAddress} />
    }
    return <ConnectWalletButtonLayout isConnecting={true} />
  }
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => (
        <ConnectWalletButtonLayout
          isConnecting={isConnecting}
          onClick={(_event) => {
            show?.()
            // onClick?.(event)
          }}
        />
      )}
    </ConnectKitButton.Custom>
  )
}
