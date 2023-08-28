import { UserDiscordTag } from '../user/user-discord-tag'
import { UserProfilePicture } from '../user/user-profile-picture'
import { UserWallet } from '../user/user-wallet'
import { SizeMD, User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverWalletAddress: string
}

export const OfferReceiverDetailsContainer: FunctionComponent<Props> = ({ receiver, receiverWalletAddress }) => {
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
        <UserWallet address={receiverWalletAddress} />
      </div>
    </div>
  )
}
