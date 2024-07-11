import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RecentSwapsSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.recentSwaps')
  return (
    <HomeSectionLayout title={t('title')}>
      <CardsSkeleton />
    </HomeSectionLayout>
  )
}
