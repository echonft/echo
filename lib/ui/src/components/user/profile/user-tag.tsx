import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: Nullable<Omit<User, 'wallet'>>
  isAuthUser?: boolean
}

export const UserTag: FunctionComponent<Props> = ({ user, isAuthUser = false }) => {
  const t = useTranslations('user')
  if (isNil(user)) {
    return null
  }
  const { discord } = user
  const { username, globalName } = discord
  return (
    <div className={clsx('w-max', 'text-white', 'prose-display-md-bold')}>
      <span>{isAuthUser ? t('authUser') : (globalName ?? username)}</span>
    </div>
  )
}
