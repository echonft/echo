import { logger } from '@echo/utils'
import { useSignInWithFirebase } from '@lib/../../../../lib/firebase-react/src/hooks/use-sign-in-with-firebase'
import { useLoginWithoutDiscord } from '@lib/hooks/use-login'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: Error | undefined) => void
}

export const LoginFirebaseNoDiscord: FunctionComponent<Props> = ({ signature, message }) => {
  const t = useTranslations('Connect')
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
