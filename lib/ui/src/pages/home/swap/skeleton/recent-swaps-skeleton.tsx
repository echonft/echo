import { SwapRowSkeleton } from '@echo/ui/components/swap/row/skeleton/swap-row-skeleton'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { RecentSwapsLayout } from '@echo/ui/pages/home/swap/layout/recent-swaps-layout'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RecentSwapsSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.recentSwaps')
  return (
    <HomeSectionLayout title={t('title')}>
      <RecentSwapsLayout>
        <SwapRowSkeleton />
        <SwapRowSkeleton />
        <SwapRowSkeleton />
      </RecentSwapsLayout>
    </HomeSectionLayout>
  )
}
