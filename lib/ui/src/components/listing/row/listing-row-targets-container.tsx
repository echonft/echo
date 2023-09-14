import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionIn } from '@echo/ui/constants/swap-direction'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  targets: Array<ListingTarget>
}

export const ListingRowTargetsContainer: FunctionComponent<Props> = ({ targets }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <SwapDirectionHeader direction={DirectionIn} title={t('in')} />
      <div className={clsx('flex', 'grow', 'gap-5', 'flex-wrap')}>
        {map(
          ({ amount, collection }) => (
            <CollectionThumbnail key={collection.id} collection={collection} count={amount} />
          ),
          targets
        )}
      </div>
    </div>
  )
}
