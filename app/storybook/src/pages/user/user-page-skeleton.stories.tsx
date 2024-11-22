// noinspection JSUnusedGlobalSymbols

import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { UserPageSkeleton as Component } from '@echo/ui/pages/user/skeleton/user-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/User',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout>
        <HeaderSkeleton />
        <Story />
      </PageLayout>
    )
  ]
}

export default metadata

export const Loading: StoryObj<typeof Component> = {}
