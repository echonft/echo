// noinspection JSUnusedGlobalSymbols

import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model/mocks/user/user-profile-mock'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent, useEffect } from 'react'

type ComponentType = FunctionComponent<{
  callout: boolean
}>
const metadata: Meta<ComponentType> = {
  title: 'Base/Layout/Page',
  args: {
    callout: false
  },
  argTypes: {
    callout: {
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ callout }) => {
    const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
    const profile = getUserProfileMockByUsername(userMockJohnnyUsername())
    const { show, dismiss } = useAlertStore()
    useEffect(() => {
      if (callout) {
        show({ severity: CALLOUT_SEVERITY_INFO, message: 'This is a callout', permanent: true })
      } else {
        dismiss()
      }
    }, [show, dismiss, callout])

    return (
      <NavigationPageLayout user={user} excludeProviders={true}>
        <SectionLayout>
          <UserProfile profile={profile} />
        </SectionLayout>
        <SectionLayout>
          <UserNfts nfts={getAllNftMocks()} isAuthUser={true} />
        </SectionLayout>
      </NavigationPageLayout>
    )
  }
}
