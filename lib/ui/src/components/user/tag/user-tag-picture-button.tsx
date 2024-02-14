import type { AuthUser } from '@echo/model/types/auth-user'
import { classes } from '@echo/ui/helpers/classes'
import Image from 'next/image'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPictureButton: FunctionComponent<Props> = ({ user }) => {
  const { username, discord } = user
  return (
    <div className={classes('flex', 'rounded', 'border', 'border-solid', 'border-yellow-500', 'overflow-clip')}>
      <Image
        className={'group-enabled:group-hover:opacity-80'}
        src={discord.avatarUrl}
        alt={username}
        width={28}
        height={28}
      />
    </div>
  )
}
