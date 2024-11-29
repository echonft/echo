import type { Counts } from '@echo/model/types/counts'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { UserTabs } from '@echo/ui/pages/user/user-tabs'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  isAuthUser: boolean
  counts: Counts
  listings: ListingWithRole[]
  nfts: OwnedNft[]
  offers: OfferWithRole[]
  swaps: SwapWithRole[]
  user: User
  selection?: number
}

export const UserPage: FunctionComponent<Props> = ({
  isAuthUser,
  counts,
  listings,
  nfts,
  offers,
  swaps,
  user,
  selection
}) => {
  return (
    <NavigationLayout>
      <SectionLayout>
        <UserProfile counts={counts} user={user} />
      </SectionLayout>
      <NavigationSectionLayout>
        <UserTabs
          isAuthUser={isAuthUser}
          listings={listings}
          nfts={nfts}
          offers={offers}
          swaps={swaps}
          selection={selection}
        />
      </NavigationSectionLayout>
    </NavigationLayout>
  )
}
