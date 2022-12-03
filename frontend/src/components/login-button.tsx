import { LoginFirebaseSwitch } from '@components/login-firebase-switch'
import { LoginSignature } from '@components/login-signature'
import { logger } from '@echo/utils'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  accessToken?: string
  tokenType?: string
}

// TODO Handle errors
export const LoginButton: FunctionComponent<Props> = ({ accessToken, tokenType }) => {
  const t = useTranslations('Connect')
  const [shouldSign, setShouldSign] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()
  const [signature, setSignature] = useState<string>()
  const [error, setError] = useState<Error>()
  if (error) {
    logger.error('Error logging in,', error)
  }

  return (
    <button onClick={() => setShouldSign(true)} disabled={shouldSign}>
      {isNil(message) && isNil(signature) && isNil(error) && (
        <LoginSignature
          shouldSign={shouldSign}
          fetchedSignature={(fetchedSignature, fetchedMessage, error) => {
            setSignature(fetchedSignature)
            setMessage(fetchedMessage)
            setError(error)
            setShouldSign(false)
          }}
        />
      )}
      {message && signature && isNil(error) && (
        <LoginFirebaseSwitch
          accessToken={accessToken}
          tokenType={tokenType}
          signature={signature}
          message={message}
          hasLoggedIn={(_isLoggedIn, error) => {
            setError(error)
            setShouldSign(false)
          }}
        />
      )}
      {error && <span>{t('error-login')}</span>}
    </button>
  )
}
