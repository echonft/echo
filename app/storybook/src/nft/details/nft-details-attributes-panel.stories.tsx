import { nfts } from '@echo/model'
import { NftDetailsAttributesPanel as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Nft/Details/Attributes Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'attributes'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const AttributesPanel: Story = {
  args: {
    attributes: nfts['QFjMRNChUAHNswkRADXh']!.attributes
  }
}
