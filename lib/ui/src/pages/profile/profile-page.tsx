import type { Counts } from '@echo/model/types/counts'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Swap } from '@echo/model/types/swap'
import type { User } from '@echo/model/types/user'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  counts: Counts
  listings: ListingWithRole[]
  nfts: OwnedNft[]
  offers: OfferWithRole[]
  pendingListings: ListingWithRole[]
  swaps: Swap[]
  user: User
}

export const ProfilePage: FunctionComponent<Props> = ({
  counts,
  listings,
  nfts,
  offers,
  pendingListings,
  swaps,
  user
}) => {
  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <NavigationLayout>
          <SectionLayout>
            <AuthUserProfile counts={counts} user={user} />
          </SectionLayout>
          <NavigationSectionLayout>
            <ProfileTabs
              listings={listings}
              nfts={nfts}
              offers={offers}
              pendingListings={pendingListings}
              swaps={swaps}
            />
          </NavigationSectionLayout>
        </NavigationLayout>
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}
