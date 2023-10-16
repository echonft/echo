import type { AuthUser } from '@echo/model/types/auth-user'
import { Img } from '@echo/ui/components/base/img'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPicture: FunctionComponent<Props> = ({ user }) => {
  const { username, discord } = user
  return (
    <Img className={clsx('w-4.5', 'h-4.5', 'rounded')} src={discord.avatarUrl} alt={username} width={18} height={18} />
  )
}
