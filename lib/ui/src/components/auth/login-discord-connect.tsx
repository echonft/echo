'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginButton } from '@echo/ui/components/auth/login-button'
import { UserTag } from '@echo/ui/components/user/tag/user-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
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
          provider
            .signIn()
            .then((response) => {
              logger.debug(`signIn done: ${JSON.stringify(response)}`)
            })
            .catch((e) => {
              logger.error(`signIn error: ${errorMessage(e)}`)
            })
        }}
      >
        {t('loginBtn.label')}
      </LoginButton>
    )
  }
  return <UserTag user={user} size={SIZE_LG} />
}
