import { CollectionThumbnailSkeleton } from '@echo/ui/components/collection/thumbnail/skeleton/collection-thumbnail-skeleton'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsTargetSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'items-center', 'gap-4.5')}>
      <span className={clsx('prose-paragraph-lg', '!text-[0.9375rem]', 'text-white', 'invisible')}>{'x1'}</span>
      <CollectionThumbnailSkeleton />
    </div>
  )
}
