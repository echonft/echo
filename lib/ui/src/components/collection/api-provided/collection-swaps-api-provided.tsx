'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { CollectionSwapsEmpty } from '@echo/ui/components/collection/listing/empty/collection-swaps-empty'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/container/offer-rows-container'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { mapOffer } from '@echo/ui/mappers/from-api/map-offer'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<OfferResponse>>
}

export const CollectionSwapsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationSwaps}>
      <HideIf condition={dataIsEmpty}>
        <OfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <CollectionSwapsEmpty />
      </ShowIf>
    </CollectionNavigationLayout>
  )
}
