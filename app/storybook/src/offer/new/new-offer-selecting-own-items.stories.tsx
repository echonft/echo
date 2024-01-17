import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NewListingBannerManager } from '@echo/ui/components/listing/new/new-listing-banner-manager'
import { NewOfferBannerManager } from '@echo/ui/components/offer/new/new-offer-banner-manager'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { type Meta, type StoryObj } from '@storybook/react'
import { RouteChangesProvider } from 'nextjs-router-events'
import { type FunctionComponent, useEffect } from 'react'

const metadata: Meta<FunctionComponent> = {
  title: 'Offer/New/Selecting Own Items'
}

export default metadata

type Story = StoryObj<FunctionComponent>

export const SelectingOwnItems: Story = {
  render: () => {
    const user = getAuthUserMockByUsername('crewnft_')
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
        <NewOfferBannerManager />
        <NewListingBannerManager />
        <SectionLayout>
          <ProfileDetailsApiProvided user={user} />
        </SectionLayout>
        <SectionLayout>
          <RouteChangesProvider>
            <ProfileNftsApiProvided nfts={getAllNftMocks()} user={user} />
          </RouteChangesProvider>
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
