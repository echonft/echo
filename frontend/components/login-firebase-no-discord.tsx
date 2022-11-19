import { useLogger } from '@components/providers/logger-provider'
import { useLoginWithoutDiscord } from '@lib/hooks/use-login'
import { useSignInWithFirebase } from '@lib/services/firebase/hooks/use-sign-in-with-firebase'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useAccount } from 'wagmi'

interface Props {
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: Error | undefined) => void
}

export const LoginFirebaseNoDiscord: React.FunctionComponent<Props> = ({ signature, message }) => {
  const t = useTranslations('Connect')
  const logger = useLogger()
  const { address } = useAccount()
  const { data: loginData, error: loginError } = useLoginWithoutDiscord(address, message, signature)
  const { data, error } = useSignInWithFirebase(loginData?.apiKey)
  if (error || loginError) {
    logger.error('Error login in,', error || loginError)
    return <span>{t('error-login')}</span>
  }
  if (data) {
    return <span>{t('success')}</span>
  }
  return <span>{t('login')}</span>
}
