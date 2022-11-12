import { LoginFirebase } from '@components/login-firebase'
import { LoginSignature } from '@components/login-signature'
import { useLogger } from '@components/providers/logger-provider'
import { useLogin } from '@lib/hooks/use-login'
import { isNil } from 'ramda'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  accessToken: string
  tokenType: string
}

// TODO Handle errors
export const Login: React.FunctionComponent<Props> = ({ accessToken, tokenType }) => {
  const logger = useLogger()
  const { address } = useAccount()
  const [message, setMessage] = useState<string>()
  const [signature, setSignature] = useState<string>()
  const { data, error } = useLogin(accessToken, tokenType, address, message, signature)
  if (data) {
    return <LoginFirebase accessToken={accessToken} message={message} signature={signature} tokenType={tokenType} />
  }
  if (error) {
    logger.error('Error loging in,', error)
    return <span>Error logging you in</span>
  }
  return (
    <LoginSignature
      fetchedSignature={(fetchedSignature, fetchedMessage) => {
        if (isNil(message) && isNil(signature)) {
          setSignature(fetchedSignature)
          setMessage(fetchedMessage)
        }
      }}
      shouldSign
    />
  )
}
