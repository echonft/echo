'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import type { SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import { clsx } from 'clsx'
import { getCsrfToken, type SignInResponse } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { always, andThen, assoc, isNil, modify, otherwise, pipe, unless } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  code?: string
}

export const LoginSignStep: FunctionComponent<Props> = ({ code }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const { disconnectWallet, login, signNonce } = useDependencies()
  const t = useTranslations('auth.sign')
  const onSign = useCallback(async () => {
    if (!isNil(address)) {
      const nonce = await getCsrfToken()
      await pipe(
        signNonce,
        andThen(
          pipe<
            [SignNonceResult],
            SignNonceResult,
            Record<'message', string> & Record<'signature', string>,
            Record<'message', string> & Record<'signature', string> & OptionalRecord<'code', string>,
            Promise<Nullable<SignInResponse>>,
            Promise<void>
          >(
            modify('message', base64Encode),
            modify('signature', base64Encode),
            unless<
              Record<'message', string> & Record<'signature', string>,
              Record<'message', string> & Record<'signature', string> & OptionalRecord<'code', string>
            >(always(isNil(code)), assoc('code', code)),
            login,
            andThen(async (response) => {
              if (isNil(response) || !response.ok) {
                await disconnectWallet()
                setLoading(false)
              } else {
                router.replace(frontendRoutes.login.join.get())
              }
            })
          )
        ),
        otherwise(async () => {
          await disconnectWallet()
          setLoading(false)
        })
      )({ address, nonce })
    }
  }, [address, code, disconnectWallet, login, router, signNonce])
  return (
    <LoginStepLayout title={t('title')}>
      <button
        disabled={loading}
        className={clsx('btn-auth', loading && 'animate-pulse')}
        onClick={() => {
          setLoading(true)
          void onSign()
        }}
      >
        <WalletIconSvg width={24} />
        <span className={clsx('btn-label-auth')}>{t('btn')}</span>
      </button>
    </LoginStepLayout>
  )
}
