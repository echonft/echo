import type { Offer } from '@echo/model/types/offer/offer'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { ListingDetailsOffersLayout } from '@echo/ui/components/listing/details/layout/listing-details-offers-layout'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isEmpty, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
  show?: boolean
}

const Offers: FunctionComponent<Props> = ({ offers }) => {
  const t = useTranslations('listing.details.offers')

  if (isEmpty(offers)) {
    return <EmptyViewContent message={t('empty')} />
  }
  return <OfferCards offers={map(assoc('role', undefined), offers)} options={{ asLink: true }} />
}

export const ListingDetailsOffers: FunctionComponent<Props> = ({ offers, show }) => {
  const t = useTranslations('listing.details.offers')

  if (show) {
    return (
      <ListingDetailsOffersLayout>
        <div className={clsx('w-max', 'p-2.5', 'rounded-lg', 'bg-white/[0.08]')}>
          <span className={clsx('prose-label-md', 'text-white')}>{t('title')}</span>
        </div>
        <Offers offers={offers} />
      </ListingDetailsOffersLayout>
    )
  }
  return null
}
