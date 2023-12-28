import { ListingStackSkeleton as Component } from '@echo/ui/components/listing/stack/skeleton/listing-stack-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Stack',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
