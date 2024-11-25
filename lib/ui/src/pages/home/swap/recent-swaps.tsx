'use client'
import type { Swap } from '@echo/model/types/swap'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { SwapDetailsModal } from '@echo/ui/components/swap/details/swap-details-modal'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  swaps: Swap[]
}

export const RecentSwaps: FunctionComponent<Props> = ({ swaps }) => {
  const t = useTranslations('home.recentSwaps')
  const [swap, setSwap] = useState<Nullable<Swap>>(undefined)

  if (isEmpty(swaps)) {
    return null
  }
  return (
    <HomeSectionLayout title={t('title')}>
      <SwapCards swaps={swaps} />
      <SwapDetailsModal
        swap={swap}
        onClose={() => {
          setSwap(undefined)
        }}
      />
    </HomeSectionLayout>
  )
}
