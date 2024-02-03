import { VerifiedIconSvg } from '@echo/ui/components/base/svg/verified-icon-svg'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionLinks, type CollectionLinksProps } from '@echo/ui/components/collection/details/collection-links'
import {
  CollectionProfilePicture,
  type CollectionProfilePictureProps
} from '@echo/ui/components/collection/details/collection-profile-picture'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface CollectionProfileProps extends CollectionLinksProps, CollectionProfilePictureProps {
  supplyCount: Nullable<number>
  verified?: boolean
}

export const CollectionProfile: FunctionComponent<CollectionProfileProps> = ({
  collectionName,
  supplyCount,
  pictureUrl,
  twitterUsername,
  discordUrl,
  websiteUrl,
  verified
}) => {
  const t = useTranslations('collection.details')
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8', 'pt-40', 'pb-8')}>
      <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <div className={clsx('flex', 'flex-row', 'items-center', 'gap-2.5')}>
          <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase', 'truncate')}>{collectionName}</h1>
          <ShowIf condition={Boolean(verified)}>
            <VerifiedIconSvg className={clsx('text-yellow-500')} width={30} height={28} />
          </ShowIf>
        </div>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'justify-between')}>
          <HideIfNil
            checks={supplyCount}
            render={(supplyCount) => (
              <h2 className={clsx('text-white', 'prose-header-md')}>{t('supply', { supply: supplyCount })}</h2>
            )}
          />
          <CollectionLinks twitterUsername={twitterUsername} discordUrl={discordUrl} websiteUrl={websiteUrl} />
        </div>
      </div>
    </div>
  )
}
