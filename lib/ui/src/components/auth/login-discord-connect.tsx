'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginButton } from '@echo/ui/components/auth/login-button'
import { UserTag } from '@echo/ui/components/layout/header/user-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('auth.step0')
  if (isNil(user)) {
    // TODO add a login state
    return <LoginButton onClick={() => void signIn('discord')}>{t('loginBtn.label')}</LoginButton>
  }
  return <UserTag user={user} size={SIZE_LG} />
}
