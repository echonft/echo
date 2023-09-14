import { ListingRowSkeleton as Component } from '@echo/ui/components/listing/row/skeleton/listing-row-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: 'listing'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
