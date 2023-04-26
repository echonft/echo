import { ProfilePicture } from '../base/profile-picture'
import { CollectionLinks, CollectionLinksProps } from './collection-links'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CollectionDetailsProps extends CollectionLinksProps {
  name: string
  description: string
  profilePictureUrl: string
}

export const CollectionDetails: FunctionComponent<CollectionDetailsProps> = ({
  name,
  description,
  profilePictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'gap-8')}>
      <ProfilePicture src={profilePictureUrl} />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase')}>{name}</h1>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'justify-between')}>
          <h2 className={clsx('text-white', 'prose-header-md')}>{description}</h2>
          <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
        </div>
      </div>
    </div>
  )
}
