import type { Username } from '@echo/model/types/username'
import { UserTagWrapper } from '@echo/ui/components/user/profile/user-tag-wrapper'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  discordUsername: string
  username?: Username
  isAuthUser?: boolean
}

export const UserTag: FunctionComponent<Props> = ({ username, discordUsername, isAuthUser = false }) => {
  const t = useTranslations('user')
  return (
    <UserTagWrapper username={username}>
      <div className={clsx('w-max', 'text-white', 'uppercase', 'prose-display-md-bold')}>
        <span>{isAuthUser ? t('authUser') : discordUsername}</span>
      </div>
    </UserTagWrapper>
  )
}
