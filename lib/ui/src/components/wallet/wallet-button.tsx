'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { userHasWallet } from '@echo/model/helpers/user/user-has-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { ConnectKitButtonRenderer } from '@echo/ui/components/wallet/connect-kit-button-renderer'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { useTranslations } from 'next-intl'
import { isNil, toLower } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

export interface WalletButtonProps {
  fetcher: {
    addWallet: Fetcher<EmptyResponse, AddWalletRequest>
    getNonce: Fetcher<NonceResponse, never>
    signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  }
  provider: {
    account: AccountProvider
    chain: ChainProvider
  }
  renderConnect: WalletButtonRenderFn
  user: AuthUser
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({ fetcher, provider, renderConnect, user }) => {
  const t = useTranslations('error.profile')
  const [walletLinked, setWalletLinked] = useState(false)
  const [nonce, setNonce] = useState<string>()
  const { address, isConnected, isConnecting } = provider.account()
  const chainId = provider.chain()
  const { trigger: getNonceTrigger, error: getNonceError } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.wallet.add,
    fetcher: fetcher.getNonce,
    onSuccess: (response) => {
      setNonce(response.nonce)
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') }
    }
  })
  const { trigger: addWalletTrigger, error: addWalletError } = useSWRTrigger<EmptyResponse, AddWalletRequest>({
    key: SWRKeys.profile.wallet.add,
    fetcher: fetcher.addWallet,
    onSuccess: () => {
      setWalletLinked(true)
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') }
    }
  })
  const { trigger: signNonceTrigger, error: signNonceError } = useSWRTrigger<SignNonceResult, SignNonceArgs>({
    key: SWRKeys.profile.nonce.sign,
    fetcher: fetcher.signNonce,
    onSuccess: ({ message, signature }) => {
      void addWalletTrigger({ wallet: { address: toLower(address!), chainId: chainId! }, message, signature })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('signing') }
    }
  })

  useEffect(() => {
    if (isConnected && !walletLinked) {
      // TODO We need to have a check for chainId. We can assume address is good if connected tho
      if (userHasWallet({ user, wallet: { address, chainId } as Wallet })) {
        setWalletLinked(true)
      } else if (isNilOrEmpty(nonce)) {
        void getNonceTrigger()
      } else {
        if (isNil(address)) {
          throw Error(`wallet connected but missing address`)
        }
        if (isNil(chainId)) {
          throw Error(`wallet connected but missing chain id`)
        }
        void signNonceTrigger({
          domain: window.location.host,
          uri: window.location.origin,
          nonce: nonce,
          wallet: { address: toLower(address), chainId }
        })
      }
    }
  }, [address, chainId, isConnected, user, signNonceTrigger, walletLinked, nonce, getNonceTrigger])

  return (
    <ConnectKitButtonRenderer
      renderConnect={renderConnect}
      isConnected={isConnected}
      isConnecting={isConnecting}
      provider={provider}
      nonce={nonce}
      walletLinked={walletLinked}
      errors={{ addWalletError, getNonceError, signNonceError }}
    />
  )
}
