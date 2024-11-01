'use client'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { LoginDiscordButton } from '@echo/ui/components/auth/login-discord-button'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

const HeaderDiscordButton: FunctionComponent<Props> = ({ user }) => {
  const path = usePathname()
  const t = useTranslations('layout.header.button')
  if (isNil(user)) {
    return (
      <InternalLink path={pathProvider.auth.signIn.withQuery({ callbackUrl: `${baseUrl}${path}` }).get()}>
        <LoginDiscordButton>
          <span className={'text-white'}>
            <DiscordIconSvg width={24} height={24} />
          </span>
          <span className={clsx('btn-label-auth')}>{t('login')}</span>
        </LoginDiscordButton>
      </InternalLink>
    )
  }
  return null
}

const HeaderDiscordImg: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return null
  }

  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <InternalLink path={pathProvider.profile.default.get()}>
      <div
        className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}
      >
        <SizeableImage
          className={clsx(
            'hover:opacity-80',
            'w-12',
            'h-auto',
            'rounded-lg',
            'bg-dark-500',
            'object-center',
            'object-contain'
          )}
          src={avatarUrl}
          alt={username}
          width={48}
          height={48}
          priority={true}
        />
      </div>
    </InternalLink>
  )
}

export const HeaderDiscord: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
      <HeaderDiscordButton user={user} />
      <HeaderDiscordImg user={user} />
    </div>
  )
}
