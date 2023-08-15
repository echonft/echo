import { SizeMD } from '../../types/size'
import { User } from '../../types/user'
import { UserDiscordTag } from '../user/user-discord-tag'
import { UserProfilePicture } from '../user/user-profile-picture'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  receiver: User
}

export const OfferBottomSliderReceiverContainer: FunctionComponent<Props> = ({ receiver }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5')}>
      <UserProfilePicture
        discordUsername={receiver.discordUsername}
        discordId={receiver.discordId}
        discordAvatar={receiver.discordAvatar}
        size={SizeMD}
      />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTag discordUsername={receiver.discordUsername} />
      </div>
    </div>
  )
}
