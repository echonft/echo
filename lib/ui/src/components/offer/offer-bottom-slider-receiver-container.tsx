import { SizeMD } from '../../types/size'
import { User } from '../../types/user'
import { UserDiscordTag } from '../user/user-discord-tag'
import { UserProfilePicture } from '../user/user-profile-picture'
import { UserWallet } from '../user/user-wallet'
import { HideIfNilOrEmpty } from '../utils/hide-if-nil-or-empty'
import { clsx } from 'clsx'
import { head } from 'ramda'
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
        {/* Shouldn't happen */}
        <HideIfNilOrEmpty checks={receiver.wallets}>
          <UserWallet address={head(receiver.wallets!)!.address} />
        </HideIfNilOrEmpty>
      </div>
    </div>
  )
}
