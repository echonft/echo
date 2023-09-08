import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { ItemThumbnailSkeleton } from '../item/item-thumbnail-skeleton'
import { DirectionIn, DirectionOut, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
}

export const OfferDetailsItemsContainerSkeleton: FunctionComponent<Props> = ({ isReceiver }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader direction={isReceiver ? DirectionIn : DirectionOut} title={t(isReceiver ? 'in' : 'out')} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </div>
    </div>
  )
}
