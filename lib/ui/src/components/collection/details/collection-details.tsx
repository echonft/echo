import type { CollectionWithCounts } from '@echo/model/types/collection'
import { CountsDetails } from '@echo/ui/components/base/counts-details'
import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { CollectionDetailsDescription } from '@echo/ui/components/collection/details/collection-details-description'
import { CollectionProfile } from '@echo/ui/components/collection/profile/collection-profile'
import { type FunctionComponent } from 'react'

interface Props {
  collection: CollectionWithCounts
}

export const CollectionDetails: FunctionComponent<Props> = ({ collection }) => {
  const {
    totalSupply,
    name,
    description,
    profilePictureUrl,
    discordUrl,
    twitterUsername,
    verified,
    websiteUrl,
    offersCount,
    nftsCount,
    listingsCount,
    swapsCount
  } = collection

  return (
    <ProfileLayout bannerUrl={profilePictureUrl}>
      <CollectionProfile
        name={name}
        totalSupply={totalSupply}
        profilePictureUrl={profilePictureUrl}
        discordUrl={discordUrl}
        websiteUrl={websiteUrl}
        twitterUsername={twitterUsername}
        verified={verified}
      />
      <CountsDetails
        listingsCount={listingsCount}
        nftsCount={nftsCount}
        offersCount={offersCount}
        swapsCount={swapsCount}
      />
      <CollectionDetailsDescription description={description} />
    </ProfileLayout>
  )
}
