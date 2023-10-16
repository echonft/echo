import type { ListingTarget } from '@echo/model/types/listing-target'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { AlignmentRight } from '@echo/ui/constants/alignment'
import { DirectionIn } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  targets: ListingTarget[]
}

export const ListingRowTargetsContainer: FunctionComponent<Props> = ({ targets }) => {
  const t = useTranslations('listing.assets')
  return (
    <div className={clsx('flex', 'flex-row-reverse', 'grow', 'h-max', 'basis-0')}>
      <div className={clsx('flex', 'flex-col', 'gap-5', 'self-stretch', 'h-max')}>
        <div className={clsx('flex', 'flex-row-reverse', 'h-max')}>
          <SwapDirectionHeader direction={DirectionIn} title={t('in')} />
        </div>
        <NftsLayout alignment={AlignmentRight}>
          {map(
            ({ amount, collection }) => (
              <CollectionThumbnail key={collection.id} collection={collection} count={amount} />
            ),
            targets
          )}
        </NftsLayout>
      </div>
    </div>
  )
}
