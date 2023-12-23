import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { ListingStack as Component } from '@echo/ui/components/listing/stack/listing-stack'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Stack',
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

export const Stack: Story = {
  args: {
    listing: getListingMock()
  }
}
