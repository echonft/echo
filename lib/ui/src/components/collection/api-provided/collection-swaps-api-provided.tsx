'use client'
import { CollectionSwapsContainer } from '../collection-swaps-container'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<OfferResponse>>
}

export const CollectionSwapsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  // TODO we might have to show the skeleton if this is slow
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])

  return <CollectionSwapsContainer collectionSlug={collectionSlug} offers={mappedOffers} />
}
