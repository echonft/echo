// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getCollectionMock } from '@echo/model-mocks/collection/get-collection-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { CreateListingBannerManager } from '@echo/ui/components/listing/create/create-listing-banner-manager'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { ProfileNfts } from '@echo/ui/pages/profile/nfts/profile-nfts'
import { type Meta, type StoryObj } from '@storybook/react'
import { RouteChangesProvider } from 'nextjs-router-events'
import { type FunctionComponent, useEffect } from 'react'

const metadata: Meta<FunctionComponent> = {
  title: 'Listing/Creation/Selecting Items'
}

export default metadata

export const SelectingItems: StoryObj<FunctionComponent> = {
  render: () => {
    const user = getAuthUserMockByUsername('johnnycagewins')
    const profile = getUserProfileMockByUsername('johnnycagewins')
    const { setTarget, clearListing } = useNewListingStore()
    useEffect(() => {
      setTarget({ amount: 2, collection: getCollectionMock() })
      return clearListing
    }, [setTarget])
    return (
      <NavigationPageLayout user={user}>
        <CreateListingBannerManager />
        <SectionLayout>
          <UserProfile profile={profile} />
        </SectionLayout>
        <SectionLayout>
          <RouteChangesProvider>
            <ProfileNfts nfts={getAllNftMocks()} />
          </RouteChangesProvider>
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
