'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStep } from '@echo/ui/components/auth/login-step'
import { LoginStepIndicator } from '@echo/ui/components/auth/login-step-indicator'
import type { WalletButtonRenderFn } from '@echo/ui/types/wallet-button-render-fn'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { AccountProvider } from '@echo/web3/types/account-provider'
import type { ChainProvider } from '@echo/web3/types/chain-provider'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'
import clsx from 'clsx'
import type { SignInResponse } from 'next-auth/react'
import { inc, isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

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
  user: AuthUser | undefined
  onFinish?: VoidFunction
}

export const Login: FunctionComponent<Props> = ({ fetcher, provider, renderConnectWallet, user, onFinish }) => {
  const [indicatorStep, setIndicatorStep] = useState<1 | 2 | 3>(1)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [show, setShow] = useState(true)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (!isNil(showTimeoutRef.current)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(showTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx('flex', 'flex-col', 'pt-40', 'gap-12', 'items-center', 'w-1/2')}>
      <LoginStepIndicator step={indicatorStep} />
      <div className={clsx('transition-opacity', 'duration-300', 'ease-in-out', show ? 'opacity-100' : 'opacity-0')}>
        <LoginStep
          fetcher={fetcher}
          provider={provider}
          renderConnectWallet={renderConnectWallet}
          step={step}
          user={user}
          onNext={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setIndicatorStep(inc)
            setShow(false)
            setTimeout(() => {
              setShow(true)
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setStep(inc)
            }, 300)
          }}
          onFinish={onFinish}
        />
      </div>
    </div>
  )
}
