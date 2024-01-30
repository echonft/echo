import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const RecentSwaps: FunctionComponent<Props> = ({ offers }) => {
  const t = useTranslations('home.recentSwaps')

  if (isEmpty(offers)) {
    return null
  }
  return (
    <HomeSectionLayout title={t('title')}>
      <OfferCardsContainer offers={offers} options={{ asLink: true }} />
    </HomeSectionLayout>
  )
}
