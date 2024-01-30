import { type ListingItem } from '@echo/model/types/listing-item'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { CreateListingSwapDirectionHeader } from '@echo/ui/components/listing/create/create-listing-swap-direction-header'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  disabled?: boolean
}

export const CreateListingModalItems: FunctionComponent<Props> = ({ items, disabled }) => {
  const t = useTranslations('listing.create.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <CreateListingSwapDirectionHeader direction={SWAP_DIRECTION_OUT} title={t('out')} disabled={disabled} />
      </div>
      <CardsLayout alignment={ALIGNMENT_CENTER}>
        {map(
          (item) => (
            <NftThumbnail nft={item.nft} key={item.nft.id} disabled={disabled} />
          ),
          items
        )}
      </CardsLayout>
    </div>
  )
}
