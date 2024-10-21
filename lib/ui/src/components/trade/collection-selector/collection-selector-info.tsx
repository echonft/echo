import type { Collection } from '@echo/model/types/collection/collection'
import { CollectionSelectorCollectionPicture } from '@echo/ui/components/trade/collection-selector/collection-selector-collection-picture'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  collection: Collection
}

export const CollectionSelectorInfo: FunctionComponent<Props> = ({ collection }) => {
  const t = useTranslations('trade.collectionSelector')

  return (
    <div className={clsx('flex', 'flex-row', 'gap-2.5')}>
      <CollectionSelectorCollectionPicture pictureURL={collection.profilePictureUrl} alt={collection.name} />
      <div className={clsx('flex', 'flex-col', 'gap-1')}>
        <span className={clsx('prose-paragraph-md', 'text-white')}>{collection.name}</span>
        <span className={clsx('prose-paragraph-xs', 'text-white/50')}>{t('subtitle')}</span>
      </div>
    </div>
  )
}
