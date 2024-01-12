'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { WalletConnectedTag } from '@echo/ui/components/wallet/wallet-connected-tag'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { includes, isNil, toLower } from 'ramda'
import React, { type FunctionComponent, useEffect, useState } from 'react'
import type { Chain } from 'wagmi'

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
  renderConnect: (renderProps: {
    show?: () => void
    hide?: () => void
    chain?: Chain & {
      unsupported?: boolean
    }
    unsupported: boolean
    isConnected: boolean
    isConnecting: boolean
    address?: HexString
    truncatedAddress?: string
    ensName?: string
  }) => React.ReactNode
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
      if (!isNil(user.wallets) && includes({ address, chainId }, user.wallets)) {
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

  if (isConnected) {
    if (walletLinked) {
      return <WalletConnectedTag address={address!} chainId={chainId!} />
    }
    if (!isNil(getNonceError)) {
      return <ConnectKitButton.Custom>{renderConnect}</ConnectKitButton.Custom>
    }
    if (isNil(nonce)) {
      return <ConnectWalletButton isConnecting={true} />
    }
    if (!isNil(addWalletError) || !isNil(signNonceError)) {
      return <ConnectKitButton.Custom>{renderConnect}</ConnectKitButton.Custom>
    }
    return <ConnectWalletButton isConnecting={true} />
  }
  if (isConnecting) {
    return <ConnectWalletButton isConnecting={true} />
  }
  return <ConnectKitButton.Custom>{renderConnect}</ConnectKitButton.Custom>
}
