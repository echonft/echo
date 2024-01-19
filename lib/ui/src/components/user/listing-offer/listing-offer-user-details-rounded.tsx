import { type User } from '@echo/model/types/user'
import { RoundedProfilePicture } from '@echo/ui/components/base/rounded-profile-picture'
import { ListingOfferUserDetailsRoundedUserWallet } from '@echo/ui/components/user/listing-offer/listing-offer-user-details-rounded-user-wallet'
import { DiscordUsernameTag } from '@echo/ui/components/user/tag/discord-username-tag'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  user: User
}

/**
 * Shared between new listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender), their discord tag and their wallet address
 * @param user
 */
export const ListingOfferUserDetailsRounded: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-3.5',
        'items-center',
        'max-w-fit',
        'p-2',
        'rounded-[2.8125rem]',
        'border',
        'border-white/10'
      )}
    >
      <RoundedProfilePicture pictureUrl={avatarUrl} size={SIZE_MD} alt={user.username} />
      <div className={clsx('flex', 'flex-col', 'gap-1.5', 'pr-4', 'items-center')}>
        <DiscordUsernameTag username={username} />
        <ListingOfferUserDetailsRoundedUserWallet wallet={wallet} />
      </div>
    </div>
  )
}
