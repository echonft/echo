import { getNftById } from '../../../mocks/model/nft'
import { NftDetailsAttributesPanel as Component } from '@echo/ui/components/nft/details/nft-details-attributes-panel'
import type { Meta, StoryObj } from '@storybook/react'

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
    attributes: getNftById('QFjMRNChUAHNswkRADXh').attributes
  }
}
