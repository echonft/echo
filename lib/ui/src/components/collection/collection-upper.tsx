import { Banner, BannerProps } from '../base/banner'
import { CollectionDetails, CollectionDetailsProps } from './collection-details'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionUpperProps extends CollectionDetailsProps, BannerProps {
  description: string
}

export const CollectionUpper: FunctionComponent<CollectionUpperProps> = ({
  bannerUrl,
  size,
  collectionName,
  description,
  profilePictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <Banner bannerUrl={bannerUrl} />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'pb-8')}>
        <CollectionDetails
          collectionName={collectionName}
          size={size}
          profilePictureUrl={profilePictureUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
        />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pb-14')}>
        <p className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>{description}</p>
      </div>
    </div>
  )
}
