import type { Collection } from '@echo/model/types/collection'
import { QuantityPicker } from '@echo/ui/components/base/quantity-picker'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import type { Target } from '@echo/ui/types/target'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: Nullable<Target>
  isMutating?: boolean
  onEdit?: (targetCollectionSlug: string, amount: number) => unknown
}

export const CreateListingModalTarget: FunctionComponent<Props> = ({ target, isMutating, onEdit }) => {
  const t = useTranslations('listing.create')

  if (isNil(target)) {
    return (
      <div className={clsx('flex', 'w-full', 'h-40', 'px-2', 'justify-center', 'items-center')}>
        <span className={clsx('text-white/10', 'prose-display-sm', 'whitespace-pre-line', 'text-center')}>
          {t('empty.targets')}
        </span>
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'w-full', 'h-40', 'justify-center', 'items-center', 'gap-6')}>
      <CollectionThumbnail collection={target.collection as Collection} disabled={isMutating} />
      <QuantityPicker
        initialQty={target.amount}
        onQtyChange={(newQuantity) => {
          onEdit?.(target.collection.slug, newQuantity)
        }}
        disabled={isMutating}
      />
    </div>
  )
}
