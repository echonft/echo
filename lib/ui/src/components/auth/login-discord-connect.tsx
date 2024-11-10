'use client'
import type { User } from '@echo/model/types/user'
import { LoginDiscordButton } from '@echo/ui/components/auth/login-discord-button'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

export const LoginDiscordConnect: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('auth.step0')
  const { login } = useDependencies()
  if (isNil(user)) {
    return (
      <LoginDiscordButton
        onClick={() => {
          void login()
        }}
      >
        <span className={clsx('btn-label-auth')}>{t('loginBtn')}</span>
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
