import { DirectionIn } from '../../../constants/swap-direction'
import { CollectionThumbnail } from '../../collection/thumbnail/collection-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { ListingTarget } from '@echo/ui-model'
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
          ({ amount, collection }) => (
            <CollectionThumbnail key={collection.id} collection={collection} count={amount} />
          ),
          targets
        )}
      </div>
    </div>
  )
}
