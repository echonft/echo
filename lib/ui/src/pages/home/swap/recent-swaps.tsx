'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  swaps: SwapWithRole[]
}

export const RecentSwaps: FunctionComponent<Props> = ({ swaps }) => {
  const router = useRouter()
  const t = useTranslations('home.recentSwaps')

  if (isEmpty(swaps)) {
    return null
  }
  return (
    <HomeSectionLayout title={t('title')}>
      <SwapCards
        swaps={swaps}
        onSelect={(slug) => {
          router.push(frontendRoutes.swap.details.getUrl({ slug }))
        }}
      />
    </HomeSectionLayout>
  )
}
