import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { OfferItemThumbnailSkeleton } from '../offer-item/offer-item-thumbnail-skeleton'
import { DirectionIn, DirectionOut, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsItemsContainerProps {
  isReceiving: boolean
}

export const OfferDetailsItemsContainerSkeleton: FunctionComponent<OfferDetailsItemsContainerProps> = ({
  isReceiving
}) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader
        direction={isReceiving ? DirectionIn : DirectionOut}
        title={t(isReceiving ? 'assetsInTitle' : 'assetsOutTitle')}
      />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        <OfferItemThumbnailSkeleton size={SizeLG} />
        <OfferItemThumbnailSkeleton size={SizeLG} />
        <OfferItemThumbnailSkeleton size={SizeLG} />
      </div>
    </div>
  )
}
