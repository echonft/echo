import { OfferRowSkeleton as Component } from '@echo/ui/src/components/offer/row/skeleton/offer-row-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
