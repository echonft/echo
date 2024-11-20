import { ProfileDetailsLayout } from '@echo/ui/components/base/profile/layout/profile-details-layout'
import { ProfilePicture, type ProfilePictureProps } from '@echo/ui/components/base/profile/profile-picture'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  picture: ProfilePictureProps
}

export const Profile: FunctionComponent<PropsWithChildren<Props>> = ({ picture, children }) => {
  const { pictureUrl, alt } = picture
  return (
    <ProfileDetailsLayout>
      <ProfilePicture pictureUrl={pictureUrl} alt={alt} />
      {children}
    </ProfileDetailsLayout>
  )
}
