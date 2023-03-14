import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  shouldSign: boolean
  fetchedSignature?: (signature: string | undefined, message: string | undefined, error: Error | undefined) => void
}

export const LoginSignature: FunctionComponent<Props> = () => {
  const t = useTranslations('Connect')
  // const { address } = useAccount()
  // const { nonce, error } = useFetchNonce(address)
  // const { signature, message } = useSign(shouldSign ? nonce : undefined)
  //
  // useEffect(() => {
  //   fetchedSignature?.(signature, message, error)
  // }, [fetchedSignature, signature, message, error])
  //
  // if (error) {
  //   logger.error('Error fetching nonce,', error)
  // }
  // if (shouldSign) {
  //   return <span>{t('signing')}</span>
  // }
  return <span>{t('sign-in')}</span>
}
