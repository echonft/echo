import type { AuthUser } from '@echo/model/types/auth-user'
import { Img } from '@echo/ui/components/base/img'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPictureButton: FunctionComponent<Props> = ({ user }) => {
  const { username, discord } = user
  return (
    <div className={clsx('flex', 'rounded', 'border', 'border-solid', 'border-yellow-500', 'overflow-clip')}>
      <Img className={clsx('w-7', 'h-7')} src={discord.avatarUrl} alt={username} width={18} height={18} />
    </div>
  )
}
