import { SizeLG } from '../../../constants/size'
import { PaddedContainer } from '../../layout/padded-container'
import { Banner, BannerProps } from '../../shared/banner'
import { CollectionProfile, CollectionProfileProps } from './collection-profile'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
    <div className={clsx('w-full')}>
      <Banner bannerUrl={bannerUrl} />
      <PaddedContainer>
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
      </PaddedContainer>
    </div>
  )
}
