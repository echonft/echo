import { NewListingBannerManager as Component } from '@echo/ui/components/listing/new/new-listing-banner-manager'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Banner: Story = {}
