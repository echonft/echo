'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserSwapsEmpty } from '@echo/ui/components/user/swap/empty/user-swaps-empty'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: Array<Partial<OfferResponse>>
}

export const UserSwapsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedOffers = useMemo(() => map(mapOfferFromResponse, responses), [responses])
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationSwaps}>
      <HideIf condition={dataIsEmpty}>
        <SwapRowsContainer offers={mappedOffers} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <UserSwapsEmpty username={username} />
      </ShowIf>
    </UserNavigationLayout>
  )
}
