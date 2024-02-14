import type { ListingTarget } from '@echo/model/types/listing-target'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  target: ListingTarget
}

export const ListingDetailsTargetContainer: FunctionComponent<Props> = ({ target }) => {
  const t = useTranslations('listing.details.target')

  return (
    <div className={classes('flex', 'flex-row', 'items-center', 'gap-4.5')}>
      <span className={classes('prose-paragraph-lg', '!text-[0.9375rem]', 'text-white')}>
        {t('quantity', { count: target.amount })}
      </span>
      <CollectionThumbnail collection={target.collection} />
    </div>
  )
}
