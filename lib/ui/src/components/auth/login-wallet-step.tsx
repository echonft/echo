'use client'
import type { Address } from '@echo/model/types/address'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { WalletButton } from '@echo/ui/components/auth/wallet-button'
import { WalletChainManager } from '@echo/ui/components/wallet/wallet-chain-manager'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useLoginStore } from '@echo/ui/hooks/use-login-store'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import { getCsrfToken } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { andThen, isNil, modify, otherwise, pipe } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

export const LoginWalletStep: FunctionComponent = () => {
  const router = useRouter()
  const { callbackPath, reset } = useLoginStore.getState()
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
              console.log(`response ${JSON.stringify(response)}`)
              if (isNil(response) || !response.ok) {
                await disconnectWallet()
              } else {
                reset()
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
    [callbackPath, disconnectWallet, login, reset, router, signNonce]
  )

  return (
    <LoginStepLayout title={t('title')}>
      <>
        <WalletButton
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
