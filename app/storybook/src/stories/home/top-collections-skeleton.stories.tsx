import { TopCollectionsSkeleton as Component } from '@echo/ui/components/home/collection/skeleton/top-collections-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Top Collections',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {}
}
