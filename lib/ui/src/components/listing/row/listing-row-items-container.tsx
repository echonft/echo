import { type ListingItem } from '@echo/model/types/listing-item'
import { SwapDirectionHeader } from '@echo/ui/components/base/swap-direction-header'
import { NftCardsContainer } from '@echo/ui/components/nft/card/layout/nft-cards-container'
import { SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  items: ListingItem[]
}

export const ListingRowItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('listing.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'h-max', 'basis-0')}>
      <div className={clsx('flex', 'flex-col', 'gap-5', 'self-stretch', 'h-max')}>
        <SwapDirectionHeader direction={SWAP_DIRECTION_OUT} title={t('out')} />
        <NftCardsContainer nfts={nfts} />
      </div>
    </div>
  )
}
