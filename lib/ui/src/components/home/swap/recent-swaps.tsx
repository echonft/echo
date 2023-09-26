import { HomeSectionLayout } from '@echo/ui/components/home/layout/home-section-layout'
import { RecentSwapsLayout } from '@echo/ui/components/home/swap/layout/recent-swaps-layout'
import { SwapRow } from '@echo/ui/components/swap/row/swap-row'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { Offer } from '@echo/ui/types/model/offer'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Array<Offer>
}

export const RecentSwaps: FunctionComponent<Props> = ({ offers }) => {
  const t = getTranslator()
  return (
    <HomeSectionLayout title={t('home.recentSwaps.title')}>
      <RecentSwapsLayout>
        {map(
          (offer) => (
            <SwapRow key={offer.id} offer={offer} />
          ),
          offers
        )}
      </RecentSwapsLayout>
    </HomeSectionLayout>
  )
}
