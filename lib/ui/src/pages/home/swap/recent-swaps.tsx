import type { Swap } from '@echo/model/types/swap'
import { SwapCardsContainer } from '@echo/ui/components/swap/card/layout/swap-cards-container'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  swaps: Swap[]
}

export const RecentSwaps: FunctionComponent<Props> = ({ swaps }) => {
  const t = useTranslations('home.recentSwaps')

  if (isEmpty(swaps)) {
    return null
  }
  return (
    <HomeSectionLayout title={t('title')}>
      <SwapCardsContainer swaps={swaps} options={{ asLink: true }} />
    </HomeSectionLayout>
  )
}
