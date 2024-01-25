import type { Collection } from '@echo/model/types/collection'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { CollectionProfile } from '@echo/ui/components/collection/details/collection-profile'
import { CollectionDetailsLayout } from '@echo/ui/components/collection/details/layout/collection-details-layout'
import { clsx } from 'clsx'
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
    twitterUsername,
    discordUrl,
    websiteUrl,
    verified
  } = collection
  return (
    <CollectionDetailsLayout bannerUrl={bannerUrl}>
      <PaddedContainer>
        <CollectionProfile
          collectionName={name}
          supplyCount={totalSupply}
          pictureUrl={profilePictureUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
          verified={verified}
        />
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full')}>
          <p className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>{description}</p>
        </div>
      </PaddedContainer>
    </CollectionDetailsLayout>
  )
}
