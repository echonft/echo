import { ItemThumbnailSkeleton } from '@echo/ui/components/item/thumbnail/skeleton/item-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/shared/skeleton/swap-direction-header-skeleton'
import { SizeLG } from '@echo/ui/constants/size'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
}

export const OfferDetailsItemsContainerSkeleton: FunctionComponent<Props> = ({ isReceiver }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton
        direction={isReceiver ? DirectionIn : DirectionOut}
        title={t(isReceiver ? 'in' : 'out')}
      />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </div>
    </div>
  )
}
