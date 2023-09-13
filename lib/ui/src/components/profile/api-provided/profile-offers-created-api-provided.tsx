'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CurrentUserOfferRowsContainer } from '@echo/ui/components/offer/layout/container/current-user-offer-rows-container'
import { ProfileOffersCreatedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-created-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/profile-navigation-layout'
import { NavigationListingsReceived } from '@echo/ui/constants/navigation-item'
import { OfferRoleSender } from '@echo/ui/constants/offer-role'
import { mapOffer } from '@echo/ui/mappers/from-api/map-offer'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: Array<Partial<OfferResponse>>
}

export const ProfileOffersCreatedApiProvided: FunctionComponent<Props> = ({ responses }) => {
  const mappedOffers = useMemo(
    () => map(pipe(mapOffer, assoc('role', OfferRoleSender)), responses),
    [responses]
  ) as Array<OfferWithRole>
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationListingsReceived}>
      <HideIf condition={dataIsEmpty}>
        <CurrentUserOfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileOffersCreatedEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
