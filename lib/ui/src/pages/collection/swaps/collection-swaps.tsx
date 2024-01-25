'use client'
import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { CollectionSwapsEmpty } from '@echo/ui/pages/collection/swaps/collection-swaps-empty'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const CollectionSwaps: FunctionComponent<Props> = ({ offers }) => {
  if (isEmpty(offers)) {
    return <CollectionSwapsEmpty />
  }
  return <OfferCardsContainer offers={offers} options={{ asLink: true }} />
}
