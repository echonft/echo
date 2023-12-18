import { LoginButton } from '@echo/ui/components/auth/login-button'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  loggedIn: boolean
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ loggedIn }) => {
  const t = useTranslations('auth.step0')
  return (
    <LoginButton onClick={() => void signIn('discord')} disabled={loggedIn}>
      {t('loginBtn.label')}
    </LoginButton>
  )
}
