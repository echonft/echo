'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/profile-navigation-layout'
import { ProfileSwapsEmpty } from '@echo/ui/components/profile/swap/empty/profile-swaps-empty'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { OfferRoleReceiver, OfferRoleSender } from '@echo/ui/constants/offer-role'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc, ifElse, isEmpty, map, pathEq, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: OfferResponse[]
  user: AuthUser
}

export const ProfileSwapsApiProvided: FunctionComponent<Props> = ({ responses, user }) => {
  const mappedOffers = useMemo(
    () =>
      map(
        pipe(
          mapOfferFromResponse,
          ifElse(pathEq(user.id, ['sender', 'id']), assoc('role', OfferRoleReceiver), assoc('role', OfferRoleSender))
        ),
        responses
      ),
    [user.id, responses]
  ) as OfferWithRole[]
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationSwaps} user={user}>
      <HideIf condition={dataIsEmpty}>
        <SwapRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileSwapsEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
