'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginConnectWalletStep } from '@echo/ui/components/auth/login-connect-wallet-step'
import { LoginDiscordStep } from '@echo/ui/components/auth/login-discord-step'
import { LoginJoinEchoStep } from '@echo/ui/components/auth/login-join-echo-step'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import type { SignInResponse } from 'next-auth/react'
import { isNil } from 'ramda'
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
    signIn: () => Promise<SignInResponse | undefined>
  }
  renderConnectWallet: (renderProps: {
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
  step: 1 | 2 | 3
  user: AuthUser | undefined
  onNext?: VoidFunction
  onFinish?: VoidFunction
}

export const LoginStep: FunctionComponent<Props> = ({
  fetcher,
  provider,
  renderConnectWallet,
  step,
  user,
  onNext,
  onFinish
}) => {
  if (step === 1) {
    return <LoginDiscordStep provider={provider} user={user} onContinue={onNext} />
  }
  if (step === 2) {
    if (isNil(user)) {
      throw Error
    }
    return (
      <LoginConnectWalletStep
        fetcher={fetcher}
        provider={provider}
        renderConnect={renderConnectWallet}
        user={user}
        onContinue={onNext}
      />
    )
  }
  if (isNil(user)) {
    throw Error
  }
  return <LoginJoinEchoStep username={user.username} onSkip={onFinish} />
}
