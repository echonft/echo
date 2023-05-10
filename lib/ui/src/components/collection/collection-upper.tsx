import { Banner } from '../base/banner'
import { CollectionDetails, CollectionDetailsProps } from './collection-details'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionUpperProps extends CollectionDetailsProps {
  bannerUrl: string | undefined
  description: string
}

export const CollectionUpper: FunctionComponent<CollectionUpperProps> = ({
  bannerUrl,
  size,
  name,
  description,
  profilePictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <Banner src={bannerUrl} />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'pb-8')}>
        <CollectionDetails
          name={name}
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
