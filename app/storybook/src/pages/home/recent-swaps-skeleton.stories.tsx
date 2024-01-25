// noinspection JSUnusedGlobalSymbols

import { RecentSwapsSkeleton as Component } from '@echo/ui/pages/home/swap/skeleton/recent-swaps-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Recent Swaps',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
