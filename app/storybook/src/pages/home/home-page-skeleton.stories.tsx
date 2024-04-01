// noinspection JSUnusedGlobalSymbols

import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'
import { HomePageSkeleton as Component } from '@echo/ui/pages/home/home-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={PAGE_LAYOUT_BG_HOME} excludeProviders={true}>
        <Story />
      </PageLayout>
    )
  ]
}

export default metadata

export const Loading: StoryObj<typeof Component> = {}
