import type { CollectionWithCounts } from '@echo/model/types/collection'
import { ProfileLayout } from '@echo/ui/components/base/profile/layout/profile-layout'
import { ProfileCounts } from '@echo/ui/components/base/profile/profile-counts'
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
    pictureUrl,
    discordUrl,
    twitterUsername,
    websiteUrl,
    offersCount,
    nftsCount,
    listingsCount,
    swapsCount
  } = collection

  return (
    <ProfileLayout bannerUrl={pictureUrl}>
      <CollectionProfile
        name={name}
        totalSupply={totalSupply}
        pictureUrl={pictureUrl}
        discordUrl={discordUrl}
        websiteUrl={websiteUrl}
        twitterUsername={twitterUsername}
      />
      <ProfileCounts
        listingsCount={listingsCount}
        nftsCount={nftsCount}
        offersCount={offersCount}
        swapsCount={swapsCount}
      />
      <CollectionDetailsDescription description={description} />
    </ProfileLayout>
  )
}
