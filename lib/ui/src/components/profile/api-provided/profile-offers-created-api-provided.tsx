'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/offer-rows-container'
import { ProfileOffersCreatedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-created-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/profile-navigation-layout'
import { NavigationOffersCreated } from '@echo/ui/constants/navigation-item'
import { OfferRoleSender } from '@echo/ui/constants/offer-role'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: Array<OfferResponse>
}

export const ProfileOffersCreatedApiProvided: FunctionComponent<Props> = ({ responses }) => {
  const mappedOffers = useMemo(
    () => map(pipe(mapOfferFromResponse, assoc('role', OfferRoleSender)), responses),
    [responses]
  ) as Array<OfferWithRole>
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationOffersCreated}>
      <HideIf condition={dataIsEmpty}>
        <OfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileOffersCreatedEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
