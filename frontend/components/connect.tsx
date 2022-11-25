import { LoginButton } from '@components/login-button'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil } from 'rambda'
import { FunctionComponent } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
}

export const Connect: FunctionComponent<Props> = ({ accessToken, tokenType }) => {
  const t = useTranslations('Connect')
  const { isConnected } = useAccount()
  if (isNil(accessToken) || isNil(tokenType)) {
    return <span>{t('invalid-redirect')}</span>
  }
  if (isConnected) {
    return <LoginButton accessToken={accessToken} tokenType={tokenType} />
  } else {
    return <ConnectKitButton />
  }
}
