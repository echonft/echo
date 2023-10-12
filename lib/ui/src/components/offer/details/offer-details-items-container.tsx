import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ isReceiver, items }) => {
  const t = useTranslations('shared.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader direction={isReceiver ? DirectionIn : DirectionOut} title={t(isReceiver ? 'in' : 'out')} />
      <NftsContainer nfts={nfts} centered={true} />
    </div>
  )
}
