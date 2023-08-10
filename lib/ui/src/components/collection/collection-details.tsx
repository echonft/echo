import { Banner, BannerProps } from '../base/banner'
import { CollectionProfile, CollectionProfileProps } from './collection-profile'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionDetailsProps extends CollectionProfileProps, BannerProps {
  description: string
}

export const CollectionDetails: FunctionComponent<CollectionDetailsProps> = ({
  bannerUrl,
  size,
  collectionName,
  description,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <Banner bannerUrl={bannerUrl} />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'pb-8')}>
        <CollectionProfile
          collectionName={collectionName}
          size={size}
          pictureUrl={pictureUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
        />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full')}>
        <p className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>{description}</p>
      </div>
    </div>
  )
}
