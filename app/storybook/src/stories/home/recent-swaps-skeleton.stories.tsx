import { RecentSwapsSkeleton as Component } from '@echo/ui/components/home/swap/skeleton/recent-swaps-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Recent Swaps',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
