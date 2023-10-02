'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/offer-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileOffersReceivedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-received-empty'
import { NavigationOffersReceived } from '@echo/ui/constants/navigation-item'
import { OfferRoleReceiver } from '@echo/ui/constants/offer-role'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: OfferResponse[]
  user: AuthUser
}

export const ProfileOffersReceivedApiProvided: FunctionComponent<Props> = ({ responses, user }) => {
  const mappedOffers = useMemo(
    () => map(pipe(mapOfferFromResponse, assoc('role', OfferRoleReceiver)), responses),
    [responses]
  ) as OfferWithRole[]
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationOffersReceived} user={user}>
      <HideIf condition={dataIsEmpty}>
        <OfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileOffersReceivedEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
