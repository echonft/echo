import { CollectionThumbnail } from '../../collection/collection-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { DirectionIn, ListingTarget } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

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
          ({ collection }) => (
            <CollectionThumbnail key={collection.id} collection={collection} />
          ),
          targets
        )}
      </div>
    </div>
  )
}
