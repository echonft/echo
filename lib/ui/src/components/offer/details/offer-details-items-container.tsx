import { SizeLG } from '../../../constants/size'
import { DirectionIn, DirectionOut } from '../../../constants/swap-direction'
import { ItemThumbnail } from '../../item/thumbnail/item-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { OfferItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ isReceiver, items }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeader direction={isReceiver ? DirectionIn : DirectionOut} title={t(isReceiver ? 'in' : 'out')} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <ItemThumbnail item={item} key={item.nft.id} size={SizeLG} />
        ))}
      </div>
    </div>
  )
}
