// noinspection JSUnusedGlobalSymbols

import { userMockCrew } from '@echo/model/mocks/user-mock'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { CollectionsPageSkeleton as Component } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collections',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={PageLayoutBackground.Collections}>
        <Header style={HeaderStyle.Default} user={userMockCrew} />
        <MainSectionLayout>
          <Story />
        </MainSectionLayout>
      </PageLayout>
    )
  ]
}

export default metadata

export const Loading: StoryObj<typeof Component> = {}
