// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { CreateListingBannerManager } from '@echo/ui/components/listing/create/create-listing-banner-manager'
import { CreateOfferBannerManager } from '@echo/ui/components/offer/create/create-offer-banner-manager'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { ProfileNfts } from '@echo/ui/pages/profile/nfts/profile-nfts'
import { type Meta, type StoryObj } from '@storybook/react'
import { RouteChangesProvider } from 'nextjs-router-events'
import { type FunctionComponent, useEffect } from 'react'

const metadata: Meta<FunctionComponent> = {
  title: 'Offer/Creation/Selecting Own Items'
}

export default metadata

export const SelectingOwnItems: StoryObj<FunctionComponent> = {
  render: () => {
    const user = getAuthUserMockByUsername('crewnft_')
    const profile = getUserProfileMockByUsername('crewnft_')
    const { setReceiverItems, clearOffer } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems([
        { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
        { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
      ])
      return clearOffer
    }, [setReceiverItems])
    return (
      <NavigationPageLayout user={user}>
        <CreateOfferBannerManager />
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
