'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginConnectWalletStep } from '@echo/ui/components/auth/login-connect-wallet-step'
import { LoginDiscordStep } from '@echo/ui/components/auth/login-discord-step'
import { LoginJoinEchoStep } from '@echo/ui/components/auth/login-join-echo-step'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { AccountProvider } from '@echo/web3/types/account-provider'
import type { ChainProvider } from '@echo/web3/types/chain-provider'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'
import type { SignInResponse } from 'next-auth/react'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  fetcher: {
    addWallet: Fetcher<WalletsResponse, AddWalletRequest>
    getNonce: Fetcher<NonceResponse, never>
    signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  }
  provider: {
    account: AccountProvider
    chain: ChainProvider
    signIn: () => Promise<SignInResponse | undefined>
  }
  renderConnectWallet: WalletButtonRenderFn
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
