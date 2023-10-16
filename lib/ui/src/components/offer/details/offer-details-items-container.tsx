import type { OfferItem } from '@echo/model/types/offer-item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { AlignmentCenter } from '@echo/ui/constants/alignment'
import { SwapDirection } from '@echo/ui/types/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Props {
  direction: SwapDirection
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ direction, items }) => {
  const t = useTranslations('offer.details.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader direction={direction} title={t(direction)} />
      <NftsContainer nfts={nfts} alignment={AlignmentCenter} />
    </div>
  )
}
