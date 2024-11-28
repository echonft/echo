import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { LoginLayout } from '@echo/ui/components/base/auth/layout/login-layout'
import { LoginJoinEchoStep as Component } from '@echo/ui/components/base/auth/login-join-echo-step'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Login',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={PageLayoutBackground.Home}>
        <Header options={HeaderStyle.Plain} />
        <MainSectionLayout>
          <LoginLayout>
            <Story />
          </LoginLayout>
        </MainSectionLayout>
      </PageLayout>
    )
  ],
  loaders: [authStore.getState().signIn]
}

export default metadata

export const JoinEchoStep: StoryObj<typeof Component> = {}
