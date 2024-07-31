'use client'
import type { User } from '@echo/auth/types/user'
import { LoginDiscordButton } from '@echo/ui/components/auth/login-discord-button'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import { mutate } from 'swr'

interface Props {
  user: Nullable<User>
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('auth.step0')
  const { logger, login } = useDependencies()
  if (isNil(user)) {
    return (
      <LoginDiscordButton
        onClick={() => {
          login()
            .then(() => {
              void mutate(SWRKeys.profile.wallet.get, undefined, {})
            })
            .catch(
              errorCallback({ logger, loggerContext: { component: LoginDiscordConnect.name, fetcher: login.name } })
            )
        }}
      >
        {t('loginBtn')}
      </LoginDiscordButton>
    )
  }
  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-2.5',
        'rounded-lg',
        'items-center',
        'px-4',
        'bg-white/[0.08]',
        'h-12',
        'w-max',
        'outline-none'
      )}
    >
      <SizeableImage className={clsx('rounded')} src={avatarUrl} alt={username} width={18} height={18} />
      <span className={clsx('prose-label-sm-semi', 'text-yellow-400')}>{username}</span>
    </div>
  )
}
