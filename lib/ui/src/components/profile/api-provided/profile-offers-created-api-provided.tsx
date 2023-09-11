'use client'
import { NavigationListingsReceived } from '../../../constants/navigation-item'
import { OfferRoleSender } from '../../../constants/offer-role'
import { OfferWithRole } from '../../../types/offer-with-role'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { CurrentUserOfferRowsContainer } from '../../offer/layout/container/current-user-offer-rows-container'
import { ProfileOffersCreatedEmpty } from '../offer/empty/profile-offers-created-empty'
import { ProfileNavigationLayout } from '../profile-navigation-layout'
import type { OfferResponse } from '@echo/api/types'
import { mapOffer } from '@echo/ui-model'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

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
