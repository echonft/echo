import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsStateSkeleton } from '@echo/ui/components/trade/skeleton/trade-details-state-skeleton'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { Alignment } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <TradeDetailsLayout>
    <TradeDetailsStateSkeleton />
    <TradeDetailsInfoLayout>
      <TradeDetailsUserInfoLayout>
        <UserDetailsSkeleton />
        <CardsSkeleton alignment={ALIGNMENT_LEFT} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      <TradeDetailsUserInfoLayout>
        <UserDetailsSkeleton />
        <CardsSkeleton alignment={ALIGNMENT_LEFT} />
      </TradeDetailsUserInfoLayout>
    </TradeDetailsInfoLayout>
  </TradeDetailsLayout>
)
