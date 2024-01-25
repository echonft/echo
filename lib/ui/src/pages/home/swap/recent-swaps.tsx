import { type Offer } from '@echo/model/types/offer'
import { SwapRow } from '@echo/ui/components/swap/row/swap-row'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { RecentSwapsLayout } from '@echo/ui/pages/home/swap/layout/recent-swaps-layout'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
}

export const RecentSwaps: FunctionComponent<Props> = ({ offers }) => {
  const t = useTranslations('home.recentSwaps')
  return (
    <HomeSectionLayout title={t('title')}>
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
