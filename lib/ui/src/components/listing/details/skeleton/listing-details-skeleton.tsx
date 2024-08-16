import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsTargetSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-target-skeleton'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsStateSkeleton } from '@echo/ui/components/trade/skeleton/trade-details-state-skeleton'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { ALIGNMENT_LEFT } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <TradeDetailsLayout>
    <TradeDetailsStateSkeleton />
    <TradeDetailsInfoLayout>
      <TradeDetailsUserInfoLayout>
        <UserDetailsSkeleton />
        <CardsSkeleton alignment={ALIGNMENT_LEFT} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      {/*FIXME should be a layout, waiting on design */}
      <div className={clsx('flex', 'flex-col', 'gap-14', 'grow', 'basis-0')}>
        <ListingDetailsTargetLayout>
          <ListingDetailsTargetSkeleton />
        </ListingDetailsTargetLayout>
      </div>
    </TradeDetailsInfoLayout>
  </TradeDetailsLayout>
)
