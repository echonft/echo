import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { ProfileDetailsLayout } from '@echo/ui/components/base/layout/profile-details-layout'
import { ProfilePicture, type ProfilePictureProps } from '@echo/ui/components/base/profile-picture'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  picture: ProfilePictureProps
}

export const Profile: FunctionComponent<PropsWithChildren<Props>> = ({ picture, children }) => {
  const { pictureUrl, alt, size = SIZE_LG, border } = picture
  return (
    <PaddedLayout>
      <ProfileDetailsLayout>
        <ProfilePicture pictureUrl={pictureUrl} alt={alt} size={size} border={border} />
        {children}
      </ProfileDetailsLayout>
    </PaddedLayout>
  )
}
