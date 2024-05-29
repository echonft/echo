import type { Offer } from '@echo/model/types/offer'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { useTranslations } from 'next-intl'
import { assoc, isEmpty, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
}

export const ListingDetailsOffers: FunctionComponent<Props> = ({ offers }) => {
  const t = useTranslations('listing.details.offers')

  if (isEmpty(offers)) {
    return <EmptyViewContent message={t('empty')} />
  }
  return <OfferCardsContainer offers={map(assoc('role', undefined), offers)} options={{ asLink: true }} />
}
