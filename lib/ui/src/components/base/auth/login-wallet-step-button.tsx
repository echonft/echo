'use client'
import type { Address } from '@echo/model/types/address'
import { WalletButton } from '@echo/ui/components/base/wallet/wallet-button'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useActions } from '@echo/ui/hooks/use-actions'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResultConnected } from '@echo/web3-dom/services/get-account'
import { ConnectKitButton } from 'connectkit'
import { type FunctionComponent, useRef } from 'react'

interface Props {
  onWalletLinkedTo?: (address: Address, username: Nullable<string>) => void
}

export const LoginWalletStepButton: FunctionComponent<Props> = ({ onWalletLinkedTo }) => {
  const loadingRef = useRef(false)
  const { walletLinkedTo } = useActions()
  const onConnect = async ({ address }: AccountResultConnected) => {
    if (!loadingRef.current) {
      loadingRef.current = true
      const username = await walletLinkedTo(address)
      onWalletLinkedTo?.(address, username)
      loadingRef.current = false
    }
  }
  const { status } = useAccount({ onConnect })

  if (status === AccountStatus.Disconnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show, isConnecting }) => (
          <WalletButton
            isConnecting={isConnecting}
            onClick={() => {
              show?.()
            }}
          />
        )}
      </ConnectKitButton.Custom>
    )
  }
  return <WalletButton isConnecting={true} />
}
