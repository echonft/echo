import { type BannerProps, CollectionBanner } from '@echo/ui/components/collection/details/collection-banner'
import {
  CollectionProfile,
  type CollectionProfileProps
} from '@echo/ui/components/collection/details/collection-profile'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { SizeLG } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends CollectionProfileProps, BannerProps {
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
  websiteUrl
}) => {
  return (
    <>
      <CollectionBanner bannerUrl={bannerUrl} />
      <PaddedContainer>
        <div className={clsx('z-20', 'relative')}>
          <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'pb-8')}>
            <CollectionProfile
              collectionName={collectionName}
              supplyCount={supplyCount}
              pictureUrl={pictureUrl}
              discordUrl={discordUrl}
              websiteUrl={websiteUrl}
              twitterUsername={twitterUsername}
              size={SizeLG}
            />
          </div>
          <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full')}>
            <p className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>{description}</p>
          </div>
        </div>
      </PaddedContainer>
    </>
  )
}
