// noinspection JSUnusedGlobalSymbols

import type { UserProfile } from '@echo/model/types/user-profile'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent, useEffect } from 'react'

type ComponentType = FunctionComponent<Record<'callout', boolean> & Record<'banner', boolean>>
const DEFAULT_CALLOUT = false
const DEFAULT_BANNER = false
const metadata: Meta<ComponentType> = {
  title: 'Base/Layout/Page',
  argTypes: {
    callout: {
      options: DEFAULT_CALLOUT,
      control: { type: 'boolean' }
    },
    banner: {
      options: DEFAULT_BANNER,
      control: { type: 'boolean' }
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  args: {
    banner: DEFAULT_BANNER,
    callout: DEFAULT_CALLOUT
  },
  render: ({ callout, banner }) => {
    const user = getAuthUserMockByUsername('johnnycagewins')
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
          <UserDetails user={user as UserProfile} />
        </SectionLayout>
        <SectionLayout>
          <UserNfts nfts={getAllNftMocks()} />
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
