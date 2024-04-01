import { type Collection } from '@echo/model/types/collection'
import { RemoveIconSvg } from '@echo/ui/components/base/svg/remove-icon-svg'
import { CollectionProfilePicture } from '@echo/ui/components/collection/profile/collection-profile-picture'
import { CollectionThumbnailLayout } from '@echo/ui/components/collection/thumbnail/layout/collection-thumbnail-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
  onRemove?: VoidFunction
}

export const SelectableCollectionThumbnail: FunctionComponent<Props> = ({ collection, onRemove }) => {
  const t = useTranslations('collection.thumbnail')
  const { name, profilePictureUrl, totalSupply } = collection
  return (
    <CollectionThumbnailLayout>
      <CollectionProfilePicture collectionName={name} pictureUrl={profilePictureUrl} />
      <button
        className={clsx(
          'absolute',
          'top-2',
          'right-2',
          'w-4',
          'h-4',
          'rounded-full',
          'bg-red-500',
          'text-neutral-200',
          'drop-shadow-md',
          'flex',
          'justify-center',
          'items-center'
        )}
        onClick={onRemove}
      >
        <RemoveIconSvg />
      </button>
      <div className={clsx('flex', 'flex-col', 'justify-center')}>
        <span className={clsx('prose-header-sm', 'text-white', 'select-none')}>{name}</span>
        <span className={clsx('prose-label-xs', '!text-[0.8125rem]', 'text-white/70', '!leading-6', 'select-none')}>
          {t('supply', { supply: totalSupply })}
        </span>
      </div>
    </CollectionThumbnailLayout>
  )
}
