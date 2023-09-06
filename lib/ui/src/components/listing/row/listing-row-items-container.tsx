import { NftThumbnail } from '../../nft/nft-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { DirectionOut, ListingItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  items: Array<ListingItem>
}

export const ListingRowItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('listing.details.assets.title')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <SwapDirectionHeader direction={DirectionOut} title={t('out')} />
      <div className={clsx('flex', 'flex-row', 'grow', 'gap-5', 'flex-wrap')}>
        {map(
          ({ nft }) => (
            <NftThumbnail key={nft.id} nft={nft} />
          ),
          items
        )}
      </div>
    </div>
  )
}
