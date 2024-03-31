import type { Collection } from '@echo/model/types/collection'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { QuantityPicker } from '@echo/ui/components/base/quantity-picker'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { SelectableCollectionThumbnail } from '@echo/ui/components/collection/thumbnail/selectable-collection-thumbnail'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface CreateListingTargetsSelectionProps {
  collections: Collection[]
  target: Nullable<ListingTarget>
  onQtyChange?: (newQuantity: number) => void
  onRemove?: VoidFunction
  onSelection?: (selection: Collection) => void
}

export const CreateListingTargetsSelection: FunctionComponent<CreateListingTargetsSelectionProps> = ({
  collections,
  target,
  onQtyChange,
  onRemove,
  onSelection
}) => {
  const t = useTranslations('listing.create')
  if (isNil(target)) {
    return (
      <div className={clsx('flex', 'flex-col', 'w-full', 'h-max', 'gap-6')}>
        <CollectionSearchBoxManager options={collections} onSelection={onSelection} />
        <div className={clsx('flex', 'w-full', 'h-40', 'px-2', 'justify-center', 'items-center')}>
          <span className={clsx('text-white/10', 'prose-display-sm', 'whitespace-pre-line', 'text-center')}>
            {t('targets.empty')}
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'w-full', 'h-max', 'justify-center', 'items-center', 'gap-6')}>
      <SelectableCollectionThumbnail collection={target.collection} onRemove={onRemove} />
      <QuantityPicker initialQty={target.amount} onQtyChange={onQtyChange} />
    </div>
  )
}
