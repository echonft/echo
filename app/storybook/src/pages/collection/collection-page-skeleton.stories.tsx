// noinspection JSUnusedGlobalSymbols

import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CollectionPageSkeleton as Component } from '@echo/ui/pages/collection/skeleton/collection-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection',
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
