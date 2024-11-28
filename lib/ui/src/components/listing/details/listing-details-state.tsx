import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing'
import { Banner } from '@echo/ui/components/base/banner'
import { ListingDetailsStateLabel } from '@echo/ui/components/listing/details/listing-details-state-label'
import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/details/layout/trade-details-state-details-layout'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/details/trade-details-state-separator'
import { TradeDetailsStateExpiration } from '@echo/ui/components/trade/details/trade-details-state-expiration'
import { Alignment } from '@echo/ui/constants/alignments'
import { useComponentWidth } from '@echo/ui/hooks/use-component-width'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  trade: Listing
}

export const ListingDetailsState: FunctionComponent<Props> = ({ trade }) => {
  const { ref, width } = useComponentWidth<HTMLDivElement>()
  const { state, locked } = trade

  if (state === ListingState.Expired) {
    return (
      <div className={clsx('relative', 'w-full', 'h-32', 'pt-5')} ref={ref}>
        <Banner src={trade.target.collection.pictureUrl} width={width} />
        <div className={clsx('flex', 'justify-center', 'items-center', 'w-full', 'h-full', 'relative', 'z-2')}>
          <TradeDetailsStateExpiration trade={trade} />
        </div>
      </div>
    )
  } else if (locked) {
    return (
      <div className={clsx('relative', 'w-full', 'h-32', 'pt-5')} ref={ref}>
        <Banner src={trade.target.collection.pictureUrl} width={width} />
        <div className={clsx('flex', 'justify-center', 'items-center', 'w-full', 'h-full', 'relative', 'z-2')}>
          <ListingDetailsStateLabel state={state} />
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('relative', 'w-full', 'h-32')} ref={ref}>
      <Banner src={trade.target.collection.pictureUrl} width={width} />
      <div className={clsx('flex', 'justify-center', 'items-center', 'gap-20', 'w-full', 'h-full', 'relative', 'z-2')}>
        <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
          <TradeDetailsStateExpiration trade={trade} />
        </TradeDetailsStateDetailsLayout>
        <TradeDetailsStateSeparator locked={locked} />
        <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
          <ListingDetailsStateLabel state={state} />
        </TradeDetailsStateDetailsLayout>
      </div>
    </div>
  )
}
