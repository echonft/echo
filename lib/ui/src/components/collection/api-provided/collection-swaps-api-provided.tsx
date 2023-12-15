'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Offer } from '@echo/model/types/offer'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { CollectionSwapsEmpty } from '@echo/ui/components/collection/listing/empty/collection-swaps-empty'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  offers: Offer[]
  user: AuthUser | undefined
}

export const CollectionSwapsApiProvided: FunctionComponent<Props> = ({ collectionSlug, offers, user }) => {
  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NAVIGATION_SWAPS} user={user}>
      <HideIfEmpty checks={offers} render={(offers) => <SwapRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <CollectionSwapsEmpty />
      </ShowIfEmpty>
    </CollectionNavigationLayout>
  )
}
