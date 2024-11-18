// noinspection JSUnusedGlobalSymbols

import { Header } from '@echo/ui/components/base/header/header'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { HomePageSkeleton as Component } from '@echo/ui/pages/home/home-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={PageLayoutBackground.Home}>
        <Header />
        <Story />
      </PageLayout>
    )
  ]
}

export default metadata

export const Loading: StoryObj<typeof Component> = {}
