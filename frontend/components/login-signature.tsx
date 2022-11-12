import { useLogger } from '@components/providers/logger-provider'
import { useFetchNonce } from '@lib/hooks/use-fetch-nonce'
import { useSign } from '@lib/hooks/use-sign'
import React, { useEffect } from 'react'
import { useTranslations } from 'use-intl'
import { useAccount } from 'wagmi'

interface Props {
  shouldSign: boolean
  fetchedSignature?: (signature: string | undefined, message: string | undefined, error: any | undefined) => void
}

export const LoginSignature: React.FunctionComponent<Props> = ({ shouldSign, fetchedSignature }) => {
  const t = useTranslations('Connect')
  const logger = useLogger()
  const { address } = useAccount()
  const { nonce, error } = useFetchNonce(address)
  const { signature, message } = useSign(shouldSign ? nonce : undefined)

  useEffect(() => {
    fetchedSignature?.(signature, message, error)
  }, [fetchedSignature, signature, message, error])

  if (error) {
    logger.error('Error fetching nonce,', error)
  }
  if (shouldSign) {
    return <span>{t('signing')}</span>
  }
  return <span>{t('sign-in')}</span>
}
