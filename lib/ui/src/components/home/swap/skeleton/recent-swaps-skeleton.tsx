import { HomeSectionLayout } from '@echo/ui/components/home/layout/home-section-layout'
import { RecentSwapsLayout } from '@echo/ui/components/home/swap/layout/recent-swaps-layout'
import { SwapRowSkeleton } from '@echo/ui/components/swap/row/skeleton/swap-row-skeleton'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const RecentSwapsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <HomeSectionLayout title={t('home.recentSwaps.title')}>
      <RecentSwapsLayout>
        <SwapRowSkeleton />
        <SwapRowSkeleton />
        <SwapRowSkeleton />
      </RecentSwapsLayout>
    </HomeSectionLayout>
  )
}
