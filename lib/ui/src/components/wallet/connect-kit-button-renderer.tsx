import { isStorybook } from '@echo/ui/helpers/is-storybook'
import { renderWalletButton } from '@echo/ui/helpers/wallet/render-wallet-button'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { ConnectKitButton } from 'connectkit'
import type { FunctionComponent } from 'react'
import { sepolia } from 'viem/chains'

interface Props {
  errors: {
    addWalletError: Error | undefined
    getNonceError: Error | undefined
    signNonceError: Error | undefined
  }
  isConnected: boolean
  isConnecting: boolean
  nonce: string | undefined
  provider: {
    account: AccountProvider
    chain: ChainProvider
  }
  renderConnect: WalletButtonRenderFn
  walletLinked: boolean
}

export const ConnectKitButtonRenderer: FunctionComponent<Props> = ({
  errors,
  isConnected,
  isConnecting,
  nonce,
  provider,
  renderConnect,
  walletLinked
}) => {
  if (isStorybook()) {
    return (
      <>
        {renderWalletButton({
          errors,
          isConnected,
          isConnecting,
          nonce,
          renderConnect,
          walletLinked
        })({ chain: sepolia, ...provider.account(), unsupported: false })}
      </>
    )
  }
  return (
    <ConnectKitButton.Custom>
      {renderWalletButton({
        errors,
        isConnected,
        isConnecting,
        nonce,
        renderConnect,
        walletLinked
      })}
    </ConnectKitButton.Custom>
  )
}
