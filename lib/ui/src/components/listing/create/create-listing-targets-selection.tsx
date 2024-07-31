'use client'
import type { Collection } from '@echo/model/types/collection'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { QuantityPicker } from '@echo/ui/components/base/quantity-picker'
import { SearchBox } from '@echo/ui/components/base/search/search-box'
import { SelectableCollectionThumbnail } from '@echo/ui/components/collection/thumbnail/selectable-collection-thumbnail'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { applySpec, isNil, pipe, prop } from 'ramda'
import type { FunctionComponent } from 'react'

export interface CreateListingTargetsSelectionProps {
  target: Nullable<ListingTarget>
  onQtyChange?: (newQuantity: number) => void
  onRemove?: VoidFunction
  onSelect?: (selection: Collection) => void
}

export const CreateListingTargetsSelection: FunctionComponent<CreateListingTargetsSelectionProps> = ({
  target,
  onQtyChange,
  onRemove,
  onSelect
}) => {
  const t = useTranslations('listing.create')
  const { searchCollections } = useDependencies()
  if (isNil(target)) {
    return (
      <div className={clsx('flex', 'flex-col', 'w-full', 'h-max', 'gap-6')}>
        <SearchBox
          resultsProvider={searchCollections}
          style={{ placeHolder: t('targets.search.placeHolder') }}
          onSelect={pipe(
            applySpec<Collection>({
              name: prop('label'),
              profilePictureUrl: prop('pictureUrl'),
              slug: prop('value')
            }),
            (collection: Collection) => {
              onSelect?.(collection)
            }
          )}
        />
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
