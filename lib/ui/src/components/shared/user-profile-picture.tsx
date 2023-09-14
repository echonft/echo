import { DefaultUserProfilePicture } from '@echo/ui/components/base/svg/default-user-profile-picture'
import { ProfilePicture } from '@echo/ui/components/shared/profile-picture'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { getProfilePictureSize } from '@echo/ui/helpers/get-profile-picture-size'
import { getUserAvatarUrl } from '@echo/ui/helpers/get-user-avatar-url'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordId: string
  discordAvatar: string | undefined
  size: ProfilePictureSize
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordId,
  discordAvatar,
  size
}) => {
  const pictureUrl = getUserAvatarUrl(discordId, discordAvatar, 256)
  if (isNil(pictureUrl)) {
    return (
      <DefaultUserProfilePicture
        className={clsx(
          'rounded-2xl',
          'border-solid',
          'border-3',
          'border-yellow-500',
          size === SizeLG && ['h-40', 'w-40'],
          size === SizeMD && ['h-[7.5rem]', 'w-[7.5rem]']
        )}
        width={getProfilePictureSize(size)}
        height={getProfilePictureSize(size)}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={discordUsername} size={size} />
}
