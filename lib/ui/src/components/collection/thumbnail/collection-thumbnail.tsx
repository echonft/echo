import { type Collection } from '@echo/model/types/collection'
import { CollectionProfilePicture } from '@echo/ui/components/collection/profile/collection-profile-picture'
import { CollectionThumbnailLayout } from '@echo/ui/components/collection/thumbnail/layout/collection-thumbnail-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  collection: Collection
  disabled?: boolean
  onClick?: MouseEventHandler
}

export const CollectionThumbnail: FunctionComponent<Props> = ({ collection, disabled, onClick }) => {
  const t = useTranslations('collection.thumbnail')
  const { name, profilePictureUrl, totalSupply } = collection
  return (
    <CollectionThumbnailLayout onClick={onClick} disabled={disabled}>
      <CollectionProfilePicture collectionName={name} pictureUrl={profilePictureUrl} />
      <div className={clsx('flex', 'flex-col', 'justify-center')}>
        <span className={clsx('prose-header-sm', 'text-white', 'select-none')}>{name}</span>
        <span className={clsx('prose-label-xs', '!text-[0.8125rem]', 'text-white/70', '!leading-6', 'select-none')}>
          {t('supply', { supply: totalSupply })}
        </span>
      </div>
    </CollectionThumbnailLayout>
  )
}
