import type { ListingItem } from '@echo/model/types/listing-item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionOut } from '@echo/ui/constants/swap-direction'
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
        <SwapDirectionHeader direction={DirectionOut} title={t('out')} />
        <NftsContainer nfts={nfts} />
      </div>
    </div>
  )
}
