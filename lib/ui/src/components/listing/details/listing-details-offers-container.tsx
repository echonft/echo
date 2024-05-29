import type { Offer } from '@echo/model/types/offer'
import { ListingDetailsOffersLayout } from '@echo/ui/components/listing/details/layout/listing-details-offers-layout'
import { ListingDetailsOffers } from '@echo/ui/components/listing/details/listing-details-offers'
import { ListingDetailsTargetCollectionOrOfferTitle } from '@echo/ui/components/listing/details/listing-details-target-collection-or-offer-title'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
  show?: boolean
}

export const ListingDetailsOffersContainer: FunctionComponent<Props> = ({ offers, show }) => {
  const t = useTranslations('listing.details.offers')

  if (show) {
    return (
      <ListingDetailsOffersLayout>
        <ListingDetailsTargetCollectionOrOfferTitle title={t('title')} />
        <ListingDetailsOffers offers={offers} />
      </ListingDetailsOffersLayout>
    )
  }
  return null
}
