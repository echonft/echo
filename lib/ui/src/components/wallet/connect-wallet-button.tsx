'use client'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { ConnectWalletButtonLayout } from '@echo/ui/components/wallet/connect-wallet-button-layout'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { isStorybook } from '@echo/ui/helpers/is-storybook'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useConnectWallet } from '@echo/ui/hooks/use-connect-wallet'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { WalletButtonRenderProps } from '@echo/ui/types/wallet-button-render-props'
import type { AccountResult } from '@echo/web3/types/account-result'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'
import useSWR from 'swr'

interface RenderWalletButtonArgs {
  account: AccountResult
  walletLinked: boolean
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
  const { account, renderConnect, walletLinked } = args
  if (walletLinked && !isNil(account.address) && !isNil(account.chain)) {
    return renderWalletConnected
  }
  if (account.status === 'disconnected') {
    return renderConnect
  }
  return renderWalletConnecting
}

const WalletButton: FunctionComponent<{
  renderConnect: WalletButtonRenderFn
}> = ({ renderConnect }) => {
  const { disconnectWallet, getWallets } = useDependencies()
  const { data } = useSWR<WalletsResponse, Error, string>(
    SWRKeys.profile.wallet.get,
    (_key: string) => {
      return getWallets()
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      revalidateOnMount: true,
      onError: (_error) => {
        void disconnectWallet()
      }
    }
  )
  const { account, walletLinked } = useConnectWallet(data?.wallets)
  if (isStorybook()) {
    return (
      <>
        {renderWalletButton({
          account,
          renderConnect,
          walletLinked
        })({
          chain: account.chain,
          address: account.address,
          unsupported: false,
          isConnected: account.status === 'connected',
          isConnecting: account.status === 'connecting' || (account.status === 'connected' && !walletLinked)
        })}
      </>
    )
  }
  return (
    <ConnectKitButton.Custom>
      {renderWalletButton({
        account,
        walletLinked,
        renderConnect
      })}
    </ConnectKitButton.Custom>
  )
}

export const ConnectWalletButton: FunctionComponent<{ onClick?: MouseEventHandler }> = ({ onClick }) => (
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
)
