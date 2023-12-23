import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { ListingCard as Component } from '@echo/ui/components/listing/card/listing-card'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Card',
  component: Component,
  argTypes: {
    onClick: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['listing']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Card: Story = {
  args: {
    listing: getListingMock()
  }
}
