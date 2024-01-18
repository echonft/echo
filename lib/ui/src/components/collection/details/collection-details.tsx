import {
  CollectionProfile,
  type CollectionProfileProps
} from '@echo/ui/components/collection/details/collection-profile'
import {
  CollectionDetailsLayout,
  type CollectionDetailsLayoutProps
} from '@echo/ui/components/collection/layout/collection-details-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends CollectionProfileProps, CollectionDetailsLayoutProps {
  description: string
}

export const CollectionDetails: FunctionComponent<Props> = ({
  bannerUrl,
  supplyCount,
  collectionName,
  description,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl,
  verified
}) => {
  return (
    <CollectionDetailsLayout bannerUrl={bannerUrl}>
      <PaddedContainer>
        <CollectionProfile
          collectionName={collectionName}
          supplyCount={supplyCount}
          pictureUrl={pictureUrl}
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
