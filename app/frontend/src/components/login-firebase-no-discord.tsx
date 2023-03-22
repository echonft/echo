import { FunctionComponent } from 'react'

interface Props {
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: Error | undefined) => void
}

export const LoginFirebaseNoDiscord: FunctionComponent<Props> = () => {
  // const t = useTranslations('Connect')
  // const { address } = useAccount()
  // const { data: loginData, error: loginError } = useLoginWithoutDiscord(address, message, signature)
  // const { data, error } = useSignInWithFirebase(loginData?.apiKey)
  // if (error || loginError) {
  //   logger.error('Error login in,', error || loginError)
  //   return <span>{t('error-login')}</span>
  // }
  // if (data) {
  //   return <span>{t('success')}</span>
  // }
  return null
}
