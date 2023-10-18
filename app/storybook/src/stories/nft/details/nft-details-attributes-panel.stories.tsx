import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NftDetailsAttributesPanel as Component } from '@echo/ui/components/nft/details/nft-details-attributes-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Attributes Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'attributes'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    attributes: getNftMockById('QFjMRNChUAHNswkRADXh').attributes
  }
}
