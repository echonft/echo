import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { DirectionIn, DirectionOut, OfferItem, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiving: boolean
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ isReceiving, items }) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader
        direction={isReceiving ? DirectionIn : DirectionOut}
        title={t(isReceiving ? 'assetsInTitle' : 'assetsOutTitle')}
      />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <OfferItemThumbnail item={item} key={item.nft.id} size={SizeLG} />
        ))}
      </div>
    </div>
  )
}
