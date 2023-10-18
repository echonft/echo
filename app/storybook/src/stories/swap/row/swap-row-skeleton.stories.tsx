import { SwapRowSkeleton as Component } from '@echo/ui/components/swap/row/skeleton/swap-row-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Swap/Row',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
