import type { Signature } from '@echo/ui-model'
import logger from '@echo/utils/logger'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect, useRef } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'

interface Props {
  statement: string
  nonce: string
  onSuccess?: (message: SiweMessage, signature: Signature) => unknown
  onReject?: () => unknown
}

export const SignMessage: FunctionComponent<Props> = ({ statement, nonce, onSuccess, onReject }) => {
  const { address } = useAccount()
  const { signMessageAsync, isError } = useSignMessage()
  const lock = useRef(false)

  useEffect(() => {
    if (!isNil(address) && !isError && !lock.current) {
      lock.current = true
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement,
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce
      })
      signMessageAsync({
        message: message.prepareMessage()
      })
        .then((signature) => {
          onSuccess?.(message, signature)
        })
        .catch((error) => {
          logger.error(`error signing message: ${(error as Error).message}`)
          lock.current = false
          onReject?.()
        })
    }
  }, [address, isError, nonce, onReject, onSuccess, signMessageAsync, statement])

  return null
}
