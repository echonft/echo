import type { UserProfile } from '@echo/model/types/user-profile'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { PageLayoutSkeleton as Component } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Layout/Page Layout',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = getAuthUserMockByUsername('johnnycagewins')
export const Default: Story = {
  render: () => (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <UserDetailsApiProvided user={user as UserProfile} />
      </SectionLayout>
      <SectionLayout>
        <UserNftsApiProvided nfts={getAllNftMocks()} username={user.username} />
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export const WithCallout: Story = {
  render: () => {
    const { show, dismiss } = useAlertStore()
    useEffect(() => {
      show({ severity: CALLOUT_SEVERITY_INFO, message: 'This is a callout', permanent: true })
    }, [show])
    useEffect(() => {
      return (): void => {
        dismiss()
      }
    }, [dismiss])
    return (
      <NavigationPageLayout user={user}>
        <SectionLayout>
          <UserDetailsApiProvided user={user as UserProfile} />
        </SectionLayout>
        <SectionLayout>
          <UserNftsApiProvided nfts={getAllNftMocks()} username={user.username} />
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
