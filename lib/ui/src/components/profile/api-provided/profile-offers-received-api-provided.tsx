'use client'
import { NavigationListingsReceived } from '../../../constants/navigation-item'
import { OfferRoleReceiver } from '../../../constants/offer-role'
import { OfferWithRole } from '../../../types/offer-with-role'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { CurrentUserOfferRowsContainer } from '../../offer/layout/container/current-user-offer-rows-container'
import { ProfileOffersReceivedEmpty } from '../offer/empty/profile-offers-received-empty'
import { ProfileNavigationLayout } from '../profile-navigation-layout'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  responses: Array<Partial<OfferResponse>>
}

export const ProfileOffersReceivedApiProvided: FunctionComponent<Props> = ({ responses }) => {
  const mappedOffers = useMemo(
    () => map(pipe(mapOffer, assoc('role', OfferRoleReceiver)), responses),
    [responses]
  ) as Array<OfferWithRole>
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationListingsReceived}>
      <HideIf condition={dataIsEmpty}>
        <CurrentUserOfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileOffersReceivedEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
