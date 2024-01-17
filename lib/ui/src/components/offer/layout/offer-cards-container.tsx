import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { OfferCardsLayout } from '@echo/ui/components/offer/layout/offer-cards-layout'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const OfferCardsContainer: FunctionComponent<Props> = ({ offers }) => {
  return (
    <OfferCardsLayout>
      {map(
        (offer) => (
          <div className={clsx('flex', 'items-center', 'justify-center', 'w-[13.5rem]')}>
            <OfferCard key={offer.id} offer={offer} />
          </div>
        ),
        offers
      )}
    </OfferCardsLayout>
  )
}
