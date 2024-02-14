'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginButton } from '@echo/ui/components/auth/login-button'
import { UserTag } from '@echo/ui/components/user/tag/user-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import { mutate } from 'swr'

interface Props {
  user: Nullable<AuthUser>
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('auth.step0')
  const { signIn } = useDependencies()
  if (isNil(user)) {
    return (
      <LoginButton
        onClick={() => {
          signIn()
            .then(() => {
              void mutate(SWRKeys.profile.wallet.get, undefined, {})
            })
            .catch(errorCallback({ tags: { action: 'signIn' } }))
        }}
      >
        {t('loginBtn')}
      </LoginButton>
    )
  }
  return <UserTag user={user} size={SIZE_LG} />
}
