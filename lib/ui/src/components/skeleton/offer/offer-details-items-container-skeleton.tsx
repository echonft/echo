import { OfferItemThumbnailSkeleton } from '../offer-item/offer-item-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '../shared/swap-direction-header-skeleton'
import { DirectionIn, DirectionOut, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiving: boolean
}

export const OfferDetailsItemsContainerSkeleton: FunctionComponent<Props> = ({ isReceiving }) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton
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
