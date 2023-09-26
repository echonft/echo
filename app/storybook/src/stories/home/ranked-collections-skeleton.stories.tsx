import { RankedCollectionsSkeleton as Component } from '@echo/ui/components/home/collection/ranked/skeleton/ranked-collections-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Ranked Collections',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
