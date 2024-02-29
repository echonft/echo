// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent, useEffect } from 'react'

type ComponentType = FunctionComponent<{
  callout: boolean
  banner: boolean
}>
const metadata: Meta<ComponentType> = {
  title: 'Base/Layout/Page',
  args: {
    banner: false,
    callout: false
  },
  argTypes: {
    callout: {
      options: false,
      control: { type: 'boolean' }
    },
    banner: {
      options: false,
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ callout, banner }) => {
    const user = getAuthUserMockByUsername('johnnycagewins')
    const profile = getUserProfileMockByUsername('johnnycagewins')
    const { show, dismiss } = useAlertStore()
    const { show: showBanner, dismiss: dismissBanner } = useBannerStore()
    useEffect(() => {
      if (callout) {
        show({ severity: CALLOUT_SEVERITY_INFO, message: 'This is a callout', permanent: true })
      } else {
        dismiss()
      }
    }, [show, dismiss, callout])
    useEffect(() => {
      if (banner) {
        showBanner({ title: 'This is a banner' })
      } else {
        dismissBanner()
      }
    }, [showBanner, dismissBanner, banner])
    useEffect(() => {
      return (): void => {
        dismiss()
        dismissBanner()
      }
    }, [dismiss, dismissBanner])

    return (
      <NavigationPageLayout user={user}>
        <SectionLayout>
          <UserProfile profile={profile} />
        </SectionLayout>
        <SectionLayout>
          <UserNfts nfts={getAllNftMocks()} isAuthUser={false} />
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
