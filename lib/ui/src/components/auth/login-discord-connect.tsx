'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginButton } from '@echo/ui/components/auth/login-button'
import { UserTag } from '@echo/ui/components/user/tag/user-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
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
    // TODO add a loading state. Not straight forward as the signin will redirect to discord
    return (
      <LoginButton
        onClick={() => {
          signIn('discord', { redirect: true })
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
