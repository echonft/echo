'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginButton } from '@echo/ui/components/auth/login-button'
import { UserTag } from '@echo/ui/components/user/tag/user-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { type SignInResponse } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  provider: {
    signIn: () => Promise<SignInResponse | undefined>
  }
  user: AuthUser | undefined
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ provider, user }) => {
  const t = useTranslations('auth.step0')
  if (isNil(user)) {
    return (
      <LoginButton
        onClick={() => {
          provider.signIn().catch(errorCallback({ tags: { action: 'signIn' } }))
        }}
      >
        {t('loginBtn.label')}
      </LoginButton>
    )
  }
  return <UserTag user={user} size={SIZE_LG} />
}
