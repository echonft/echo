import { HideIfNil } from '../../base/utils/hide-if-nil'
import { CollectionLinks, CollectionLinksProps } from './collection-links'
import { CollectionProfilePicture, CollectionProfilePictureProps } from './collection-profile-picture'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface CollectionProfileProps extends CollectionLinksProps, CollectionProfilePictureProps {
  supplyCount: number | undefined
}

export const CollectionProfile: FunctionComponent<CollectionProfileProps> = ({
  collectionName,
  supplyCount,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl,
  size
}) => {
  const t = useTranslations('collection')
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8')}>
      <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} size={size} />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase', 'truncate')}>{collectionName}</h1>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'justify-between')}>
          <HideIfNil
            checks={supplyCount}
            render={(supplyCount) => (
              <h2 className={clsx('text-white', 'prose-header-md')}>{t('details.size', { size: supplyCount })}</h2>
            )}
          />
          <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
        </div>
      </div>
    </div>
  )
}
