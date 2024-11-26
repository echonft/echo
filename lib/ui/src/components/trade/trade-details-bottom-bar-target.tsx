import type { Listing } from '@echo/model/types/listing'
import { TradeDetailsBottomBarItemImage } from '@echo/ui/components/trade/trade-details-bottom-bar-item-image'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  target: Listing['target']
}

export const TradeDetailsBottomBarTarget: FunctionComponent<Props> = ({ target }) => {
  return (
    <div className={clsx('w-max', 'h-max', 'flex', 'flex-row', 'items-center', 'gap-1.5')}>
      <TradeDetailsBottomBarItemImage alt={target.collection.name} src={target.collection.pictureUrl} />
      <span className={clsx('prose-label-sm-semi', 'text-white')}>{`x${target.quantity}`}</span>
    </div>
  )
}
