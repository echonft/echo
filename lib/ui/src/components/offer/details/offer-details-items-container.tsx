import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { NewOfferItemTitle } from '../new/new-offer-item-title'
import { OfferItem, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsItemsContainerProps {
  isReceiving: boolean
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<OfferDetailsItemsContainerProps> = ({
  isReceiving,
  items
}) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <NewOfferItemTitle isReceiving={isReceiving} title={t(isReceiving ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <OfferItemThumbnail item={item} key={item.nft.id} size={SizeLG} />
        ))}
      </div>
    </div>
  )
}
