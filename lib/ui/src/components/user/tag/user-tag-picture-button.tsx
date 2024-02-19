import type { AuthUser } from '@echo/model/types/auth-user'
import { PICTURE_SIZE_LOGIN_BUTTON } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
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
        src={addPictureSizeToUrl(discord.avatarUrl, PICTURE_SIZE_LOGIN_BUTTON)}
        alt={username}
        width={28}
        height={28}
      />
    </div>
  )
}
