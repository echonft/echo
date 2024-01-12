import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { WalletButtonRenderProps } from '@echo/ui/types/wallet-button-render-props'
import { isNil } from 'ramda'

export interface RenderWalletButtonArgs {
  errors: {
    addWalletError: Error | undefined
    getNonceError: Error | undefined
    signNonceError: Error | undefined
  }
  isConnected: boolean
  isConnecting: boolean
  nonce: string | undefined
  renderConnect: WalletButtonRenderFn
  walletLinked: boolean
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
  return <ConnectWalletButton isConnecting={true} />
}

export function renderWalletButton(args: RenderWalletButtonArgs): WalletButtonRenderFn {
  const {
    errors: { addWalletError, getNonceError, signNonceError },
    isConnected,
    isConnecting,
    nonce,
    renderConnect,
    walletLinked
  } = args
  if (isConnected) {
    if (walletLinked) {
      return renderWalletConnected
    }
    if (!isNil(getNonceError)) {
      return renderConnect
    }
    if (isNil(nonce)) {
      return renderWalletConnecting
    }
    if (!isNil(addWalletError) || !isNil(signNonceError)) {
      return renderConnect
    }
    return renderWalletConnecting
  }
  if (isConnecting) {
    return renderWalletConnecting
  }
  return renderConnect
}
