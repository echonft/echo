'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { WalletButton } from '@echo/ui/components/wallet/wallet-button'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import { type SignNonceArgs, type SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { type AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import { type ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { useTranslations } from 'next-intl'
import React, { type FunctionComponent } from 'react'
import type { Chain } from 'wagmi'

interface Props {
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
  onContinue?: VoidFunction
}

export const LoginConnectWalletStep: FunctionComponent<Props> = ({
  fetcher,
  provider,
  renderConnect,
  user,
  onContinue
}) => {
  const t = useTranslations('auth.step2')
  const { isConnected, isConnecting } = provider.account()
  return (
    <LoginStepLayout
      title={t('title')}
      subtitle={t('subtitle')}
      btnLabel={t(isConnected ? 'continueBtn.label.connected' : 'continueBtn.label.disconnected')}
      btnDisabled={isConnecting}
      onBtnClick={onContinue}
    >
      <Web3Provider>
        <WalletButton fetcher={fetcher} provider={provider} renderConnect={renderConnect} user={user} />
      </Web3Provider>
    </LoginStepLayout>
  )
}
