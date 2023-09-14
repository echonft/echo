import { NftsContainer } from '@echo/ui/components/nft/layout/container/nfts-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionOut } from '@echo/ui/constants/swap-direction'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  items: Array<ListingItem>
}

export const ListingRowItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('shared.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <SwapDirectionHeader direction={DirectionOut} title={t('out')} />
      <NftsContainer nfts={nfts} />
    </div>
  )
}
