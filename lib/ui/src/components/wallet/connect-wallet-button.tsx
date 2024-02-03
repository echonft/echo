'use client'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { isStorybook } from '@echo/ui/helpers/is-storybook'
import { useConnectWallet } from '@echo/ui/hooks/use-connect-wallet'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { WalletButtonRenderProps } from '@echo/ui/types/wallet-button-render-props'
import type { WalletLinkedStatus } from '@echo/ui/types/wallet-linked-status'
import type { AccountStatus } from '@echo/web3/types/account-status'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface RenderWalletButtonArgs {
  accountStatus: AccountStatus
  walletLinkedStatus: WalletLinkedStatus
  renderConnect: WalletButtonRenderFn
}

function renderWalletConnected(args: WalletButtonRenderProps) {
  const { address, chain, truncatedAddress } = args
  if (isNil(address)) {
    throw Error(`wallet connected but missing address`)
  }
  if (isNil(chain)) {
    throw Error(`wallet connected but missing chain`)
  }
  return <WalletConnectedTag address={address} chainId={chain.id} truncatedAddress={truncatedAddress} />
}

function renderWalletConnecting(_args: WalletButtonRenderProps) {
  return <ConnectWalletButtonLayout isConnecting={true} />
}

export function renderWalletButton(args: RenderWalletButtonArgs): WalletButtonRenderFn {
  const { accountStatus, renderConnect, walletLinkedStatus } = args
  if (walletLinkedStatus === 'success') {
    return renderWalletConnected
  }
  if (walletLinkedStatus === 'error' || accountStatus === 'disconnected') {
    return renderConnect
  }
  return renderWalletConnecting
}

const WalletButton: FunctionComponent<{
  renderConnect: WalletButtonRenderFn
}> = ({ renderConnect }) => {
  const { account, walletLinkedStatus } = useConnectWallet()
  if (isStorybook()) {
    return (
      <>
        {renderWalletButton({
          accountStatus: account.status,
          renderConnect,
          walletLinkedStatus
        })({
          chain: account.chain,
          address: account.address,
          unsupported: false,
          isConnected: account.status === 'connected',
          isConnecting: account.status === 'connecting' || (account.status === 'connected' && isNil(walletLinkedStatus))
        })}
      </>
    )
  }
  return (
    <ConnectKitButton.Custom>
      {renderWalletButton({
        accountStatus: account.status,
        walletLinkedStatus,
        renderConnect
      })}
    </ConnectKitButton.Custom>
  )
}

export const ConnectWalletButton: FunctionComponent<{ onClick?: MouseEventHandler }> = ({ onClick }) => (
  <Web3Provider>
    <WalletButton
      renderConnect={({ isConnecting, show }) => (
        <ConnectWalletButtonLayout
          isConnecting={isConnecting}
          onClick={(event) => {
            show?.()
            onClick?.(event)
          }}
        />
      )}
    />
  </Web3Provider>
)
