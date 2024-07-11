import type { ListingTarget } from '@echo/model/types/listing-target'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  target: Nullable<ListingTarget>
}

export const ListingDetailsTarget: FunctionComponent<Props> = ({ target }) => {
  const t = useTranslations('listing.details.target')
  if (isNil(target)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-row', 'items-center', 'gap-4.5')}>
      <span className={clsx('prose-paragraph-lg', '!text-[0.9375rem]', 'text-white')}>
        {t('quantity', { count: target.amount })}
      </span>
      <CollectionThumbnail collection={target.collection} />
    </div>
  )
}
