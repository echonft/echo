// noinspection JSUnusedGlobalSymbols

import { PageLayoutSkeleton as Component } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Page Layout',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
