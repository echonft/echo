import { HideIfNil } from '../utils/hide-if-nil'
import { CollectionLinks, CollectionLinksProps } from './collection-links'
import { CollectionProfilePicture, CollectionProfilePictureProps } from './collection-profile-picture'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface CollectionProfileProps extends CollectionLinksProps, CollectionProfilePictureProps {
  size: number | undefined
}

export const CollectionProfile: FunctionComponent<CollectionProfileProps> = ({
  collectionName,
  size,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  const t = useTranslations('collection')
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8')}>
      <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase', 'truncate')}>{collectionName}</h1>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'justify-between')}>
          <HideIfNil checks={size}>
            <h2 className={clsx('text-white', 'prose-header-md')}>{t('details.size', { size })}</h2>
          </HideIfNil>
          <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
        </div>
      </div>
    </div>
  )
}
