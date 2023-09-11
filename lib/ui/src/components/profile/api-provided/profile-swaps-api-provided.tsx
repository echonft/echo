'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { OfferRoleReceiver, OfferRoleSender } from '../../../constants/offer-role'
import { OfferWithRole } from '../../../types/offer-with-role'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { CurrentUserOfferRowsContainer } from '../../offer/layout/container/current-user-offer-rows-container'
import { ProfileNavigationLayout } from '../profile-navigation-layout'
import { ProfileSwapsEmpty } from '../swap/empty/profile-swaps-empty'
import type { OfferResponse } from '@echo/api/types'
import { mapOffer } from '@echo/ui-model'
import { assoc, ifElse, isEmpty, map, pathEq, pipe } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  userId: string
  responses: Array<Partial<OfferResponse>>
}

export const ProfileSwapsApiProvided: FunctionComponent<Props> = ({ userId, responses }) => {
  const mappedOffers = useMemo(
    () =>
      map(
        pipe(
          mapOffer,
          ifElse(pathEq(userId, ['sender', 'id']), assoc('role', OfferRoleReceiver), assoc('role', OfferRoleSender))
        ),
        responses
      ),
    [userId, responses]
  ) as Array<OfferWithRole>
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationSwaps}>
      <HideIf condition={dataIsEmpty}>
        <CurrentUserOfferRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileSwapsEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
