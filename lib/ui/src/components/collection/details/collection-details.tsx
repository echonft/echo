import type { Collection } from '@echo/model/types/collection'
import { ProfileBackgroundBanner } from '@echo/ui/components/base/profile-background-banner'
import { CollectionDetailsDescription } from '@echo/ui/components/collection/details/collection-details-description'
import { CollectionProfile } from '@echo/ui/components/collection/profile/collection-profile'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
}

export const CollectionDetails: FunctionComponent<Props> = ({ collection }) => {
  const { totalSupply, name, description, profilePictureUrl, discordUrl, twitterUsername, verified, websiteUrl } =
    collection

  return (
    <ProfileBackgroundBanner bannerUrl={profilePictureUrl}>
      <CollectionProfile
        name={name}
        totalSupply={totalSupply}
        profilePictureUrl={profilePictureUrl}
        discordUrl={discordUrl}
        websiteUrl={websiteUrl}
        twitterUsername={twitterUsername}
        verified={verified}
      />
      <CollectionDetailsDescription description={description} />
    </ProfileBackgroundBanner>
  )
}
