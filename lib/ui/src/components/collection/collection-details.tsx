import { ProfilePicture } from '../base/profile-picture'
import { CollectionLinks, CollectionLinksProps } from './collection-links'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface CollectionDetailsProps extends CollectionLinksProps {
  name: string
  size: number
  profilePictureUrl: string | undefined
}

export const CollectionDetails: FunctionComponent<CollectionDetailsProps> = ({
  name,
  size,
  profilePictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  const t = useTranslations('collection')
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8')}>
      <ProfilePicture name={name} src={profilePictureUrl} />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase')}>{name}</h1>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'justify-between')}>
          <h2 className={clsx('text-white', 'prose-header-md')}>{t('details.size', { size })}</h2>
          <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
        </div>
      </div>
    </div>
  )
}
