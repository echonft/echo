import { HomeCollectionsSkeleton as Component } from '@echo/ui/components/home/collection/skeleton/home-collections-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Collections',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
