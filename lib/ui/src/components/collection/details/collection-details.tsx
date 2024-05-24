import type { Collection } from '@echo/model/types/collection'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { CollectionDetailsDescription } from '@echo/ui/components/collection/details/collection-details-description'
import { CollectionProfile } from '@echo/ui/components/collection/profile/collection-profile'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
}

export const CollectionDetails: FunctionComponent<Props> = ({ collection }) => {
  const {
    bannerUrl,
    totalSupply,
    name,
    description,
    profilePictureUrl,
    discordUrl,
    twitterUsername,
    verified,
    websiteUrl
  } = collection

  return (
    <ProfileLayout>
      <CollectionProfile
        bannerUrl={bannerUrl}
        name={name}
        totalSupply={totalSupply}
        profilePictureUrl={profilePictureUrl}
        discordUrl={discordUrl}
        websiteUrl={websiteUrl}
        twitterUsername={twitterUsername}
        verified={verified}
      />
      <CollectionDetailsDescription description={description} />
    </ProfileLayout>
  )
}
