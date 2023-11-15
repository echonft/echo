import { type Item } from '@echo/model/types/item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type SwapDirection } from '@echo/ui/types/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  direction: SwapDirection
  items: Item[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ direction, items }) => {
  const t = useTranslations('offer.details.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader direction={direction} title={t(direction)} />
      <NftsContainer nfts={nfts} alignment={ALIGNMENT_CENTER} />
    </div>
  )
}
