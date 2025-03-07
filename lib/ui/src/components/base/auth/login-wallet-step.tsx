'use client'
import type { Address } from '@echo/model/types/address'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { LoginStepLayout } from '@echo/ui/components/base/auth/layout/login-step-layout'
import { LoginWalletStepButton } from '@echo/ui/components/base/auth/login-wallet-step-button'
import { WalletChainManager } from '@echo/ui/components/base/wallet/wallet-chain-manager'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import Cookies from 'js-cookie'
import { getCsrfToken } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { andThen, isNil, modify, otherwise, pipe } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

export const LoginWalletStep: FunctionComponent = () => {
  const router = useRouter()
  const t = useTranslations('auth.wallet')
  const { disconnectWallet, login, signNonce } = useDependencies()
  const sign = useCallback(
    async (address: Address) => {
      const nonce = await getCsrfToken()
      await pipe(
        signNonce,
        andThen(
          pipe(
            modify('message', base64Encode),
            modify('signature', base64Encode),
            login,
            andThen(async (response) => {
              if (isNil(response) || !response.ok) {
                await disconnectWallet()
              } else {
                const callbackPath = Cookies.get('callbackPath')
                Cookies.remove('callbackPath')
                if (isNil(callbackPath)) {
                  router.replace(frontendRoutes.base.home.get())
                } else {
                  router.replace(callbackPath)
                }
              }
            }),
            otherwise(async () => {
              await disconnectWallet()
            })
          )
        ),
        otherwise(async () => {
          await disconnectWallet()
        })
      )({ address, nonce })
    },
    [disconnectWallet, login, router, signNonce]
  )

  return (
    <LoginStepLayout title={t('title')}>
      <>
        <LoginWalletStepButton
          onWalletLinkedTo={(address, username) => {
            if (isNil(username)) {
              router.push(frontendRoutes.login.discord.getUrl())
            } else {
              void sign(address)
            }
          }}
        />
        <WalletChainManager />
      </>
    </LoginStepLayout>
  )
}
